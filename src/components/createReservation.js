import React, {Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

export default class CreateReservation extends Component {

    constructor (props) {
        super(props);

        this.onChangeReservationDescription = this.onChangeReservationDescription.bind(this);
        this.onChangeReservationName = this.onChangeReservationName.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      
        this.state = {
            title: '',
            description: '',
            start: '',
            end: '',
        }
    }
    

    onChangeReservationDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    
    onChangeReservationName(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleStartDateChange(date) {
        console.log("Date start: ", date)
        date.setHours(14, 0, 0, 0);
        console.log("Date start: ", date)
        this.setState({
            start: date
        });
      }

      handleEndDateChange(date) {
        date.setHours(10, 0, 0, 0);
        this.setState({
            end: date
        });
      }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Reservation Description: ${this.state.description}`);
        console.log(`Reservation name: ${this.state.title}`);
        console.log(`Reservation from: ${this.state.start}`);
        console.log(`Reservation to: ${this.state.end}`);

        const newReservation = {
            description: this.state.description,
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,
        }

        axios.post('https://zsokaapartman-backend.herokuapp.com/reservation/add', newReservation)
            .then(res => console.log(res.data));
        
        this.setState({
            description: '',
            title: '',
            start: '',
            end: '',
        })
    }

  



    render () {
        return (
            <div style={{marginTop: 10}}>
            <h3>Új foglalás</h3>
            <form onSubmit={this.onSubmit}>

                <div className="form-group">
                    <label>Cím: </label>
                    <input 
                            type="text" 
                            className="form-control"
                            value={this.state.title}
                            onChange={this.onChangeReservationName}
                            />
                </div>

                <div className="form-group"> 
                    <label>Megjegyzés: </label>
                    <input  type="text"
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeReservationDescription}
                            />
                </div>
               

                <div className="form-group">
                    <label>Mikortól: </label>
                    <DatePicker
                    selected={this.state.start}
                    onChange={this.handleStartDateChange}
                    dateFormat="yyyy-MM-dd"
                    />
                </div>

                <div className="form-group">
                    <label>Meddig: </label>
                    <DatePicker
                    selected={this.state.end}
                    onChange={this.handleEndDateChange}
                    dateFormat="yyyy-MM-dd"
                    />
                </div>
                

                

                <div className="form-group">
                    <input type="submit" value="Foglalás mentése" className="btn btn-primary" />
                </div>
                
            </form>
        </div>
        )

    }
}