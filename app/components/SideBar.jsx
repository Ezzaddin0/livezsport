// import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react"
"use client"
import Link from "next/link"
import { MenuIcon } from "../assets/icons/Icon"
import React, { useContext, createContext, useState } from "react"
import { useRouter, usePathname } from 'next/navigation'

const SidebarContext = createContext() // <--------------

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(false)

  
  return (
    <aside>
      <nav className="h-full flex flex-col dark:bg-gray-900 dark:text-white light:bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center max-sm:absolute top-0 left-0 z-50">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg hover:text-black hover:bg-gray-50"
            aria-label="Menu"
          >
            {expanded ? <MenuIcon size={25} /> : <MenuIcon size={25} />}
          </button>
          {/* <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          /> */}
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className={`flex-1 px-3 ${expanded ? " max-sm:fixed max-sm:z-10 max-sm:pt-20 left-0 h-full dark:bg-gray-900 dark:text-white bg-white" : "max-sm:hidden"}`}>{children}</ul>
        </SidebarContext.Provider>

        {/* <div className="border-t flex p-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt=""
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <SunIcon size={20} />
          </div>
        </div> */}
      </nav>
    </aside>
  )
}

// interface SidebarItemProps {
//    icon: string;
//    text: string;
//    active: boolean;
//    alert?: string;
//    href?: string
//  }

export function SidebarItem({ icon, text, active, alert, href }) {
  const { expanded } = useContext(SidebarContext)

  const router = useRouter()
  const pathname = usePathname()

  
  return (
    <li
    onClick={() => router.push(String(href))}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group ${pathname === href ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800' : 'hover:bg-indigo-50 text-gray-600'} 
        
    `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-40 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 z-50 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  )
}