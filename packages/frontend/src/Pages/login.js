import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useMatch} from "react-router-dom"
import PetsIcon from '@mui/icons-material/Pets';

  
function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const signupMatch = useMatch( "/signup" );
    useEffect(()=>{
        if(localStorage.getItem('token') != "" && localStorage.getItem('token') != null){
            navigate("/dashboard");
        }
        console.log(localStorage.getItem('token'))
    },[])
 
    const loginAction = (e) => {
        setValidationErrors({})
        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            email:email,
            password:password,
        }
        axios.post('/api/login', payload)
        .then((r) => {
            setIsSubmitting(false)
            localStorage.setItem('token', r.data.token)
            navigate("/dashboard");
        })
        .catch((e) => {
            setIsSubmitting(false)
            if (e.response.data.errors != undefined) {
                setValidationErrors(e.response.data.errors);
            }
            if (e.response.data.error != undefined) {
                setValidationErrors(e.response.data.error);
            }
        });
    }

    const paperStyle = { padding: '3.5rem', width: '80%', maxWidth: '900px', margin: '20px auto', backgroundColor: '#B2CAEB' }
    const headerStyle = { margin: '20', fontSize: '50px', paddingTop: '0px' }
    const avatarStyle = { backgroundColor: '#375c8f', width: '110px', height: '110px', marginBottom: '10px', marginTop: '0px'}
    const svgStyle = {
        fontSize: '100px', // adjust the font size as per your requirement
      }
    

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <PetsIcon style={svgStyle} />
                    </Avatar>
                    <h2 style={headerStyle}>Login</h2>
                </Grid>
                
<form onSubmit={(e)=>{loginAction(e)}} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <label className="label" style={{ fontSize: '40px'}}>Email:</label>
    <input 
        type="email"
        className="form-control"
        id="email"
        name="email"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        style={{height: '30px', fontSize: '30px'}}
    />
    <label className="label" style={{ fontSize: '40px' }}>Password:</label>
    <input 
        type="password"
        className="form-control"
        id="password"
        name="password"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        style={{height: '30px', fontSize: '30px'}}
    />
    <button 
        disabled={isSubmitting}
        type="submit"
        className="btn btn-primary btn-block"
        style={{fontSize: '50px', width: '300px', marginTop: '20px'}}>Login</button>
    <p className="text-center" style={{fontSize: '30px'}}>Don't have account? <Link to="/signup" style={{fontSize: '35px'}}>Register here</Link></p>
</form>

                
            </Paper>
    </Grid>

    )
}

export default Login;