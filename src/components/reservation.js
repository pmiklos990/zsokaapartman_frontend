import React from "react";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const Reservation = (props) => (
    <tr>
        <td>{props.reservation.title}</td>
        <td> <Moment format="YYYY-MM-DD">{props.reservation.start}</Moment></td>
        <td><Moment format="YYYY-MM-DD">{props.reservation.end}</Moment></td>
        <td>
            <Link to={"/edit/"+props.reservation._id}>Módosítás</Link>
        </td>
    </tr>
)

export default Reservation;