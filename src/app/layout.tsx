"use client"
import "@/app/ui/global.css";
import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme/theme";
import { Box } from "@mui/system";
import NavigationBar from "@/components/Nav/NavigationBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <NavigationBar />
            <Box
              component="main"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                maxWidth: 1600,
                mx: "auto",
              }}
            >
              {children}
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
