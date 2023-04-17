import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useMatch} from "react-router-dom"

  
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

    const paperStyle = { padding: '30px 20px', width: 500, margin: '20px auto' }
    const headerStyle = { margin: '0' }
    const avatarStyle = { backgroundColor: 'green' }

    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <AddCircleOutlineOutlinedIcon></AddCircleOutlineOutlinedIcon>
                    </Avatar>
                    <h2 style={headerStyle}>Login</h2>
                </Grid>
                
                <form onSubmit={(e)=>{loginAction(e)}}>

                    <label className="label">Email</label>
                    <input 
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e)=>{setEmail(e.target.value)}}
                    />
                    <label className="label">Password</label>
                    <input 
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=>{setPassword(e.target.value)}}
                    />

                    <button 
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-primary btn-block">Login</button>
                        <p className="text-center">Don't have account? <Link to="/signup">Register here</Link></p>
                   
                </form>
                
            </Paper>
        </Grid>

    )
}

export default Login;