export interface ILoginFormInputs {
  email: string
  password: string
}

export interface ILoginResponse {
  message: string
  idToken: string
  initialLogin: boolean
}

export interface IInitialFormInputs {
  newPassword: string
  confirmPassword: string
}

export interface IForgotPasswordFormInputs {
  email: string
}

export interface IResetPasswordFormInputs {
  password: string
  confirmPassword: string
}

export interface IResetPasswordApiData {
  confirmationCode: string
  newPassword: string
}

export interface IChangePasswordApiData {
  oldPassword: string
  newPassword: string
}

export interface IUpdateProfileFormInputs {
  firstName: string
  lastName: string
  firstNameKatakana: string
  lastNameKatakana: string
}
