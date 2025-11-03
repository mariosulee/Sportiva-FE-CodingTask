import { useParams, Link } from "react-router-dom"
import type { SportEvent } from "../types/types";
import { PiCalendarBlank } from "react-icons/pi";
import { GiHockey } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { GiBasketballBasket } from "react-icons/gi";
import { useNavigate } from "react-router-dom";


type EventDetailProps={
    events: SportEvent[]
    dispatch:React.Dispatch<any>
}

export default function EventDetail({events, dispatch}:EventDetailProps){

    const{date}=useParams<{ date?:string}>();   //used to extract the dynamic parameter named 'date' when using <Route>
    const navigate=useNavigate();

    // firstly, the events of that date are filtered
    const dayEvents=events.filter( ev => ev.dateVenue===date)

    // 1. If there are no events, display that on the screen
    if(dayEvents.length===0){
        return(
            <div className=" flex flex-col items-center justify-center text-center mb-7 md:mb-15 bg-white">
                <h2 className="text-sm md:text-2xl font-bold mt-10 text-gray-800 ">Sorry,</h2>
                <h2 className="text-sm md:text-2xl font-bold py-2 mb-5 text-gray-800"> we couldn't find any events on this date</h2>
                <PiCalendarBlank className="text-6xl md:text-[12rem] text-gray-600"/>
                <Link to="/" className=" text-xs  text-center inline-block  px-3 py-2 md:px-7 text-white mb-15 mt-10 md:mt-20 bg-blue-950 rounded-lg shadow-2xl font-bold md:text-xl hover:scale-110 transition-transform "> Go back to the calendar</Link>
            </div>
        )
    }


    const handleDelete= ( (id:string) => {
        dispatch( {type:'delete-event', payload:{id} })
        navigate("/")
    })


    // 2. If there are events, return this
    return(
        <>
            <div className="p-4 md:p-10 bg-slate-50">

                <h2 className=" text-lg md:text-4xl font-bold text-center mb-8 text-gray-800">
                    Events on {new Date(date!).toLocaleDateString("en-CA", {month:"long", day:"numeric"})}
                </h2>

                <div className="grid gap-5 ">
                    {dayEvents.map( (event, index) => (
                        <div key={index} className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                            
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm md:text-2xl font-bold text-blue-900 mb-2">{event.homeTeam} vs {event.awayTeam} </h3>
                                <p className={`inline-block font-bold px-4 text-sm md:text-xl py-2 bg-slate-100 rounded-4xl ${event.status==="Played"? "text-green-700" : "text-slate-500"} `}> {event.status}</p>
                            </div>
                            
                            <p className="font-bold text-yellow-800 text-sm md:text-xl mb-2"> {event.sport}</p>
                            <p className="font-semibold text-gray-600 text-sm md:text-xl py-2"> Season: {event.season}</p>
                            <p className="text-gray-600 text-sm md:text-xl font-semibold py-2"> Time: {event.timeVenueUTC}</p>
                            <p className="font-semibold text-gray-600 text-sm md:text-xl py-2"> Stadium: {event.stadium}</p>
                            <div className=" flex justify-between items-center mb-2">
                                <p className="font-semibold text-gray-600 text-sm md:text-xl "> League: {event.originCompetitionName}</p>
                                {event.sport==="Basketball" && <GiBasketballBasket className="text-3xl md:text-6xl md:mr-5"/> }
                                {event.sport==="Football" && <IoIosFootball className="text-3xl md:text-6xl md:mr-5" /> }
                                {event.sport==="Hockey" && <GiHockey className="text-3xl md:text-6xl mr-2 md:mr-5"/>}
                            </div>

                            <div className="flex justify-center mt-6">
                                <button onClick={() => handleDelete(event.id)}className="bg-red-600 text-white md:uppercase font-bold text-sm md:text-xl px-2 md:px-4 md:py-2 rounded-sm md:rounded-lg hover:scale-105 transition-transform">
                                    Delete Event
                                </button>
                            </div>
                        </div>    
                    ))}
                </div>

                <div className=" text-center">
                    <Link to="/" className=" text-sm  text-center inline-block  px-3 py-2 md:px-7 text-white mb-7 md:mb-15 mt-10 md:mt-20 md:py-3 bg-blue-950 rounded-lg shadow-2xl font-bold md:text-xl hover:scale-110 transition-transform "> Go back to the calendar</Link>
                </div>   

            </div>

        </>
    )
}