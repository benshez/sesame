import { defineStore, } from "pinia";

// import {
//   createUserWithEmailAndPassword,
//   sendEmailVerification,
//   updatePassword,
//   updateEmail,
//   updateProfile,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signOut,
//   type User
// } from "firebase/auth";
// import { useFirebase } from "@/utilities/firebase/useFirebase";
import { configuration } from "@/utilities";

export const useUserStore = defineStore("users", {
  state: () => ({
    userInfoState: {} as any,
    isAuthenticatedState: false as boolean
  }),
  actions: {
    // async GetUserInfo() {
    //   await this.UpdateUserInfo();
    // },

    // async CreateUser(email: string, password: string) {
    //   await createUserWithEmailAndPassword(useFirebase().auth, email, password);

    //   this.UpdateUserInfo();
    // },

    // async SendVerificationEmail() {
    //   const user = await this.GetCurrentUser();

    //   if (user) {
    //     await sendEmailVerification(user);
    //   }
    // },

    // async UpdateUserPassword(newPassword: string) {
    //   const user = await this.GetCurrentUser();

    //   if (user) {
    //     await updatePassword(user, newPassword);
    //   }
    // },

    // async ResetUserPassword(email: string) {
    //   const user = await this.GetCurrentUser();
    //   const password = this.GenerateSecureRandomPassword();

    //   if (user) {
    //     await this.UpdateUserPassword(password);
    //     await this.SendUserPasswordResetEmail(email);
    //   }
    // },

    // async SendUserPasswordResetEmail(email: string) {
    //   await sendPasswordResetEmail(useFirebase().auth, email);
    // },

    // async UpdateUserEmail(newEmail: string) {
    //   const user = await this.GetCurrentUser();

    //   if (user) {
    //     await updateEmail(user, newEmail);
    //     await this.UpdateUserInfo();
    //   }
    // },

    // async UpdateUserProfile(profile: {}) {
    //   const user = await this.GetCurrentUser();

    //   if (user) {
    //     await updateProfile(user, profile);
    //     await this.UpdateUserInfo();
    //   }
    // },

    // GenerateSecureRandomPassword() {
    //   const uppercases = "abcdefghijklmnopqrstuvwxyz"
    //   const lowercases = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    //   const numbers = "0123456789"
    //   const sympbols = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
    //   const charset = uppercases + lowercases + numbers + sympbols;
    //   let password = "";

    //   for (let i = 0, n = charset.length; i < length; ++i) {
    //     password += charset.charAt(Math.floor(Math.random() * n));
    //   }

    //   return password;
    // },

    // async LoginUser(email: string, password: string) {
    //   await signInWithEmailAndPassword(useFirebase().auth, email, password);
    //   await this.UpdateUserInfo();
    // },

    // async LogoutUser() {
    //   try {
    //     await signOut(useFirebase().auth);
    //     this.$state.userInfoState = {} as User;
    //     this.$state.isAuthenticatedState = false;
    //   } catch (error) {
    //     console.error("Error signing out:", error);
    //   }
    // },

    // async UpdateUserInfo() {
    //   const user = await this.GetCurrentUser();
    //   if (user) {
    //     const userToken = user ? await user.getIdTokenResult() : null;
    //     const authedUser = {
    //       uid: user.uid,
    //       displayName: user.displayName || "",
    //       email: user.email || "",
    //       emailVerified: user.emailVerified,
    //       isAnonymous: user.isAnonymous,
    //       phoneNumber: user.phoneNumber || "",
    //       photoURL: user.photoURL || "",
    //       roles: { permission: ["user"], access: ["read", "write"] },
    //       accessToken: userToken as unknown as string,
    //     } as unknown as User;

    //     this.$state.userInfoState = authedUser;
    //     this.$state.isAuthenticatedState = authedUser.uid !== undefined && authedUser.emailVerified !== undefined && userToken !== undefined;
    //     //configuration.SetAuthorizationBearerToken(userToken as string);
    //   }
    // },
    // async GetCurrentUser(): Promise<User | null> {
    //   const auth = useFirebase().auth;
    //   await auth.authStateReady();
    //   return auth.currentUser;
    // }
  },
  getters: {
    userInfo: (state) => state.userInfoState,
    isAuthenticated: (state) => state.isAuthenticatedState
  }
})