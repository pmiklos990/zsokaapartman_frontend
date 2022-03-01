import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";

export default class EditReservation extends Component {

    constructor(props) {
        super(props);

        this.onChangeReservationDescription = this.onChangeReservationDescription.bind(this);
        this.onChangeReservationTitle = this.onChangeReservationTitle.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);
        this.deleteButton = this.deleteButton.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            description: '',
            title: '',
            start: '',
            end: ''
        }
    }

    componentDidMount() {
        console.log('component did mount, state now: ', this.state);
        console.log("type of start: ", typeof(this.state.end));
        const id= window.location.href.split("/").pop();
        console.log('https://zsokaapartman-backend.herokuapp.com/reservation/'+ id);
        axios.get('https://zsokaapartman-backend.herokuapp.com/reservation/'+ id)
            .then(response => {
                this.setState({
                    description: response.data.description,
                    title: response.data.title,
                    start: response.data.start,
                    end: response.data.end
                }) 
                console.log('component did mount and state was setting from database, state now: ', this.state);  
                console.log("type of start: ", typeof(this.state.end));
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    deleteButton(e) {
        const id= window.location.href.split("/").pop();
        axios.post('https://zsokaapartman-backend.herokuapp.com/reservation/delete/'+id, id)
            .then(res => console.log(res.data));
        
    }

    onChangeReservationTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeReservationDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    

   

    handleStartDateChange(date) {
    
        date.setHours(13, 0, 0, 0);
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
        
        const updatedReservation = {
            description: this.state.description,
            title: this.state.title,
            start: this.state.start,
            end: this.state.end,
        }
        console.log("updatedReservation: ", updatedReservation);
        const id= window.location.href.split("/").pop();
        axios.post('https://zsokaapartman-backend.herokuapp.com/reservation/update/'+id, updatedReservation)
            .then(res => console.log(res.data));
        
       
    }

    

    render() {
        return (
            <div>
                <h3 align="center">Módosítás</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Name: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.title}
                                onChange={this.onChangeReservationTitle}
                                />
                    </div>
                    <div className="form-group">
                        <label>Megjegyzés: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.description}
                                onChange={this.onChangeReservationDescription}
                                />
                    </div>
                    <div className="form-group">
                    <label>Mikortól: </label>
                    <DatePicker
                        selected={Date.parse(this.state.start)}
                        onChange={this.handleStartDateChange}
                        dateFormat="yyyy/MM/dd"
                    />
                </div>

                <div className="form-group">
                    <label>Meddig: </label>
                    <DatePicker
                    selected={Date.parse(this.state.end)}
                    onChange={this.handleEndDateChange}
                    dateFormat="yyyy/MM/dd"
                    />
                </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Mentés" className="btn btn-primary" />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="button" value="Törlés" onClick={this.deleteButton} className="btn btn-secondary" />
                    </div>
                </form>
                
            </div>
        )
    }
}