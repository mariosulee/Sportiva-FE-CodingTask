import type { SportEvent } from "../types/types";
import eventsData from "../data/events.json"

export type EventState={
    events:SportEvent[]
}

const localStorageEvents=(): SportEvent[] => {
    const events=localStorage.getItem("events")
    if(events){
        const parsed=JSON.parse(events)
        if(Array.isArray(parsed) && parsed.length>0){
            return parsed //if there are events, return them
        }   
    }
    return eventsData.data // if there's nothing on LS, return the example events in the JSON
    
}

export const initialState:EventState={
    events:localStorageEvents()
}

export type eventActions=
    {type:'add-event', payload:SportEvent} |
    {type: 'delete-event', payload: {id:string}}



export const eventReducer= (  //useReducer takes 2 parameters
    state:EventState=initialState,
    action:eventActions) => {

        if(action.type==='add-event'){
            return{
                ...state,
                events:[...state.events, action.payload]
            }
        }

        if(action.type==='delete-event'){
            return{
                ...state,
                events: state.events.filter( e=> e.id !==action.payload.id)
            }
        }




        return state;
    } 