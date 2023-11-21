import React from 'react'
import CountriesData from "../assets/json/countries.json"
import { SelectItem, Avatar } from '@nextui-org/react'

const Countries = () => {
  return (
    <div>
    {CountriesData.map((count, index) => {

return (
  
<SelectItem
key={count.name}
startContent={<Avatar alt={count.name} className="w-6 h-6" src={String(count.flag)} />}
>
{count.name}
</SelectItem>
)
})}
    </div>
  )
}

export default Countries