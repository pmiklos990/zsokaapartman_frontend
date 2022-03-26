import React, {useEffect, useState } from "react";
import axios from 'axios';
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const  EditReservation = () => {


    let navigate = useNavigate(); 
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    useEffect (()=>{

        const id= window.location.href.split("/").pop();
        console.log('https://zsokaapartman-backend.herokuapp.com/reservation/'+ id);
        axios.get('https://zsokaapartman-backend.herokuapp.com/reservation/'+ id)
            .then(response => {
                setTitle(response.data.title);
                setDescription(response.data.description);
                setStart(response.data.start);
                setEnd(response.data.end)

            })
            .catch(function (error) {
                console.log(error);
            })

    },[]);

 
    const deleteButton = (e) => {
        const id= window.location.href.split("/").pop();
        axios.post('https://zsokaapartman-backend.herokuapp.com/reservation/delete/'+id, id)
            .then(res => {
                toast.success("Foglalás törölve", {duration: 1000})
            
                setTimeout(() => navigate('/reservationlist'), 1500);
                
            } );
        
    }

    

   

    const handleStartDateChange = (date) => {
    
        date.setHours(13, 0, 0, 0);
        setStart(date);
   
      }

      const handleEndDateChange = (date) => {
        date.setHours(10, 0, 0, 0);
        setEnd(date);
        
      }

    

    

    const onSubmit = (e) => {
        e.preventDefault();
        
        const updatedReservation = {
            description: description,
            title: title,
            start: start,
            end: end,
        }
        console.log("updatedReservation: ", updatedReservation);
        const id= window.location.href.split("/").pop();
        axios.post('https://zsokaapartman-backend.herokuapp.com/reservation/update/'+id, updatedReservation)
            .then(res => {
                toast.success("Foglalás módosítva", {duration: 1000})
            
                setTimeout(() => navigate('/reservationlist'), 1500);
            });
        
       
    }

    

    
        return (
            <div>
                <h3 align="center">Módosítás</h3>
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
                        <input 
                                type="text" 
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                    <label>Mikortól: </label>
                    <DatePicker
                        selected={Date.parse(start)}
                        onChange={handleStartDateChange}
                        dateFormat="yyyy/MM/dd"
                    />
                </div>

                <div className="form-group">
                    <label>Meddig: </label>
                    <DatePicker
                    selected={Date.parse(end)}
                    onChange={handleEndDateChange}
                    dateFormat="yyyy/MM/dd"
                    />
                </div>
                    <br />

                    <div className="form-group">
                        <input type="submit" value="Mentés" className="btn btn-primary" />
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="button" value="Törlés" onClick={deleteButton} className="btn btn-secondary" />
                    </div>
                </form>
                <ToastContainer />
                
            </div>
        )
    
}

export default EditReservation;