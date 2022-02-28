import React, {Component} from "react";

import axios from 'axios';



import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!




let events = [
    { title: 'event 1', start: '2022-02-05', end: '2022-02-07', description: "remark" },
    { title: 'event 2', date: '2022-02-20', end: '2022-02-21',  description: "remark"  }
  ];








export default class CalendarView extends Component {

    constructor(props) {
        super(props);
        this.state = {reservations: []};
        
        
    }

    componentDidMount() {
        
        axios.get('https://zsokaapartman-backend.herokuapp.com/reservation/')
            .then(response => {
                this.setState({ reservations: response.data });
                console.log("response: ", response.data);
                console.log("state: ", this.state.reservations)
            })
            .catch(function (error){
                console.log(error);
            });

           
    }

 
    

    render () {


        
        return (
            <div>
                <h3>Naptár</h3>
                
                <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    events={this.state.reservations}
                />
                {/* <Calendar
                    events={this.state.reservations}
                    mode='yearlyMode'
                  
                /> */}
            
            </div>
        )
    }

}