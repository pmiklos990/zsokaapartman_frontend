import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateReservation from "./components/createReservation";
import EditReservation from "./components/editReservation";
import ReservationList from "./components/reservationList";
import CalendarView from "./components/calendar";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://codingthesmartway.com" target="_blank">
              <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
            </a>
            <Link to="/" className="navbar-brand">Zsóka apartman foglalások</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Naptár</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/reservationlist" className="nav-link">Foglalások</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Foglalás</Link>
                </li>
              </ul>
            </div>
          </nav>
          <br/>
          <Routes>
            <Route path="/" exact element={<CalendarView />} />
            <Route path="/edit/:id" element={<EditReservation />} />
            <Route path="/create" element={<CreateReservation />} />
            <Route path="/reservationlist" element={<ReservationList />} />
          </Routes>
         
        </div>
      </BrowserRouter>
    );
  }
}

export default App;