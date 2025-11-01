import { useParams, Link } from "react-router-dom"
import type { SportEvent } from "../types/types";
import { PiCalendarBlank } from "react-icons/pi";
import { GiHockey } from "react-icons/gi";
import { IoIosFootball } from "react-icons/io";
import { GiBasketballBasket } from "react-icons/gi";
import { useNavigate } from "react-router-dom";



type EventDetailProps={
    events: SportEvent[]
    setEvents:React.Dispatch<React.SetStateAction<SportEvent[]>>
}

export default function EventDetail({events, setEvents}:EventDetailProps){

    const{date}=useParams<{ date?:string}>();   //used to extract the dynamic parameter named 'date' when using <Route>
    const navigate=useNavigate();

    //se filtran los eventos de esa fecha
    const dayEvents=events.filter( ev => ev.dateVenue===date)

    if(dayEvents.length===0){
        return(
            <div className=" flex flex-col items-center justify-center text-center mb-43 bg-white">
                <h2 className="text-2xl font-bold mt-10 text-gray-080 ">Sorry,</h2>
                <h2 className="text-2xl font-bold py-2 mb-5 text-gray-800"> we couldn't find any events on this date</h2>
                <PiCalendarBlank className="text-[12rem] mb-10 text-gray-600"/>
                <Link to="/" className="inline-block px-7 text-white py-3 bg-blue-950 rounded-lg shadow-2xl font-bold text-xl hover:scale-110 transition-transform "> Go back to the calendar</Link>
            </div>
        )
    }


    const handleDelete= ( (id:string) => {
        const updatedEvents=events.filter ( event => event.id!== id)
        setEvents(updatedEvents)
        navigate("/")
    })


    // if there are events
    return(
        <>
            <div className="p-10">

                <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Events on {new Date(date!).toLocaleDateString("en-CA", {month:"long", day:"numeric"})}
                </h2>

                <div className="grid gap-5 max-w-4xl mx-auto">
                    {dayEvents.map( (event, index) => (
                        <div key={index} className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition-shadow">
                            
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-2xl font-bold text-blue-900 mb-2">{event.homeTeam} vs {event.awayTeam} </h3>
                                <p className={`inline-block font-bold px-4 text-xl py-2 bg-slate-100 rounded-4xl ${event.status==="Played"? "text-green-700" : "text-slate-500"} `}> {event.status}</p>
                            </div>
                            
                            <p className="font-bold text-yellow-800 text-xl mb-2"> {event.sport}</p>
                            <p className="font-semibold text-gray-600 text-xl py-2"> Season: {event.season}</p>
                            <p className="text-gray-600 text-xl font-semibold py-2"> Time: {event.timeVenueUTC}</p>
                            <p className="font-semibold text-gray-600 text-xl py-2"> Stadium: {event.stadium}</p>
                            <div className=" flex justify-between items-center mb-2">
                                <p className="font-semibold text-gray-600 text-xl "> League: {event.originCompetitionName}</p>
                                {event.sport==="Basketball" && <GiBasketballBasket className="text-6xl mr-5"/> }
                                {event.sport==="Football" && <IoIosFootball className="text-6xl mr-5" /> }
                                {event.sport==="Hockey" && <GiHockey className="text-6xl mr-5"/>}
                            </div>

                            <div className="flex justify-center mt-6">
                                <button onClick={() => handleDelete(event.id)}className="bg-red-600 text-white  uppercase font-bold px-4 py-2 rounded-lg hover:scale-105 transition-transform">
                                    Delete Event
                                </button>
                            </div>
                        </div>    
                    ))}
                </div>

                <div className=" text-center">
                    <Link to="/" className="p-10 text-center inline-block px-7 text-white mt-30 py-3 bg-blue-950 rounded-lg shadow-2xl font-bold text-xl hover:scale-110 transition-transform "> Go back to the calendar</Link>
                </div>   

            </div>

        </>
    )
}