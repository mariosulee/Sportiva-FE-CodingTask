import { GiHockey } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { GiBasketballBasket } from "react-icons/gi";
import React from "react";




type Category={
    id:string,
    name:string,
    icon:React.ComponentType
}

export const categories: Category[] =[
    {id:'1', name:"Football", icon: IoIosFootball },
    {id: "2", name: "Basketball", icon: GiBasketballBasket },
    {id: "3", name: "Hockey", icon: GiHockey }
]

