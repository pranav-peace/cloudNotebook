import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
    let history = useHistory();
    const handleClick = async (event) => {
        event.preventDefault();
        const response = await fetch("https://cloud-notebook.herokuapp.com/api/auth/createuser", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password, confirmpassword: credentials.confirmpassword})
          });
          const json = await response.json();
          console.log(json);
          if(json.success){
                localStorage.setItem('token', json.authtoken);
                history.push('/');
                props.showAlert("Logged in Successfullly", "success");
          } else{
                props.showAlert("Please enter valid credentials", "danger");
          }
    }
    const onChange = (event) => {
        setCredentials({...credentials, [event.target.name]: event.target.value});
    }
    return (
        <div className="container">
            <h3>Sign Up to Continue</h3>
            <form onSubmit={handleClick}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} />
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={credentials.password} onChange={onChange} minLength={5} required/>
                </div>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" placeholder="Re-enter your Password" value={credentials.confirmpassword} onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default SignUp
