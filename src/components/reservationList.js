import React, {useState, useEffect} from "react";
import axios from 'axios';


import Reservation from "./reservation";





const ReservationList = () => {

    const [reservations, setReservations] = useState([]);
  

    useEffect(() => {
        axios.get('https://zsokaapartman-backend.herokuapp.com/reservation/')
            .then(response => {
                setReservations(response.data)
                //this.setState({ reservations: response.data });
                console.log("response: ", response.data);
                console.log("state: ", reservations)
            })
            .catch(function (error){
                console.log(error);
            });
    }, []) ;

    const reservationList = () => {
        return reservations.map(function(currentReservation, i){
            return <Reservation reservation={currentReservation} key={i} />;
        })
    }

   
        return (
            <div>
            <h3>Foglalások</h3>
            <table className="table table-striped" style={{ marginTop: 20 }} >
                <thead>
                    <tr>
                        <th>Foglalás</th>
                        <th>Mikortól</th>
                        <th>Meddig</th>
                    </tr>
                </thead>
                <tbody>
                    { reservationList() }
                </tbody>
            </table>
        </div>
        );
     };

    export default ReservationList;