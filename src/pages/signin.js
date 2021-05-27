import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useStateValue } from '../context/StateProvider';
import { actionTypes } from '../context/reducer';
import { useHistory } from 'react-router';
import { db } from '../context/axios';
import './styles/errors.css'
import jQuery from 'jquery'
import { Paper } from '@material-ui/core';
import { MD5 } from 'crypto-js';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/home">
        INIS
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  back: {
    position: 'absolute',
    left: '3%',
    top: '7%',
    width: '10%',
    fontSize: '1.5em',
    fontWeight: 'bold',
    color: '#3578e3',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3578e3',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {
  const classes = useStyles();
  const [{user}, dispacth] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [creation, setCreation] = useState('');



  useEffect(() => {

    db.get('/users').then((result) => {
        
      setUsers(result.data);
      
    });
  }); 
  
  function showError(){
    return (
    <header className='errors' id='loginError'> Incorrect email or password. </header>
    )
  } 
  function errorVisible(){
    jQuery('#loginError').addClass('errorVisible');
  }
  
  const CheckSignIn = (e) => {

    e.preventDefault();
    console.log(email);
    var log = false;
    for(let i = 0; i < users.length; i++){
      if(email === users[i].email){
        
        if(MD5(password).toString() === users[i].password){
          console.log(MD5(users[i].password).toString());
          log = true;
          dispacth({
            type: actionTypes.SET_EMAIL,
            email: email,
            
          });
          dispacth({
            type: actionTypes.SET_USER,
            username: users[i].username,
            
          });
          dispacth({
            type: actionTypes.SET_PASSWORD,
            password: users[i].password,
            
          });
          dispacth({
            type: actionTypes.SET_WALLET,
            wallet: users[i].wallet,
            
          });
          dispacth({
            type: actionTypes.SET_AMOUNT,
            amount: users[i].amount,
            
          });
          dispacth({
            type: actionTypes.SET_CREATION,
            creation: users[i].creation,
            
          });
          dispacth({
            type: actionTypes.SET_DATENOWCLICK,
            dateNowClick: users[i].dateNowClick,
            
          });
          dispacth({
            type: actionTypes.SET_REFERRALLIDER,
            referralLider: users[i].referralLider,
            
          });
          dispacth({
            type: actionTypes.SET_REFERRALLINK,
            referralLink: users[i].referralLink,
            
          });
          dispacth({
            type: actionTypes.SET_REFERRALCOUNT,
            referralCount: users[i].referralCount,
            
          });
    history.push('/home');
        };
         

        }
        if (log !== true){
          errorVisible();
      } 

    }
    
    
  }; 
  return (
    <div style={{ width:'80vmin'}}>
    <Paper style={{height:'65vmin'}} >
    <React.Fragment>

    <Container component="main" maxWidth="xs"   >

      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Button href="/home" className={classes.back} variant="outline-primary">X</Button>{' '}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {showError()}
        <form className={classes.form} noValidate>
          <TextField
          type="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)} //settejar el valor del email i guardar-ho dins la variable email
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)} //settejar el valor del email i guardar-ho dins la variable email

          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => CheckSignIn(e) }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
    </React.Fragment>

    </Paper>
    
    </div>

  );
}