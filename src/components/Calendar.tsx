import type { Event } from "../types/types";
import { useNavigate } from "react-router-dom";
import { GiHockey } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { GiBasketballBasket } from "react-icons/gi";


type CalendarProps={
    events:Event[]
}

export default function Calendar( {events}:CalendarProps ){

    const navigate = useNavigate();

    const weekDays=["Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat.", "Sun."]
    const today=new Date()
    const month=today.getMonth() // 0 is January in JS
    const year=today.getFullYear()

    const daysInMonth=new Date(year,month+1, 0).getDate() //as I put the day 0 of the following month, it'll return the last day of the current month (total of days in this month)
    

    const days=[]
    for(let i=1; i<=daysInMonth; i++){
        days.push(i)
    }
    
    
    let startDay=new Date(year,month,1).getDay() //day of the week of the first day of the month
    startDay = startDay === 0 ? 6 : startDay - 1; //
    //for the blank spaces before the start day
    const emptyDates=[]
    for(let i=0; i<startDay; i++){
        emptyDates.push(i)
    }


    //filtra los eventos del mes y año actual
    const eventDays=events.filter( e => (
            new Date(e.dateVenue).getMonth() === month && new Date(e.dateVenue).getFullYear() ===year
        )
    ).map(e => new Date(e.dateVenue).getDate())

    //eventDays will be an array of numbers that represent the days of the month when events will be held (f.e 2,14,31)



    //for clicking on a calendar day
    const handleClick= (day:number) => {
        const clickedDate=new Date(year, month, day).toLocaleDateString("en-CA")
        
        navigate(`/event/${clickedDate}`)
    }


    return(
        <>
        
            <div className="p-4">
                <h1 className="text-2xl font-bold mt-10 mb-2 text-center text-blue-950"> Events on</h1>
                <h1 className="text-2xl font-black text-center text-blue-950">{today.toLocaleString("en-UK", {month: "long"})} {year}</h1>  {/* tolocalstring convierte un objeto date a una cadena legible, long es para que no abrevie el mes, */}
                
                <div className="grid grid-cols-7 gap-3 p-20">

                    {/* for the weekdays */}
                    {weekDays.map( weekday => (
                        <div key={weekday} className="text-center font-bold">
                            {weekday}
                        </div>
                    ))}


                    {/* for the empty days */}
                    {emptyDates.map( (blank) => (
                        <div key={blank} className="h-16"></div>
                    ))}
                    


                    
                    {/* for the days */}
                    {days.map( (day) => {

                        //buscar en la lista de events el primer evento cuya fecha dateVenue coincida con la fecha del calendario q se esta renderizando. Si lo encuentra lo guarda en eventForDay
                        const eventForDay=events.find( e => 
                            new Date(e.dateVenue).getDate() ===day &&
                            new Date(e.dateVenue).getMonth() ===month &&
                            new Date(e.dateVenue).getFullYear()===year
                        )

                        let sportIcon;
                        if(eventForDay){
                            if(eventForDay.sport==="Football")
                                sportIcon=<IoIosFootball className="text-4xl" /> 
                            else if(eventForDay.sport==="Basketball")
                                sportIcon=<GiBasketballBasket className="text-4xl"/>
                            else if(eventForDay.sport==="Hockey")
                                sportIcon=<GiHockey className="text-4xl"/>
                        }

                        return(  //este es el return del map
                            <div onClick={()=> handleClick(day)} key={day} className={`border-3  font-bold rounded-md h-25 flex flex-col items-center justify-center hover:bg-gray-300 hover:scale-110 transition-transform shadow-xl
                                    ${eventDays.includes(day) ? "bg-blue-950 border-yellow-500 text-white hover:bg-yellow-500" : ""} `}>
                            <span>{day}</span>
                            {sportIcon && <div>{sportIcon}</div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}