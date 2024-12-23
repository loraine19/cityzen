import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { Event, } from "../types/class";
import DataContext from "../contexts/data.context";
import { getEvents } from "../functions/API/eventsApi";
import { useToken } from "../functions/API/useToken";
import { get } from "http";



export function Test() {
    const { token, saveToken } = useToken();
    const { data } = useContext(DataContext);
    const [events, setEvents] = useState([])

    const fetchEvents = async () => {
        const events = await getEvents()
        setEvents(events);
        console.log(events)
    }




    // const [token, setToken] = useState<string>(localStorage.getItem("CollectifToken") || "pas identifié")
    const getToken = async () => {
        try {
            const result = await axios.post('http://localhost:3000/auth/signin', {
                email: "test@mail.com",
                password: "passwordtest"
            })
            console.log(result)
            saveToken(result.data.accessToken)
        }
        catch (error) { console.log(error) }
    }


    return (
        <div className="Body cyan">
            <main>
                <button onClick={() => fetchEvents()}>get events</button>
                <ul className="flex flex-col items-center gap-4 h-full p-12">
                    {events && events.map((event: Event) => {
                        return (
                            <li key={event.id}>
                                {event.title}
                            </li>
                        );
                    })}
                </ul>
                <button onClick={() => getToken()}>get token</button>
                <p>your token : {token}</p>
            </main>

        </div>
    );
}