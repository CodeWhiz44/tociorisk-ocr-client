import React from "react"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "@mui/material"
import { RecoilRoot } from "recoil"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./App.css"
import { Body } from "./Body"
import { DefaultTheme } from "src/themes/default"
import { FetchAndEnsureJWTToken } from "src/modules/jwtTokenProvider"

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
        cacheTime: 1000 * 60 * 60, // 1 hour
      },
    },
  })

  return (
    <ThemeProvider theme={DefaultTheme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <FetchAndEnsureJWTToken>
            <BrowserRouter>
              <Body />
            </BrowserRouter>
          </FetchAndEnsureJWTToken>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  )
}

export default App
