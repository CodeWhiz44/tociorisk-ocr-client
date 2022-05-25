import * as Yup from "yup"

export const emailSchema = () => {
  return Yup.string()
    .email("invalid_email_shape")
    .max(150, "invalid_email_length")
    .required("required")
}

export const passwordSchema = () => {
  return Yup.string()
    .min(8, "invalid_password_length")
    .max(100, "invalid_password_length")
    .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, "invalid_password_character")
    .required("required")
}

export const confirmPasswordSchema = (refFieldName: string = "password") => {
  return Yup.string()
    .oneOf([Yup.ref(refFieldName), null], "invalid_confirm_password")
    .required("required")
}

export const nameKanjiOrKatakanaSchema = () => {
  return Yup.string()
    .matches(/^[\u4E00-\u9FFF,\u30A0-\u30FF]+$/, "invalid_katakana_or_kanji")
    .max(50, "invalid_length")
    .required("required")
}

export const nameKatakanaSchema = () => {
  return Yup.string()
    .matches(/^[\u30A0-\u30FF]+$/, "invalid_katakana")
    .max(50, "invalid_length")
    .required("required")
}
