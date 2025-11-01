import { Link } from "react-router-dom"
import { categories } from "../data/categories"
import type { SportEvent } from "../types/types"
import { useState } from "react"
import { useNavigate } from "react-router-dom"



type EventFormProps={
    events:SportEvent[],
    setEvents: React.Dispatch<React.SetStateAction<SportEvent[]>>
}


export default function EventForm( {events, setEvents}: EventFormProps){

    const navigate=useNavigate()

    //LOCAL STATES
    const[category, setCategory]=useState("")
    const[team1, setTeam1]=useState("")
    const[team2, setTeam2]=useState("")
    const [stadium, setStadium] = useState("");
    const [league, setLeague] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");


    const handleSubmit= (e:React.FormEvent<HTMLFormElement>)=> {

        e.preventDefault()  //para manejar yo mismo lo q pasa cuando se pulsa submit

        if (!category || !team1 ||!team2 || !stadium|| !league||!date ||!time) {
            alert("Please fill all fields");
            return;
        }


        //create a new object of type SportEvent
        const newEvent: SportEvent = {
            id: crypto.randomUUID(),
            sport: category,
            homeTeam:team1,
            awayTeam:team2,
            stadium: stadium,
            originCompetitionName: league,
            dateVenue: date,
            timeVenueUTC: time +" (CET)",
            status: "scheduled",
            season: 2026,
        }

        setEvents([...events, newEvent])  //add the new event to the global state

       
        navigate("/")

    }



    return(
        <>
        <div className="bg-white">

            <form className="flex flex-col mt-15 px-15 ml-5 mr-5 border-yellow-500 border-3 rounded-lg" onSubmit={handleSubmit}>
                <label className="uppercase text-center py-5 text-2xl font-black y-2">New Event</label>

                <div className=" flex flex-col gap-2">

                    <label htmlFor="category" className="text-xl mt-3">Sport: </label>
                    <select id="category" className="bg-gray-100 rounded-md p-2" name="category"
                        onChange={ e=> setCategory(e.target.value)}>
                        <option value="">-- select a sport --</option>
                        {categories.map( cat => (
                            <option key={cat.id}> {cat.name} </option>
                        ))}
                    </select>

                    <label htmlFor="team1" className="text-xl mt-3">Name of Team 1: </label>
                    <input type="text" className="bg-gray-100 rounded-md p-2" name="team1" id="team1"
                    onChange={ e=> setTeam1(e.target.value)}></input>

                    <label htmlFor="team2" className="text-xl mt-3">Name of Team 2: </label>
                    <input type="text" className="bg-gray-100 rounded-md p-2" name="team2" id="team2"
                    onChange={ e=> setTeam2(e.target.value)}></input>

                    <label htmlFor="stadium" className="text-xl mt-3">Stadium: </label>
                    <input type="text" className="bg-gray-100 rounded-md p-2" name="stadium" id="stadium"
                    onChange={ e=> setStadium(e.target.value)}></input>
                    
                    <label htmlFor="league" className="text-xl mt-3">League: </label>
                    <input type="text" className="bg-gray-100 rounded-md p-2" name="legue" id="league"
                    onChange={ e=> setLeague(e.target.value)}></input>
                    
                    <label htmlFor="date" className="text-xl mt-3">Date of the event: </label>
                    <input type="date" className="bg-gray-100 rounded-md p-2" name="date" id="date"
                    onChange={ e=> setDate(e.target.value)}></input>

                    <label htmlFor="time" className="text-xl mt-3">Time of the event: </label>
                    <input type="time" className="bg-gray-100 rounded-md p-2" name="time" id="time"
                    onChange={ e=> setTime(e.target.value)}></input>


                    <input type="submit" className=" bg-blue-950 p-2 mt-10 mb-10 text-white uppercase font-black rounded-lg hover:scale-105 transition-transform" value="add event" ></input>
                </div>



            </form>


            <div className="p-10 mt-30 text-center">
                    <Link to="/" className="p-10 text-center inline-block px-7 text-white py-3 bg-blue-950 rounded-lg shadow-2xl font-bold text-xl hover:scale-110 transition-transform "> Go back to the calendar</Link>
            </div>  

        </div>
             
        </>
    )
}