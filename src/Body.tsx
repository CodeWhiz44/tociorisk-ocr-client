import React from "react"
import { Route, Routes } from "react-router-dom"

import { Layout } from "src/components/layout"
import { Documents } from "src/pages/clients/documents"
import { Trash } from "src/pages/clients/trash"
import { InitialSetting } from "src/pages/clients/initialSetting"
import { Login } from "src/pages/clients/login"
import { ResetPassword } from "src/pages/clients/resetPassword"
import { ChangePassword } from "src/pages/clients/changePassword"
import { MyPage } from "src/pages/clients/myPage"

export function Body() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Documents />} />
        <Route path="/trash" element={<Trash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/initial" element={<InitialSetting />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route path="/password-change" element={<ChangePassword />} />
        <Route path="/my-page" element={<MyPage />} />
      </Routes>
    </Layout>
  )
}
