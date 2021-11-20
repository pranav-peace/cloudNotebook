import React, { useState } from 'react'
import { useHistory } from 'react-router';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let history = useHistory();
    const handleClick = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
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
        <div>
            <form onSubmit={handleClick}>
                <div className="form-group my-3">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" placeholder="Enter email" value={credentials.email} onChange={onChange} />
                </div>
                <div className="form-groupmy-3">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" placeholder="Password" value={credentials.password} onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;
