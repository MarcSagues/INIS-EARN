
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useStateValue } from '../context/StateProvider';
import { makeStyles } from '@material-ui/core/styles';
import { actionTypes } from '../context/reducer';
import { db } from '../context/axios';
import jQuery from 'jquery'
import { Paper } from '@material-ui/core';
import { MD5 } from 'crypto-js';
import React, { useEffect, useState } from 'react';


const Login = () => {
  const [{user}, dispacth] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [wallet, setWallet] = useState('');
  const [amount, setAmount] = useState('');
  const [creation, setCreation] = useState('');
  const navigate = useNavigate();

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

    var log = false;
    for(let i = 0; i < users.length; i++){
      if(email === users[i].email){
        
       
        
        if(MD5(password).toString() === users[i].password){
          console.log(MD5(users[i].password).toString());
          log = true;
          dispacth({
            type: actionTypes.SET_USER,
            user: users[i],
            
          });
          
          navigate('/app/dashboard', { replace: true });
        };
         

        }
        if (log !== true){
          errorVisible();
      } 

    }
    
    
  }; 


  return (
    <>
      <Helmet>
        <title>Login | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign in on the internal platform
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(e) => setEmail(e.target.value) }
                  type="email"
                  value={email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={(e) => CheckSignIn(e)}
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>

      </Box>
    </>
  );
};

export default Login;
