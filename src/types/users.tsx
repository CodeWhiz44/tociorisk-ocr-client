export interface JWTToken {
  message: string
  idToken: string
  expirationTime: number
}

export interface JWTTokenState {
  value: string
  setValue: Function
}

export interface InviteUserApiInputs {
  firstName: string
  lastName: string
  firstNameKatakana: string
  lastNameKatakana: string
  email: string
}
