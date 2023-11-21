import React from "react";
import {Switch, useSwitch, VisuallyHidden, SwitchProps} from "@nextui-org/react";
import { SunIcon, MoonIcon } from "../assets/icons/Icon";
import {useTheme} from "next-themes";


const ThemeSwitch = () => {
    const { theme, setTheme } = useTheme()
    const [isSelected, setIsSelected] = React.useState(window.localStorage.getItem("theme") === "dark" ? true : false);
    // React.useEffect(() => {
    //     setTheme("dark")
    // }, [])


//   const {
//     Component, 
//     slots, 
//     isSelected, 
//     getBaseProps, 
//     getInputProps, 
//     getWrapperProps
//   } = useSwitch(props);

  return (
    <>
    <Switch
      // defaultSelected
      isSelected={isSelected}
      onValueChange={setIsSelected}
      size="lg"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} size={15} />
        ) : (
          <MoonIcon className={className} size={15} />
        )
      }
    >
      {isSelected ? "dark" : "light"} mode
    </Switch>
    {/* <Switch isSelected={isSelected} onValueChange={setIsSelected}>
        Airplane mode
      </Switch>  */}
      {isSelected ? setTheme('dark') : setTheme('light')}
    </>
  )
}


export default function App() {
  return <ThemeSwitch/>
}
