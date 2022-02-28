import React, {Component} from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';


const Reservation = props => (
    <tr>
        <td>{props.reservation.title}</td>
        <td> <Moment format="YYYY-MM-DD">{props.reservation.start}</Moment></td>
        <td><Moment format="YYYY-MM-DD">{props.reservation.end}</Moment></td>
        <td>
            <Link to={"/edit/"+props.reservation._id}>Módosítás</Link>
        </td>
    </tr>
)


export default class ReservationList extends Component {

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

    reservationList() {
        return this.state.reservations.map(function(currentReservation, i){
            return <Reservation reservation={currentReservation} key={i} />;
        })
    }

    render () {
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
                    { this.reservationList() }
                </tbody>
            </table>
        </div>
        )
    }

}