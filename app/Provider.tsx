"use client"
import React from 'react'
import {NextUIProvider} from "@nextui-org/react";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import SideBar, { SidebarItem } from './components/SideBar';
import { HeadToHeadIcon, HomeIcon, MatchesIcon, NewsIcon } from './assets/icons/Icon';
import Header from './components/Header';

const Provider = ({ children }: {children: React.ReactNode}) => {
  return (
    <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
            { children }
        </NextThemesProvider>
    </NextUIProvider>
  )
}

export default Provider