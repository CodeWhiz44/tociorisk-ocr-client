import React, { useEffect, useState } from "react"
import { Box, CircularProgress } from "src/UILibrary"
import { AxiosResponse, AxiosError } from "axios"
import { useRecoilState } from "recoil"

import { useRefresh } from "src/queries/login"
import { JWTToken, JWTTokenState } from "src/types/users"
import { isLoginRefreshState } from "src/states/provider"

const JWTTokenContext = React.createContext<JWTTokenState | null>(null)

export const FetchAndEnsureJWTToken = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<string>("")
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true)
  const [isLoginRefresh, setIsLoginRefresh] = useRecoilState(isLoginRefreshState)

  const { mutate: refreshToken } = useRefresh({
    onSuccess: (res: AxiosResponse<JWTToken>) => {
      setValue(res.data.idToken)
      setIsInitialLoading(false)
      setTimeout(() => {
        refreshToken({})
      }, res.data.expirationTime * 1000 - 2000)
    },
    onError: (err: AxiosError) => {
      console.error(err.response, err)
      setValue("")
      setIsInitialLoading(false)
    },
  })

  useEffect(() => {
    refreshToken({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoginRefresh) {
      refreshToken({})
      setIsLoginRefresh(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginRefresh])

  if (isInitialLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: "primary.main" }} />
      </Box>
    )
  }

  return <JWTTokenContext.Provider value={{ value, setValue }}>{children}</JWTTokenContext.Provider>
}

export const useJWTToken = () => {
  const token = React.useContext(JWTTokenContext)
  return token
}
