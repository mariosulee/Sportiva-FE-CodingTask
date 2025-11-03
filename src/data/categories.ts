import { GiHockey } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { GiBasketballBasket } from "react-icons/gi";
import React from "react";

//this file is for renderizing the available categories in the form

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

