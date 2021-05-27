import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useState } from 'react';
import emailjs, {init} from 'emailjs-com';
import { register } from 'src/serviceWorker';
import ConfirmEmail from '../components/register/confirm_email'
import Modal from '@material-ui/core/Modal';
import {db} from '../context/axios'
import { MD5 } from 'crypto-js';
import { actionTypes } from 'src/context/reducer';
import { useStateValue } from 'src/context/StateProvider';


init("user_gyduzqABXjCbxIEE3cTiY");


const Register = () => {
  const navigate = useNavigate();
  const [randomNumber,setRandomNumber] = useState(0);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [{user}, dispacth] = useStateValue();
  const [referral,setReferral] = useState('');
  const [emailSuccess,setEmailSuccess] = useState(false);


  const register = (e) => {
    e.preventDefault();
    let random = Math.floor(100000 + Math.random() * 900000);
              setRandomNumber(random);
              console.log(random);
              console.log(username, email);

              emailjs.send("confirm_email","template_y6kfnr8",{
              to_name: username,
              number: random,
              to_email: email,
          }).then(function(response) {
            if(response.text === 'OK'){
              

              
              setEmailSuccess(true)
              
            }
            
           console.log("SUCCESS. status=%d, text=%s", response.status, response.text);
        }, function(err) {
            alert('Ocurrió un problema al enviar el correo', + err);
           console.log("FAILED. error=", err);
        });

        let wallet = ""
        db.get('/newWallet').then((result) => {
                console.log(result.data)
                wallet = result.data;
                
        })

        console.table(
          {
            username: username,
            password: MD5(password).toString(),
            email: email,
            wallet: wallet,
            amount: 0,
            creation: Date.now(),
            referralLink: 'iniscoin.com/signup?referral='+username,
            referralLider: referral,
            dateNowClick: 0,
  
          }
        )
        dispacth({
          type: actionTypes.SET_USER,
          user: {
              username: username,
              password: MD5(password).toString(),
              email: email,
              wallet: wallet,
              amount: 0,
              creation: Date.now(),
              referralLink: 'iniscoin.com/signup?referral='+username,
              referralLider: referral,
              dateNowClick: 0,
          }
        })

  }


  return (
    <>
      <Helmet>
        <title>Register | Material Kit</title>
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
              email: '',
              firstName: '',
              lastName: '',
              password: '',
              policy: false
            }}
            /* validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                firstName: Yup.string().max(255).required('User is required'),
                lastName: Yup.string().max(255).required('User does not exist'),
                password: Yup.string().max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            } */
            onSubmit={() => {
              
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
                  <Modal open={emailSuccess}> 
                  <div>
                    {<ConfirmEmail randomNumber={randomNumber}/>}
                  </div> 
                  </Modal> 
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="Username"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Referral User"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={(e) => setReferral(e.target.value)}
                  value={referral}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={(e) => register(e)}
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
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

export default Register;
