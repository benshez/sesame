<template>
  <BaseLayout>
    <FormOneColumnLayout>
      <template v-slot:form-body>
        <FormBody>
          <template v-slot:header>
            <span>{{ displayStore.authActionText }}</span>
          </template>
          <template v-slot:subheader>
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
                  <button v-if="isSignIn && !isVerify" @click="goToSignUp"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Sign
                    Up</button>
                  <button v-if="!isSignIn && !isVerify" @click="goToSignIn"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300">Sign
                    In</button>
                  <button @click="onSubmitPressed"
                    class="inline-flex items-center justify-center font-medium gap-2 rounded-lg transition px-4 py-3 text-sm bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
                    <span>{{ displayStore.authActionText }}</span>
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
import EmailPassword from "supertokens-web-js/recipe/emailpassword";
import Session from "supertokens-web-js/recipe/session";
import BaseLayout from "@/layouts/BaseLayout.vue";
import FormBody from "@/components/Form/FormBody.vue";
import LoginProviders from "@/components/LoginProviders/LoginProviders.vue";
import FormOneColumnLayout from "@/layouts/FormOneColumnLayout.vue";
import FormBuilder from "@/components/Form/FormBuilder.vue";
import { useFormStore, useDisplayStore } from "@/store";
import { ApiClient } from "@/plugins";

const displayStore = useDisplayStore();
const router = useRouter();
const formStore = useFormStore();
const isSignIn = ref<boolean | true>(true);
const isVerify = ref<boolean | false>(false);

const apiClient = new ApiClient();


const goToSignUp = () => {
  isSignIn.value = false;
  let actionText = "Sign Up";
  if (isVerify.value) actionText = "Verify Email";
  displayStore.UpdateActionTextState(actionText);
};

const goToSignIn = () => {
  isSignIn.value = true;
  let actionText = "Sign In";
  if (isVerify.value) actionText = "Verify Email";
  displayStore.UpdateActionTextState(actionText);
};

const signIn = async (_: Event) => {
  const response = await EmailPassword
    .signIn({
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

  const params = new URLSearchParams(window.location.search);
  if (params.has("token")) {
    isVerify.value = true;
    const accessToken = await Session.getAccessTokenPayloadSecurely();
    const userId = await Session.getUserId();
    const token = params.get("token");
    const tenantId = params.get("tenantId");
    const unVerifyResponse = await apiClient
      .setBearerAuth(accessToken)
      .email()
      .unVerifyEmail({
        "userId": userId
      });

    const verifyResponse = await apiClient
      .setBearerAuth(accessToken)
      .email()
      .verifyEmail({
        "token": token || "",
        "tenantId": tenantId || "",
        "userId": userId
      });
    router.push("/");
  }

  displayStore.UpdateHasSessionState(true);
  router.push("/");
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

  if (isSignIn.value) {
    signIn(e);
  } else {
    signUp(e);
  }
};

onMounted(async () => {
  isVerify.value = false;

  const params = new URLSearchParams(window.location.search);

  if (params.has("error")) {

  }

  isVerify.value = params.has("token");

  if (isVerify.value) displayStore.UpdateActionTextState("Verify Email");
});
</script>