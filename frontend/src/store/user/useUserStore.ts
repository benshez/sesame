import { defineStore } from "pinia";
import { type Component, ref } from "vue";
import Session from "supertokens-web-js/recipe/session";
import { UserRoleClaim } from "supertokens-web-js/recipe/userroles";
import { ApiClient } from "@/plugins/client/ApiClient";
import type { IUserInfo, IUserMetaData, ITableRow, ITableColumn, ILoginMethods } from "@/interfaces";
import { useRoute } from "vue-router";
import ActionButtons from "@/components/buttons/ActionButtons.vue";
import Toggle from "@/components/elements/Toggle.vue";
import UserProfileCard from "@/components/users/UserProfileCard.vue";
import UserRolesCard from "@/components/users/UserRolesCard.vue";
import type { IRole } from "../../../../shared/interfaces";

export const useUserStore = defineStore("user", () => {
  const route = useRoute();
  const apiClient = new ApiClient();
  const userState = ref({
    Users: [] as Array<IUserInfo>,
    UserInfo: {} as IUserInfo,
    UserMetaData: {} as IUserMetaData,
    userTableRows: [] as Array<ITableRow>,
    userRolesTableRows: [] as Array<ITableRow>,
    nextPaginationToken: "get-tenant-users-next-pagination-token" as string,
  });
  const selectedUserState = ref({
    Users: [] as Array<IUserInfo>,
    UserInfo: {} as IUserInfo,
    UserMetaData: {} as IUserMetaData,
  });

  const GetTabs = () => {
    return [
      { id: "personalInfo", name: "Personal Info", selected: true, component: UserProfileCard },
      { id: "roles", name: "Roles", selected: false, component: UserRolesCard }
    ]
  }

  const GetUserTableColumns = (): Array<ITableColumn> => {
    return [
      { id: "userId", caption: "User id", type: String },
      { id: "userEmail", caption: "User email", type: String },
      { id: "verified", caption: "Verified", type: Toggle },
      { id: "action", caption: "Action", type: ActionButtons }
    ]
  }

  const CreateUserTableRows = () => {
    const rows: Array<ITableRow> = [];
    userState.value.userTableRows = rows;

    userState.value.Users.forEach((user: IUserInfo) => {
      const isVerifield = user.loginMethods[0]?.verified || false;
      const userEmail = user.emails[0];

      const toggleComponent = {
        name: "Toggle",
        props: {
          id: user.id,
          checked: isVerifield
        },
      } as unknown as Component;

      const actionButtonComponent = {
        name: "ActionButtons",

      } as unknown as Component;

      rows.push({
        values: [user.id, userEmail, toggleComponent, actionButtonComponent],
        rowData: user,
        props: [
          {},
          {},
          {
            id: user.id,
            checked: isVerifield,
            title: isVerifield ? `Unverify email - ${userEmail}` : `Verify email - ${userEmail}`
          },
          {
            buttons: [
              {
                title: `Edit User - ${userEmail}`,
                type: "edit",
                visible: true
              },
              {
                title: `Delete User - ${userEmail}`,
                type: "delete",
                visible: true
              }
            ]
          }
        ],
      })
    })
  }

  const CreateUserRolesTableColumns = (): Array<ITableColumn> => {
    return [
      { id: "roleId", caption: "Role", type: String },
      { id: "permissions", caption: "Permissions", type: String },
      { id: "action", caption: "Action", type: Toggle }
    ]
  }

  const CreateUserRolesTableRows = (allRoles: Array<IRole>) => {
    const rows: Array<ITableRow> = [];

    allRoles.forEach((role: IRole) => {
      const hasRole = selectedUserState.value.UserInfo.roles?.includes(role.roleId || "") || false;

      const toggleComponent = {
        name: "Toggle",
        props: {
          id: role.roleId,
          checked: hasRole
        },
      } as unknown as Component;

      rows.push({
        values: [role.roleId as string, role.permissions || "", toggleComponent],
        rowData: { roleId: role },
        props: [
          {},
          {},
          {
            id: role.roleId,
            checked: hasRole,
            title: `Remove role - ${role.roleId}`
          }
        ]
      })
    })

    userState.value.userRolesTableRows = rows;
  }

  const GetUsersForTenant = async () => {
    const nextPaginationToken = userState.value.nextPaginationToken;

    if (userState.value.nextPaginationToken === "") return;

    userState.value.Users = [];

    const accessToken = await GetAccessToken();

    const response: any = await apiClient
      .setBearerAuth(accessToken)
      .tenant()
      .getTenantUsers(nextPaginationToken);

    userState.value.nextPaginationToken = (response.nextPaginationToken ? response.nextPaginationToken : "");

    const users: Array<IUserInfo> = [];

    response.users.forEach((user: IUserInfo) => {
      users.push(user)
    });

    Object.assign(userState.value.Users, users);

    CreateUserTableRows();
  }

  const GetAccessToken = async () => {
    return await Session.getAccessTokenPayloadSecurely();
  }

  const GetUserIdFromRoute = (): string => {
    return route.params.userId as unknown as string;
  }

  const GetTenantIdFromRoute = (): string => {
    return route.params.tenantId as string;
  }

  const GetUserId = async () => {
    return await Session.getUserId();
  }

  const GetUserInfo = async (userId: string) => {
    userState.value.UserInfo = {} as IUserInfo;
    userState.value.UserInfo.roles = [];

    const user = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .userInfo(userId)

    Object.assign(userState.value.UserInfo, user);

    const userRoles = await GetRolesForSelectedUser(userId);
    userState.value.UserInfo.roles = userRoles;

    return user;
  }

  const GetSelectedUserInfo = async (userId: string) => {
    selectedUserState.value.UserInfo = {} as IUserInfo;
    selectedUserState.value.UserInfo.roles = [];

    const user = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .userInfo(userId)

    Object.assign(selectedUserState.value.UserInfo, user);

    const userRoles = await GetRolesForSelectedUser(userId);
    selectedUserState.value.UserInfo.roles = userRoles;

    return user;
  }

  const SaveUserMetaData = async (userInfo: IUserMetaData) => {
    const userId = await GetUserId();

    const payload = {
      userInfo: userInfo,
      userId: userId === GetUserIdFromRoute() ? userId : GetUserIdFromRoute()
    };

    if (selectedUserState.value.UserInfo.id !== payload.userId) {
      payload.userId = selectedUserState.value.UserInfo.id;
    }

    return await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .updateUserMetadata(payload);
  }

  const GetUserMetaData = async (userId: string) => {
    const isLoggedinUser = userId === await GetUserId();

    const response: any = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .getUserMetadata(userId);

    if (isLoggedinUser) {
      userState.value.UserMetaData = {} as IUserMetaData;
      Object.assign(userState.value.UserMetaData, response.metadata);
    }

    selectedUserState.value.UserMetaData = {} as IUserMetaData;

    Object.assign(userState.value.UserMetaData, response.metadata);
    Object.assign(selectedUserState.value.UserMetaData, response.metadata);

    return response.metadata;
  }

  const SendVerificationEmail = async (userId: string, email: string, tenantId: string) => {
    const response = await apiClient
      .setBearerAuth(await GetAccessToken())
      .email()
      .sendVerificationEmail({
        "email": email,
        "userId": userId,
        "recipeUserId": userId,
        "tenantId": tenantId
      });
  }

  const UserHasClaim = async (claimId: string): Promise<boolean> => {
    if (await Session.doesSessionExist()) {
      const roles = await Session.getClaimValue({ claim: UserRoleClaim });

      return roles !== undefined && roles.includes(claimId);
    }

    return false;
  }

  const UserHasRole = async (roleId: string): Promise<boolean> => {
    if(!await Session.doesSessionExist()) return false;
    const userId = await GetUserId();
    await GetUserInfo(userId);

    return userState.value.UserInfo.roles?.includes(roleId || "") || false;
  }

  const VerifyOrUnverifyUserEmail = async (user: IUserInfo) => {
    const loginMethod = user.loginMethods[0];

    if (!loginMethod.verified) {
      await VerifyUserEmail(user, loginMethod);
    } else {
      await UnVerifyUserEmail(user, loginMethod);
    }
  }

  const VerifyUserEmail = async (user: IUserInfo, loginMethod: ILoginMethods) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .email()
      .verifyEmail({
        tenantId: GetTenantIdFromRoute(),
        userId: user.id,
        recipeUserId: loginMethod.recipeUserId.recipeUserId as unknown as string
      });
  }

  const UnVerifyUserEmail = async (user: IUserInfo, loginMethod: ILoginMethods) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .email()
      .unVerifyEmail(
        {
          recipeUserId: loginMethod.recipeUserId.recipeUserId as unknown as string,
          email: user.emails[0]
        });
  }

  const AddRoleToUser = async (userId: string, roleId: string) => {
    const userInfo = {
      userId: userId,
      roleId: roleId
    }

    await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .addRoleToUser(userInfo);
  }

  const RemoveRoleFromUser = async (userId: string, roleId: string) => {
    const userInfo = {
      userId: userId,
      roleId: roleId
    }

    await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .removeRoleFromUser(userInfo);
  }

  const RemoveUser = async (user: IUserInfo) => {
    await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .deleteUser(user.id);

    userState.value.Users = [];
    UpdateSelectedUserState({} as IUserInfo);

    await GetUsersForTenant();
  }

  const UpdateSelectedUserState = (user: IUserInfo) => {
    Object.assign(selectedUserState.value.UserInfo, user);
  }

  const GetRolesForSelectedUser = async (userId: string = ""): Promise<Array<string>> => {
    selectedUserState.value.UserInfo.roles = [];

    if (userId === "") userId = selectedUserState.value.UserInfo.id;
    const userRoles = await apiClient
      .setBearerAuth(await GetAccessToken())
      .users()
      .getUserRoles(userId) as unknown as Array<string>;

    selectedUserState.value.UserInfo.roles = userRoles;

    return userRoles as unknown as Array<string>;
  }

  return {
    userState,
    selectedUserState,
    GetUserInfo,
    GetSelectedUserInfo,
    GetUserMetaData,
    SaveUserMetaData,
    SendVerificationEmail,
    GetAccessToken,
    GetUserId,
    GetUserTableColumns,
    CreateUserTableRows,
    CreateUserRolesTableColumns,
    CreateUserRolesTableRows,
    GetTabs,
    GetUsersForTenant,
    UpdateSelectedUserState,
    VerifyOrUnverifyUserEmail,
    GetRolesForSelectedUser,
    RemoveUser,
    AddRoleToUser,
    RemoveRoleFromUser,
    UserHasRole
  }
})