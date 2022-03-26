import React, {useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import "react-datepicker/dist/react-datepicker.css";

const CreateReservation = () => {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    let navigate = useNavigate(); 

    const handleStartDateChange = (date) => {
        console.log("Date start: ", date)
        date.setHours(14, 0, 0, 0);
        console.log("Date start: ", date);
        setStart(date);
        
      }

     const  handleEndDateChange = (date) => {
        date.setHours(10, 0, 0, 0);
        setEnd(date);
      }

    const onSubmit = (e) => {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Reservation Description: ${description}`);
        console.log(`Reservation name: ${title}`);
        console.log(`Reservation from: ${start}`);
        console.log(`Reservation to: ${end}`);

        const newReservation = {
            description: description,
            title: title,
            start: start,
            end: end,
        }

        axios.post('https://zsokaapartman-backend.herokuapp.com/reservation/add', newReservation)
            .then(res => {

                
                
                console.log("response succes");

                toast.success("Sikeres foglalás!", {duration: 1000})
            
                setTimeout(() => navigate('/'), 1500);
               
                
            
            }).catch(err => {
                console.log(err);
                toast.success("Foglalás nem sikerült!", {duration: 1000})
                        
             });

           
            
    }

    return (
            <div style={{marginTop: 10}}>
            <h3>Új foglalás</h3>
            <form onSubmit={onSubmit}>

                <div className="form-group">
                    <label>Kategória: </label>
                        <select  className="form-control" onChange={(e) => (setTitle(e.target.value))}>
                            <option value="">Válassz kategóriát</option>
                            <option value="privát használat / private use ">privát használat</option>
                            <option value="foglalás / reservation">Foglalás</option>
                            <option value="egyéb / other">Egyéb</option>
                        </select> 
                   
                </div>

                <div className="form-group"> 
                    <label>Megjegyzés: </label>
                    <input  type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => (setDescription(e.target.value))}
                            />
                </div>
               

                <div className="form-group">
                    <label>Mikortól: </label>
                    <DatePicker
                        selected={start}
                        onChange={handleStartDateChange}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>

                <div className="form-group">
                    <label>Meddig: </label>
                    <DatePicker
                        selected={end}
                        onChange={handleEndDateChange}
                        dateFormat="yyyy-MM-dd"
                    />
                </div>
                

                

                <div className="form-group">
                    <input type="submit" value="Foglalás mentése" className="btn btn-primary" />
                    
                </div>
                
            </form>
            <ToastContainer />
        </div>
        )

    
}

export default CreateReservation;