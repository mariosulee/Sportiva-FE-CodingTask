import { MdOutlineSportsMartialArts } from "react-icons/md";
import Calendar from "./components/Calendar"
import { Routes, Route } from "react-router-dom";
import EventDetail from "./components/EventDetail";
import { useState } from "react";
import eventsData from "./data/events.json"
import type { SportEvent } from "./types/types";
import EventForm from "./components/EventForm";



function App() {
  
  //global state for events 

  const [events, setEvents] = useState<SportEvent[]>(eventsData.data);


  return (
  
      <>

      <header className=" relative bg-linear-to-tr from-yellow-700 to-gray-800 py-1 md:py-3 shadow-lg px-10">
          <MdOutlineSportsMartialArts className=" absolute right-15 top-1/2 -translate-y-1/2  text-3xl md:text-6xl text-blue-50 "/>
          <h1 className="text-3xl md:text-6xl text-white tracking-tight font-black text-center font-sans drop-shadow-sm">Sportiva</h1>
          <p className=" text-xs md:text-sm mt-3 text-center text-amber-50 font-semibold font-sans ">an App by Mario Sulé</p>
          <p className="text-xs md:text-sm italic mt-2 text-center text-white font-semibold font-sans">your sports, your schedule</p>
      </header>
        

 
      <main>
        <Routes>
          <Route path="/" element={<Calendar events={events} />} />
          <Route path="/event/:date" element={<EventDetail events={events} setEvents={setEvents}/>} />
          <Route path="/addEvent" element={<EventForm events={events} setEvents={setEvents}/>} />
        </Routes>

      </main>
   
      




      <footer className="relative bg-linear-to-tr from-yellow-900 to-gray-800 py-1 md:py-5">
        <div className="container mx-auto px-5">
          <p className="text-white text-center text-xs md:text-lg py-2 font-semibold">
            Sportiva - Mario Sulé Domínguez. All rights reserved © 2025
          </p>
        </div>
      </footer>


      </>
  
  )
}

export default App
