import { getApiClient } from "src/modules/axios"
import { useGetMutation } from "src/modules/mutation"
import {
  ILoginFormInputs,
  IForgotPasswordFormInputs,
  IResetPasswordApiData,
  IChangePasswordApiData,
  IUpdateProfileFormInputs,
} from "src/types/login"
import { InviteUserApiInputs } from "src/types/users"

const login = ({ data }: { data: ILoginFormInputs }) => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users/login", data)
}

export const useLogin = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(login, onSuccess, onError)
}

const logout = () => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users/logout")
}

export const useLogout = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(logout, onSuccess, onError)
}

const refresh = () => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users/token/refresh")
}

export const useRefresh = ({ onSuccess, onError }: { onSuccess: Function; onError: Function }) => {
  return useGetMutation(refresh, onSuccess, onError)
}

const initialSetting = ({ data }: { data: { newPassword: string } }) => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users/password/initial", data)
}

export const useInitialSetting = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(initialSetting, onSuccess, onError)
}

const inviteUser = ({ data }: { data: InviteUserApiInputs }) => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users", data)
}

export const useInviteUser = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(inviteUser, onSuccess, onError)
}

const forgotPassword = ({ data }: { data: IForgotPasswordFormInputs }) => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users/password/forgot", data)
}

export const useForgotPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(forgotPassword, onSuccess, onError)
}

const resetPassword = ({ data }: { data: IResetPasswordApiData }) => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users/password/reset", data)
}

export const useResetPassword = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(resetPassword, onSuccess, onError)
}

const changePassword = ({ data }: { data: IChangePasswordApiData }) => {
  return getApiClient({
    "content-type": "application/json",
  }).post("/users/password/change", data)
}

export const useChangePassword = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(changePassword, onSuccess, onError)
}

const updateProfile = ({ data }: { data: Partial<IUpdateProfileFormInputs> }) => {
  return getApiClient({
    "content-type": "application/json",
  }).put("/users", data)
}

export const useUpdateProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess: Function
  onError: Function
}) => {
  return useGetMutation(updateProfile, onSuccess, onError)
}
