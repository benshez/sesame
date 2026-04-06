<template>
  <BaseLayout>
    <FormOneColumnLayout>
      <template v-slot:form-body>
        <FormBody>
          <template v-slot:header>
            <span v-if="!isSignIn">Sign Up</span>
            <span v-else>Sign In</span>
          </template>
          <template v-slot:subheader v-if="!isSignIn">
            <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
              <LoginProviders :message="'Sign in with'" :heading="'Welcome Back!'" />
            </div>
          </template>
          <template v-slot:content>
            <FormBuilder :elements="formStore.elements" />
          </template>
          <template v-slot:footer="elements">
            <div class="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
              <div class="space-y-5">
                <div class="flex items-center gap-5 lg:justify-end">
                  <button v-if="isSignIn" @click="goToSignUp"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Sign
                    Up</button>
                  <button v-else @click="goToSignIn"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Sign
                    In</button>
                  <button @click="onSubmitPressed"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
                    <span class="flex items-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                          d="M9.77692 3.24224C9.91768 3.17186 10.0834 3.17186 10.2241 3.24224L15.3713 5.81573L10.3359 8.33331C10.1248 8.43888 9.87626 8.43888 9.66512 8.33331L4.6298 5.81573L9.77692 3.24224ZM3.70264 7.0292V13.4124C3.70264 13.6018 3.80964 13.775 3.97903 13.8597L9.25016 16.4952L9.25016 9.7837C9.16327 9.75296 9.07782 9.71671 8.99432 9.67496L3.70264 7.0292ZM10.7502 16.4955V9.78396C10.8373 9.75316 10.923 9.71683 11.0067 9.67496L16.2984 7.0292V13.4124C16.2984 13.6018 16.1914 13.775 16.022 13.8597L10.7502 16.4955ZM9.41463 17.4831L9.10612 18.1002C9.66916 18.3817 10.3319 18.3817 10.8949 18.1002L16.6928 15.2013C17.3704 14.8625 17.7984 14.17 17.7984 13.4124V6.58831C17.7984 5.83076 17.3704 5.13823 16.6928 4.79945L10.8949 1.90059C10.3319 1.61908 9.66916 1.61907 9.10612 1.90059L9.44152 2.57141L9.10612 1.90059L3.30823 4.79945C2.63065 5.13823 2.20264 5.83076 2.20264 6.58831V13.4124C2.20264 14.17 2.63065 14.8625 3.30823 15.2013L9.10612 18.1002L9.41463 17.4831Z"
                          fill="currentColor">
                        </path>
                      </svg>
                    </span>
                    <span v-if="!isSignIn">Sign Up</span>
                    <span v-else>Sign In</span>
                  </button>
                </div>
              </div>
            </div>
          </template>
        </FormBody>
      </template>
    </FormOneColumnLayout>
  </BaseLayout>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import ThirdParty from "supertokens-web-js/recipe/thirdparty";
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormBody from "@/components/Form/FormBody.vue";
import LoginProviders from "@/components/LoginProviders/LoginProviders.vue";
import FormOneColumnLayout from "@/layouts/FormOneColumnLayout.vue";
import FormBuilder from "@/components/Form/FormBuilder.vue";
import { useFormStore } from "@/store";

const router = useRouter();
const formStore = useFormStore();
const websitePort = import.meta.env.VUE_APP_WEB_PORT || 3000;
const websiteDomain = import.meta.env.VUE_APP_WEB_URL || `http://localhost:${websitePort}`;
const isSignIn = ref<boolean | true>(true);

const goToSignUp = () => {
  isSignIn.value = false;
};

const goToSignIn = () => {
  isSignIn.value = true;
};

const signIn = async (_: Event) => {
  const response = await EmailPassword.signIn({
    formFields: [
      {
        id: "email",
        value: formStore.getElement("email").value || "",
      },
      {
        id: "password",
        value: formStore.getElement("password").value || "",
      },
    ],
  });

  if (response.status === "WRONG_CREDENTIALS_ERROR") {
    updateErrorState("email", { key: "isValid", value: false });
    updateErrorState("email", { key: "helpText", value: "Invalid credentials" });
    updateErrorState("password", { key: "isValid", value: false });
    updateErrorState("password", { key: "helpText", value: "Invalid credentials" });
    return;
  }

  if (response.status === "FIELD_ERROR") {
    updateErrorState("email", { key: "isValid", value: false });
    updateErrorState("email", { key: "helpText", value: response.formFields.find((f: any) => f.id === "email")?.error || "" });
    updateErrorState("password", { key: "isValid", value: false });
    updateErrorState("password", { key: "helpText", value: response.formFields.find((f: any) => f.id === "password")?.error || "" });
    return;
  }

  window.location.assign("/");
};

const updateErrorState = (field: string, values: { key: string, value: boolean | string }) => {
  formStore.updateElementState(field, values);
}

const signUp = async (_: Event) => {
  const response = await EmailPassword.signUp({
    formFields: [
      {
        id: "email",
        value: formStore.getElement("email").value || "",
      },
      {
        id: "password",
        value: formStore.getElement("password").value || "",
      },
    ],
  });

  if (response.status === "FIELD_ERROR") {
    updateErrorState("email", { key: "isValid", value: false });
    updateErrorState("email", { key: "helpText", value: response.formFields.find((f: any) => f.id === "email")?.error || "" });
    updateErrorState("password", { key: "isValid", value: false });
    updateErrorState("password", { key: "helpText", value: response.formFields.find((f: any) => f.id === "password")?.error || "" });
  }
};


const onSubmitPressed = (e: Event) => {
  e.preventDefault();
  // we reset the error states in case the user has fixed the input errors


  if (isSignIn.value) {
    signIn(e);
  } else {
    signUp(e);
  }
};



onMounted(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.has("error")) {

  }
});
</script>