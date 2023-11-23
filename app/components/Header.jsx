"use client"
import { useEffect, useState, useMemo } from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, DropdownSection , Avatar, Switch, Button, Select, SelectItem, ScrollShadow, NavbarMenuToggle} from "@nextui-org/react";
// import {MoonIcon} from "../assets/icons/MoonIcon";
import { SunIcon, MoonIcon, ChevronRightIcon, SettingsIcon } from "../assets/icons/Icon"
import CountriesData from "../assets/json/countries.json"
// import { Countries } from "./Countries"
import { useInfiniteQuery } from '@tanstack/react-query';
import { resolve } from 'path';
import SwitchMood from "./SwitchMode"
import GearIcon from "../assets/icons/gear-fill.svg"


const Header = () => {  
  const [selectedKeys, setSelectedKeys] = useState(new Set(["text"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const [activeDropLang, setActiveDropLang] = useState(false);


  const handleDropLang = () => {
    setActiveDropLang(!activeDropLang);
  }

  const [activeDropCountary, setActiveDropCountary] = useState(false);


  const handleDropCountary = () => {
    setActiveDropCountary(!activeDropCountary);
  }
  

  return (
    <Navbar maxWidth='full' className='shadow-lg shadow-white/10 dark:shadow-black/10'>
      <NavbarBrand className='max-sm:ml-8'>
        {/* <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button> */}
        <Link href="/"><p className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-emerald-500 text-transparent bg-clip-text ">LiveZsport</p></Link>
        
      </NavbarBrand>

      {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end" closeOnSelect={Boolean(false)}>
          <DropdownTrigger>
            <Button isIconOnly color="default" variant="bordered" radius="full" aria-label="Settings"><SettingsIcon/></Button>
            {/* <Avatar
              // isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={GearIcon}
            /> */}
          </DropdownTrigger>
          {!activeDropLang && !activeDropCountary && (
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
          <DropdownSection title="Settings" showDivider>
            <DropdownItem
              key="language"
              shortcut={<ChevronRightIcon size={20}/>}
              description="Change the language of the site"
              onAction={handleDropLang}
            >
              Language
            </DropdownItem>
            <DropdownItem
              key="countries"
              shortcut={<ChevronRightIcon size={20}/>}
              description="Select the country"
              onAction={handleDropCountary}
            >
              Countries
            </DropdownItem>
          </DropdownSection>
          <DropdownSection title="Mode">  
            <DropdownItem closeOnSelect={false} variant='light'>
              {/* <Switch
                defaultSelected
                size="lg"
                color="secondary"
                isSelected={isSelected} 
                onValueChange={setIsSelected}
                thumbIcon={({ isSelected, className }) =>
                  isSelected ? (<SunIcon className={className} onClick={() => setTheme("light")} />)  : (<MoonIcon className={className} onClick={() => setTheme("light")} />)
                }
              >
                Dark mode
              </Switch> */}
              <SwitchMood/>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      )}

      {activeDropLang && (
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description"
        selectionMode="single"
        // selectedKeys={selectedKeys}
        // onSelectionChange={setSelectedKeys}
        
        >
          <DropdownSection title="Language" showDivider>
            <DropdownItem
              // key="back"
              // shortcut={<ChevronRightIcon size={20}/>}
              endContent={<ChevronRightIcon size={20}/>}
              // description="Back"
              onAction={handleDropLang}
              data-selected={false}
            >
              Back
            </DropdownItem>
            </DropdownSection>
            <DropdownItem
            // isSelected={false}
              // key="language"
              // shortcut={<ChevronRightIcon size={20}/>}
              // description="Change the language of the site"
              // onAction={handleDropLang}
            >
              English
            </DropdownItem>
        </DropdownMenu>
      )}

      {activeDropCountary && (
        <DropdownMenu variant="faded" aria-label="Dropdown menu with description"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
        disallowEmptySelection
        >
          <DropdownSection title="Countray">

            <DropdownItem
              // key="back"
              // shortcut={<ChevronRightIcon size={20}/>}
              endContent={<ChevronRightIcon size={20}/>}
              // description="Back"
              // data-selectable={false}
              onAction={handleDropCountary}
              isSelected={false}
              showDivider={true}
              >
              Back
            </DropdownItem>
          </DropdownSection>

            <DropdownSection className='scroll-shadows'>
            {CountriesData.map((count, index) => {

            return (
              
            // <SelectItem
            // key={count.name}
            // startContent={<Avatar alt={count.name} className="w-6 h-6" src={String(count.flag)} />}
            // >
            // {count.name}
            // </SelectItem>
            <DropdownItem
            key={count.name}
            onAction={handleDropCountary}
            startContent={<Avatar alt={count.name} className="w-6 h-6" src={String(count.flag)} />}
            >
              {count.name}
            </DropdownItem>  
            )
            })}      
            {/* {data?.pages.map((page, i) => (
              <DropdownItem key={i}>
                {page.map((post) => (
                  <SelectItem key={String(post.code)} startContent={<Avatar alt={post.name} className="w-6 h-6" src={String(post.flag)} />}>{post.name}</SelectItem>
                ))}
              </DropdownItem>
            ))} */}
            </DropdownSection>
          
        </DropdownMenu>
      )}
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}

export default Header