import React, {useState, useEffect} from "react";

import axios from 'axios';

import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

const CalendarView = () => {
    const  [reservations, setReservations] = useState([]);

    useEffect (() =>  {
        
        axios.get('https://zsokaapartman-backend.herokuapp.com/reservation/')
            .then(response => {
                setReservations(response.data);
                console.log("response: ", response.data);
                console.log("state: ", reservations);
                
            })
            .catch(function (error){
                console.log(error);
                
            });

           
    }, []);


        
        return (
            <div>                         
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={reservations}
                    allDaySlot={false}
                    
                  
                />
            
            </div>
        )
    

}

export default CalendarView;