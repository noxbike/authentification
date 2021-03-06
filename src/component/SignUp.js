import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import axios from 'axios';
const emailValidate = /\S+@\S+\.\S+/;
const server = 'http://localhost:3001/api';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1.2),
            width:'38ch',
        },
    },
}));

export default function SignUp () {
    const [username, setUserName]           = useState(null);
    const [password, setPassword]           = useState(null);
    const [email, setEmail]                 = useState(null);
    const [error, setError]                 = useState({username: false, email:false, password: false})
    const [passwordCheck, setPasswordCheck] = useState(null);
    const classes                           = useStyles();

    const SignUpUser = (e) => {
        e.preventDefault();
        setError({username: false, email: false, password:false});
        if(!username || !email || !password || passwordCheck ){
            return setError({
                username: !username ? true : false, 
                email: !email ? true : false, 
                password:!password ? true : false
            })
        }
        if(!emailValidate.test(email)){
            alert('Votre email est invalide')
        }

        axios.post(`${server}/register`,{
            username,
            password,
            email
        })
        .then(response => {
            alert(response.data.succ)
        })
        .catch(err => {
            alert(err)
        })
    }

    return(
        <form className={classes.root + " signup_form"} noValidate autoComplete='off' onSubmit={(e) => SignUpUser(e)}>
            <div>
                <img src='./image/compagnie_logo.png' alt='logo_compagnie' width={200}/>
            </div>

            <TextField
                error={error.username}
                helperText={error.username ? "Please enter your username !" : null}
                id="outlined-basic"
                label="Username"
                placeholder='Enter your username'
                variant="outlined"
                onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
                error={error.email}
                helperText={error.email ? "Please enter a valid email !" : null}
                id="outlined-basic"
                label="Email"
                placeholder='Enter your email'
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                error={error.password}
                helperText={error.password ? "Please enter your password !" : null}
                id="outlined-basic"
                label="Password"
                placeholder='Enter your password'
                type='password'
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                error={passwordCheck}
                helperText={passwordCheck ? "The password it's different" : null}
                id="outlined-basic"
                label="Repeat your password"
                placeholder='Enter again your password'
                type='password'
                variant="outlined"
                onChange={(e) => setPasswordCheck(password === e.target.value ? false : true)}
            />
            <Button 
                type="submit"
                variant="contained"
                color="primary"
                disableElevation
            >
                Sign Up
            </Button>
        </form>
    )
}