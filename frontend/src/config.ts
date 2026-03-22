

import SuperTokens from "supertokens-web-js";
import Session from "supertokens-web-js/recipe/session";
import EmailVerification from "supertokens-web-js/recipe/emailverification";
import MultiFactorAuth from "supertokens-web-js/recipe/multifactorauth";

const isMultitenancy = true;

export function getApiDomain() {
  const apiPort = 3001;
  const apiUrl = `http://localhost:${apiPort}`;
  return apiUrl;
}

export function getWebsiteDomain() {
  const websitePort = 3000;
  const websiteUrl = `http://localhost:${websitePort}`;
  return websiteUrl;
}

export function initSuperTokensUI() {
  (window as any).supertokensUIInit("supertokensui", {
    appInfo: {
      websiteDomain: getWebsiteDomain(),
      apiDomain: getApiDomain(),
      appName: "bb",
      websiteBasePath: "/auth",
      apiBasePath: "/auth",
    },
    useShadowDom: false,
    usesDynamicLoginMethods: true,
    recipeList: [
      (window as any).supertokensUISession.init(),
      (window as any).supertokensUIEmailPassword.init(),
      (window as any).supertokensUIThirdParty.init({
        signInAndUpFeature: {
          providers: [
            (window as any).supertokensUIThirdParty.Google.init(),
            (window as any).supertokensUIThirdParty.Github.init(),
            (window as any).supertokensUIThirdParty.Apple.init(),
            (window as any).supertokensUIThirdParty.Twitter.init()
          ],
        },
      }),
      (window as any).supertokensUIPasswordless.init({
        contactMethod: "EMAIL"
      }),
      (window as any).supertokensUIMultitenancy.init({
        override: {
          functions: (oI: any) => {
            return {
              ...oI,
              getTenantId: async () => {
                const tenantIdInStorage = localStorage.getItem("tenantId");
                return tenantIdInStorage === null ? undefined : tenantIdInStorage;
              },
            };
          },
        },
      }),
      (window as any).supertokensUIEmailVerification.init({
        mode: "REQUIRED"
      })
    ],
    getRedirectionURL: async (context: any) => {
      if (context.action === "SUCCESS") {
        const ST_TENANT_ID_KEY = "tenantId";
        let currentTenantId = localStorage.getItem(ST_TENANT_ID_KEY) || 'public';
        return `/home/${currentTenantId}`;
      }
      return undefined;
    },
  });
}

export function initSuperTokensWebJS() {
  SuperTokens.init({
    appInfo: {
      appName: "cc",
      apiDomain: getApiDomain(),
      apiBasePath: "/auth",
    },
    recipeList: [
      Session.init(),
      EmailVerification.init(),
      MultiFactorAuth.init()
    ]
  });

  if (isMultitenancy) {
    initTenantSelectorInterface();
  }
}


export async function initTenantSelectorInterface() {
  const ST_TENANT_ID_KEY = "tenantId";
  let currentTenantId = localStorage.getItem(ST_TENANT_ID_KEY) || 'public';
  let tenants: any[] = [];

  function waitForElm(selector: any) {
    return new Promise(resolve => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
          observer.disconnect();
          resolve(document.querySelector(selector));
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }

  async function tenantLoader() {
    try {
      const response = await fetch(`${getApiDomain()}/tenants`);
      if (!response.ok) {
        console.error(`Failed to fetch tenants: ${response.statusText}`);
        return [];
      }
      const responseData = await response.json();
      if (responseData && responseData.status === "OK" && Array.isArray(responseData.tenants)) {
        return responseData.tenants;
      } else if (Array.isArray(responseData)) {
        return responseData;
      }
      console.error("Unexpected response format from /tenants:", responseData);
      return [];
    } catch (error) {
      console.error("Error fetching tenants:", error);
      return [];
    }
  }

  function initTenantSelectorDOM(existingFooterElement: any) {
    if (document.getElementById("st-tenant-selector-footer")) {
      return;
    }

    const footerDiv = document.createElement("div");
    footerDiv.id = "st-tenant-selector-footer";
    footerDiv.innerHTML = `
            <span id="st-current-tenant-display">Current Tenant: Loading...</span>
            <button id="st-switch-tenant-btn">Switch Tenant</button>
        `;

    if (existingFooterElement && existingFooterElement.parentElement) {
      existingFooterElement.parentElement.insertBefore(footerDiv, existingFooterElement);
    } else {
      document.body.appendChild(footerDiv);
    }

    const modalBackdrop = document.createElement("div");
    modalBackdrop.id = "st-tenant-modal-backdrop";
    modalBackdrop.innerHTML = `
            <div id="st-tenant-modal">
                <button id="st-tenant-modal-close" title="Close">&times;</button>
                <h3>Select Tenant</h3>
                <ul id="st-tenant-list"></ul>
            </div>
        `;
    document.body.appendChild(modalBackdrop);

    document.getElementById("st-switch-tenant-btn")?.addEventListener("click", openTenantModal);
    document.getElementById("st-tenant-modal-close")?.addEventListener("click", closeTenantModal);
    modalBackdrop.addEventListener("click", function (event) {
      if (event.target === modalBackdrop) {
        closeTenantModal();
      }
    });
  }

  function updateTenantDisplay() {
    const displayEl = document.getElementById("st-current-tenant-display");
    if (displayEl) {
      displayEl.textContent = `Current Tenant: ${currentTenantId || 'None'}`;
    }
  }

  function populateTenantList() {
    const listEl = document.getElementById("st-tenant-list");
    if (!listEl) return;
    listEl.innerHTML = "";

    if (tenants.length === 0) {
      listEl.innerHTML = "<li>No tenants available or failed to load.</li>";
      return;
    }

    tenants.forEach(tenant => {
      const listItem = document.createElement("li");
      listItem.textContent = tenant.tenantId;
      listItem.dataset.tenantId = tenant.tenantId;
      listItem.addEventListener("click", () => selectTenant(tenant.tenantId));
      listEl.appendChild(listItem);
    });
  }

  function openTenantModal() {
    populateTenantList();
    const modalBackdrop = document.getElementById("st-tenant-modal-backdrop");
    if (modalBackdrop) modalBackdrop.style.display = "flex";
  }

  function closeTenantModal() {
    const modalBackdrop = document.getElementById("st-tenant-modal-backdrop");
    if (modalBackdrop) modalBackdrop.style.display = "none";
  }

  async function selectTenant(tenantId: any) {
    localStorage.setItem(ST_TENANT_ID_KEY, tenantId);
    currentTenantId = tenantId;
    updateTenantDisplay();
    closeTenantModal();
    window.dispatchEvent(new CustomEvent("tenantChanged", { detail: { tenantId } }));
    window.location.href = "/auth";
  }

  async function setup() {
    tenants = await tenantLoader();
    if (!currentTenantId && tenants.length > 0) {
      currentTenantId = tenants[0].tenantId;
      localStorage.setItem(ST_TENANT_ID_KEY, currentTenantId);
    }

    const commonFooterSelectors = [
      'footer'
    ];
    let footerInjected = false;
    for (const selector of commonFooterSelectors) {
      try {
        const elm = await waitForElm(selector);
        if (elm) {
          //initTenantSelectorDOM(elm);
          footerInjected = true;
          break;
        }
      } catch (e) {
        console.warn(`Footer selector "${selector}" not found or timed out.`);
      }
    }
    if (!footerInjected) {
      //initTenantSelectorDOM(null);
    }

    updateTenantDisplay();

    window.addEventListener("storage", (event) => {
      if (event.key === ST_TENANT_ID_KEY) {
        currentTenantId = event.newValue as string;
        updateTenantDisplay();
      }
    });
    window.addEventListener("tenantChanged", () => {
      currentTenantId = localStorage.getItem(ST_TENANT_ID_KEY) as string;
      updateTenantDisplay();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
};