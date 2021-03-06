import React, { useState } from "react";


const Admin = () => {
 
  const [adminPassword, setAdminPassword] = useState(localStorage.getItem("adminPassword"));
  const [adminEmail, setAdminEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("LOGGEDIN"));
  
  


  const handleLogout = () => {
 
      localStorage.clear();
      setAdminPassword(undefined);
      setAdminEmail(undefined);
      setLoggedIn(undefined);
    
  };

  const handleSubmit = async () => {

      
      if (adminPassword==="torony" && adminEmail==="eifel") {
       
        
        setLoggedIn("LOGGEDIN");
        localStorage.setItem("LOGGEDIN", "LOGGEDIN");
        console.log("loegged in ?", loggedIn);
       
        

      } else {
       
        
        setLoggedIn(undefined);
        
      }
      
  }

  
  return (
    
      <div>
       
         <form className="form-inline">
          {loggedIn!=="LOGGEDIN" && <div className="mx-sm-3 mb-2">
              <label  className="sr-only">Email</label>
              <input 
                      type="text" 
                      className="form-control" 
                      id="adminEmail" 
                      placeholder="admin email" 
                      onChange={e => setAdminEmail(e.target.value) }
                      
                      />
          </div>}
          {loggedIn!=="LOGGEDIN" && <div className="form-group mx-sm-3 mb-2">
              <label  className="sr-only">Jelszó</label>
              <input  type="password" 
                      className="form-control" 
                      id="inputPassword2" 
                      placeholder="admin jelszó" 
                      onChange={e => setAdminPassword(e.target.value) }/>
          </div>}
          <div className="form-group mx-sm-3 mb-2">
            {loggedIn 
              ? 
              <button  onClick={handleLogout} className="btn btn-primary mb-2">Admin Kijelentkezés</button>
              
              :
              <button  onClick={handleSubmit} className="btn btn-primary mb-2">Admin Bejelentkezés</button>}
          </div>

          {loggedIn==="LOGGEDIN" && <div>Most be vagy jelentkezve, mint adminisztrátor!</div>}
        </form>

     
      </div>      

     
    
  );
};

export default Admin;
