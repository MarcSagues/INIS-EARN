import React, { useEffect, useState } from 'react';
import './styles/errors.css'
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
import { useHistory } from 'react-router';
import { actionTypes } from '../context/reducer';
import { db } from '../context/axios';
import emailjs from 'emailjs-com';
import jQuery from 'jquery';
import{ init } from 'emailjs-com';
import Wallet from '../../src/blockchain/src/wallet/wallet';
import axios from 'axios';
import { Paper } from '@material-ui/core';


init("user_gyduzqABXjCbxIEE3cTiY");


var randomNumber = 0; 
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

export default function SignUp() {
  

    const classes = useStyles();
    const [{user}, dispacth] = useStateValue();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[users,setUsers] = useState([]);
    const history = useHistory();
    const[blockchain,setBlockchain] = useState([]);
    const [referrer, setReferrer] = useState('null');


    const wallet = new Wallet(blockchain, 0);
   
    
    function showErrorUsername(){
      jQuery('#usernameError').addClass('errorVisible');
    }
    function showErrorEmail(){
      jQuery('#emailError').html('Email is already used.');
      jQuery('#emailError').addClass('errorVisible');
    }
    function showErrorEmailFormat(){
      jQuery('#emailError').addClass('errorVisible');
      jQuery('#emailError').html('Email with bad format.');
    }
    function showErrorPassword(){
      jQuery('#passwordError').addClass('errorVisible');
    }
    function showErrorReferrer(){
      jQuery('#referrerError').addClass('errorVisible');
    }


    function dontShowErrorUsername(){
      jQuery('#usernameError').removeClass('errorVisible');
    }
    function dontShowErrorEmail(){
      jQuery('#emailError').removeClass('errorVisible');
    }
    function dontShowErrorEmailFormat(){
      jQuery('#emailError').removeClass('errorVisible');
    }
    function dontShowErrorReferrer(){
      jQuery('#referrerError').removeClass('errorVisible');
    }
    function dontShowErrorPassword(){
      jQuery('#passwordError').removeClass('errorVisible');
    }
    

    useEffect(() => {
     
    db.get('/users').then((result) => {
        
      setUsers(result.data);
    
      
    
        db.get('/blocks').then((result) => {
          console.table(result.data);
          setBlockchain(result.data);
          
        })
      
    });
  }); 
  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
var paramLink = window.location.search.substring(1);
var paramLinkParsed = paramLink.split('=')
console.log('getURL: '+paramLinkParsed[1]);
    const AddUser = (e) => {
     
      e.preventDefault();
      if (referrer === 'null'){
        
        setReferrer(paramLinkParsed[1]);
        
       
        }
     if(validateEmail(email) && password.length > 6){
      dontShowErrorEmailFormat();
      console.log('response2 = '+users);
      var response = 0;
      var responseRefer = 1;

      var mostrarUsername = 0;
      var mostrarEmail = 0;
      var usernameReferrer = 0;
      
      

    for (var i = 0; i < users.length; i++){

          if (users[i].username === username){
            response = 1;
            showErrorUsername();
           mostrarUsername = 1;

          } 
          if (users[i].email === email){
            response = 2;
            showErrorEmail();
            mostrarEmail = 1;
          } 
          if (users[i].username === referrer || referrer === undefined || referrer === null || referrer === 'null'){
            console.log('show error2: '+users[i].username);
            
            responseRefer = 0;
            dontShowErrorReferrer();
            usernameReferrer = 1;

          } 
          

        }
        if (mostrarUsername == 0){
          dontShowErrorUsername();
        } 
        if (mostrarEmail == 0){
          dontShowErrorEmail();
        }
        
        if(usernameReferrer == 1){
          dontShowErrorReferrer();

          } else {
            showErrorReferrer();
          
        }
      console.log('response return = '+response);
      if (response == 0 && responseRefer == 0){
        randomNumber = Math.floor(100000 + Math.random() * 900000);
        emailjs.send("confirm_email","template_y6kfnr8",{
          to_name: username,
          number: randomNumber,
          to_email: email,
          }).then(function(response) {
            if(response.text === 'OK'){

            }
           console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function(err) {
            alert('Ocurrió un problema al enviar el correo', + err);
           console.log("FAILED. error=", err);
        });
        
        dispacth({
          type: actionTypes.SET_EMAIL,
          email: email,
          
        });
        dispacth({
          type: actionTypes.SET_USER,
          username: username,
          
        });
        dispacth({
          type: actionTypes.SET_PASSWORD,
          password: password,
          
        });
        dispacth({
          type: actionTypes.SET_WALLET,
          wallet: wallet.publicKey,
          
        });
        dispacth({
          type: actionTypes.SET_AMOUNT,
          amount: '0',
          
        });
        dispacth({
          type: actionTypes.SET_CREATION,
          creation: Date.now().toString(),
          
        });
        if((referrer === undefined || 
          referrer === null ||
          referrer === 'null' )){
          dispacth({
            type: actionTypes.SET_REFERRALLIDER,
            referralLider: null,
            
          });
        } else {
          dispacth({
            type: actionTypes.SET_REFERRALLIDER,
            referralLider: referrer,
            
          });
        }
        
        dispacth({
          type: actionTypes.SET_REFERRALLINK,
          referralLider: 'iniscoin.com/signup?referral='+username,
          
        });
        dispacth({
          type: actionTypes.SET_REFERRALCOUNT,
          referralCount: 0,
          
        });
        
       

        
        history.push('/confirm_email');
      } else {
        console.log('error');
      }
    } else {
      if(password.length > 6){
      showErrorEmailFormat();
      dontShowErrorPassword();
      } else {
      showErrorPassword();

      dontShowErrorEmailFormat();
      }
    }

      
      
  
    }; 


    function ReturnReferrer(){

      if (paramLinkParsed.length >= 2){
        return(
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="user"
          label={paramLinkParsed[1]}
          type="text"
          id="referralCode"
          autoComplete="current-password"
          disabled
        />
          )
      } else {
        return(
        <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        name="user"
        label="Referral Code"
        type="text"
        id="referralCode"
        autoComplete="current-password"
        onChange={(e) => setReferrer(e.target.value)} //settejar el valor del email i guardar-ho dins la variable email
      />
        )
      }
    }

  return (
    <div style={{ width:'80vmin'}}>
    <Paper style={{height:'80vmin'}} >
    <React.Fragment>

    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Button href="/home" className={classes.back} variant="outline-primary">X</Button>{' '}
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <header className='errors' id='usernameError'>Username is already used.</header>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="user"
            label="User"
            type="text"
            id="user"
            autoComplete="current-password"
            onChange={(e) => setUsername(e.target.value)} //settejar el valor del email i guardar-ho dins la variable email
          />
        <header className='errors' id='emailError'>Email is already used.</header>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)} //settejar el valor del email i guardar-ho dins la variable email
          />
            <header className='errors' id='passwordError'>Password must have 7 letters or more</header>

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
            <header className='errors' id='referrerError'>This user doesn't exists.</header>

         {ReturnReferrer()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={AddUser}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already have an account? Sign In"}
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

export {randomNumber};