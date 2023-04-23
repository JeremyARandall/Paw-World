import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useMatch, redirect, useLocation } from "react-router-dom"
import PetsIcon from '@mui/icons-material/Pets';
import { Store } from '../Store';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { userInfo } = state;
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const signupMatch = useMatch("/signup");

    const { search } = useLocation();
    const redirectURL = new URLSearchParams(search).get('redirect');
    const redirect = redirectURL ? redirectURL : '/';
    useEffect(() => {
        if (localStorage.getItem('userInfo') != "" && localStorage.getItem('userInfo') != null) {
            navigate(`${redirect}`);
        }
        console.log(localStorage.getItem('userInfo'))
    }, [navigate, redirect, userInfo])

    const loginAction = async (e) => {
        console.log('submit');
        setValidationErrors({})

        e.preventDefault();
        setIsSubmitting(true)
        let payload = {
            username: username,
            passwordHash: password,
        }
        try {
            const { data } = await axios.post('http://localhost:5000/api/users/login', payload);
            ctxDispatch({ type: 'USER_LOGIN', payload: data })
            setIsSubmitting(false)
            console.log(data)
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect || '/');

        } catch (err) {
            alert('Invalid credentials, please try again');
            setIsSubmitting(false)
            console.log(err);
            if (err !== undefined) {
                setValidationErrors(err);
            }

        };
    }

    const paperStyle = { padding: '3.5rem', width: '80%', maxWidth: '900px', margin: '20px auto', backgroundColor: '#B2CAEB' }
    const headerStyle = { margin: '20', fontSize: '50px', paddingTop: '0px' }
    const avatarStyle = { backgroundColor: '#375c8f', width: '110px', height: '110px', marginBottom: '10px', marginTop: '0px' }
    const svgStyle = {
        fontSize: '100px', // adjust the font size as per your requirement
    }


    return (
        <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh',backgroundColor: '#375c8f'}}>
            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <PetsIcon style={svgStyle} />
                    </Avatar>
                    <h2 style={headerStyle}>Login</h2>
                </Grid>

                <form onSubmit={loginAction} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <label className="label" style={{ fontSize: '40px' }}>Username:</label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => { setUsername(e.target.value) }}
                        style={{ height: '30px', fontSize: '30px' }}
                        required
                    />
                    <label className="label" style={{ fontSize: '40px' }}>Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        style={{ height: '30px', fontSize: '30px' }}
                        required
                    />
                    <button
                        //disabled={isSubmitting}
                        type="submit"
                        //className="btn btn-primary btn-block"
                        style={{ fontSize: '50px', width: '300px', marginTop: '20px' }}>Login</button>
                    <p className="text-center" style={{ fontSize: '30px' }}>Don't have account? <Link to={`/signup?redirect=${redirect}`} style={{ fontSize: '35px' }}>Register here</Link></p>
                </form>


            </Paper>
        </Grid>

    )
}

export default Login;