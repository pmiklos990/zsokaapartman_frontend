import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateReservation from "./components/createReservation";
import EditReservation from "./components/editReservation";
import ReservationList from "./components/reservationList";
import CalendarView from "./components/calendar";
import Admin from "./components/admin";

import logo from "./logo.svg";

const App = () => {
 
    return (
      <BrowserRouter>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          
            <Link to="/" className="navbar-brand">Zsóka apartman foglalási naptár</Link>
            <div className="collpase navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/admin" className="nav-link">Admin</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/reservationlist" className="nav-link">Lista nézet</Link>
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
            <Route path="/admin" element={<Admin />} />
          </Routes>
         
        </div>
      </BrowserRouter>
    );
  }


export default App;