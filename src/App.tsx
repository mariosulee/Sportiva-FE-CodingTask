import { MdOutlineSportsMartialArts } from "react-icons/md";
import Calendar from "./components/Calendar"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventDetail from "./components/EventDetail";
import { useState } from "react";
import eventsData from "./data/events.json"
import type { Event } from "./types/types";

function App() {
  
  //global state for events 

  const [events, setEvents] = useState(eventsData.data as Event[]);

  return (
    <BrowserRouter>
      <>

      <header className=" relative bg-linear-to-tr from-yellow-700 to-gray-800 py-3 max-h-72 shadow-lg px-10">
          <MdOutlineSportsMartialArts className=" absolute right-15 top-1/2 -translate-y-1/2 text-6xl text-blue-50"/>
          <h1 className="text-6xl text-white tracking-tight font-black text-center font-sans drop-shadow-sm">Sportiva</h1>
          <p className=" text-sm mt-3 text-center text-amber-50 font-semibold font-sans ">an App by Mario Sulé</p>
          <p className="text-large italic mt-2 text-center text-white font-semibold font-sans">your sports, your schedule</p>
      </header>
        


      <main className="bg-slate-100">
        <Routes>
          <Route path="/" element={<Calendar events={events} />} />
          <Route path="/event/:date" element={<EventDetail events={events}/>} />
        </Routes>
   

      </main>




      <footer className="relative bg-linear-to-tr from-yellow-900 to-gray-800 py-5">
        <div className="container mx-auto px-5">
          <p className="text-white text-center text-lg py-2 font-semibold">
            Sportiva - Mario Sulé Domínguez. All rights reserved © 2025
          </p>
        </div>
      </footer>


      </>
    </BrowserRouter>
  )
}

export default App
