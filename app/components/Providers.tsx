import { ThemeProvider } from 'next-themes'
import React, { Children } from 'react'

export default function Providers({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <ThemeProvider>{children}</ThemeProvider>
}