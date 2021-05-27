
import React, { Component, useEffect, useState } from 'react'


import jQuery from 'jquery'
import { useStateValue } from '../../context/StateProvider';
import { actionTypes } from '../../context/reducer';
import { db } from '../../context/axios';


import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';


import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Container, Grid } from '@material-ui/core';



const AMOUNT = 1;
const REFERRER_MULTIPLYER = 0.20;
var WALLET;

      
/*
setInterval(function time(){
    var d = new Date();
    var hours = 24 - d.getHours();
    var min = 60 - d.getMinutes();
    if((min + '').length == 1){
      min = '0' + min;
    }
    var sec = 60 - d.getSeconds();
    if((sec + '').length == 1){
          sec = '0' + sec;
    }
    jQuery('#the-final-countdown p').html(hours+':'+min+':'+sec)
  }, 1000);
*/





const Mine = () => {

  const [{user}, dispacth] = useStateValue();

    var totalAmount = 0;
  const oneday = 60 * 60 * 24 * 1000; 
useEffect (() => {
  jQuery('#amountInis').each( function () {
    // get value of table cell and convert to number...
    var val = parseFloat(user.amount);
    // put it back as fixed point value
    jQuery(this).text(val.toFixed(2)+' INIS');
});
})
  


  const useStyles = makeStyles((theme) => ({
    
    inisAmount: {
      position: 'relative',


    },
    time: {
      position: 'relative',


    },
    title: {
      position: 'relative',

      fontWeight: 'bold',

      color: '#3578e3',
    },
    paper: {
      width: '90vmin',
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: '70vmin',
    },

  }));
const classes = useStyles();
const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

var t;


      function checkTime(i) {
        if (i < 10) {
          i = "0" + i;
        }
        return i;
      }

      function startTime(date) {
        if(( parseInt(user.dateNowClick) + oneday) < Date.now()){

          jQuery('#btn_mine').html( 'MINE');
          jQuery('#btn_mine').css("background-color", "#3578e3");
          jQuery('#btn_mine').css("border-color", "white"); 
   
        } else {
          var dateNow = new Date(date)
          var s = dateNow.getSeconds();
          var m = dateNow.getMinutes();
          var h = dateNow.getUTCHours();
          // add a zero in front of numbers<10
          m = checkTime(m);
          s = checkTime(s);
          jQuery('#btn_mine').html( h + ":" + m + ":" + s);
          jQuery('#btn_mine').css("background-color", "grey");
          jQuery('#btn_mine').css("border-color", "grey");    
          t = setTimeout(function() {
            startTime( parseInt(user.dateNowClick) - Date.now() )
          }, 500);
        }

       
      }
      
    

    function Mine24() {

       
    

      
      var date = Date.now();




      if(( parseInt(user.dateNowClick) + oneday) <= Date.now()){
      var amountBlockchain = 0;
      
      var dateClick =  Date.now();
      if (user.referralLider !== null){
        totalAmount =  user.amount + AMOUNT + (REFERRER_MULTIPLYER*(user.referralCount+1));
        amountBlockchain =  AMOUNT + (REFERRER_MULTIPLYER*(user.referralCount+1));
      } else{
        totalAmount =  user.amount + AMOUNT + (REFERRER_MULTIPLYER*parseInt(user.referralCount));
        amountBlockchain =   AMOUNT + (REFERRER_MULTIPLYER*parseInt(user.referralCount));
      }

      

      db.post('/transaction',{
          amount: amountBlockchain,
          recipient: user.wallet,
    }).then((result) => {
      console.log(result);
      dispacth({
        type: actionTypes.SET_AMOUNT,
        amount: totalAmount,
        
      });
      dispacth({
        type: actionTypes.SET_DATENOWCLICK,
        dateNowClick: dateClick.toString(),
        
      });
      
      
  }, (error) => {
    console.log(error);
      });
  
      const userActive = {
        
        amount: totalAmount,
        wallet: user.wallet,
        dateNowClick: dateClick.toString(),
      };

      console.table('useractive: '+userActive.amount);
      
      db.post('/addAmount', userActive)
      .then(res => {
        console.table('amount: updated: '+res);
        console.table('amount: updated: '+res.data[0]);
      }, (error) => {
        console.log(error);
          
      });

    } else {

      startTime(parseInt(user.dateNowClick) - Date.now() )
    }
    
    
}

    if (user.wallet !== null  ){
      return (
        <Box justifyContent="center">
        <Paper className={fixedHeightPaper}>
        <React.Fragment>
        <Container maxWidth="lg">
        <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="space-between"

>
<Grid item xs={6}   my={4}>
           <Typography className={classes.title} variant="h1" gutterBottom>INIS EARN</Typography>
           </Grid>
           <Grid item xs={6}   my={10}>
          <Typography className={classes.inisAmount} component="p" variant="h2" id='amountInis' gutterBottom>
            {user.amount} INIS
          </Typography>
          </Grid>
          <Grid item xs={6}   my={4}>

          <Typography className={classes.time} >
            on 06 April, 2021
          </Typography>
          </Grid>
          <Grid item xs={6}   my={4}>
          <Button id="btn_mine" onClick={Mine24}>MINE</Button>
          </Grid>

        </Grid>
        </Container>
          
          
          
        </React.Fragment>
      </Paper>
      </Box>
      );
  }else {
      return (

          <div>
          <Paper className={fixedHeightPaper}>
          <React.Fragment>
          
            <Typography className={classes.title}>LOG IN TO GET YOUR INIS</Typography>
            <Typography className={classes.inisAmount} component="p" variant="h4">
              00 INIS
            </Typography>
            <Typography className={classes.time} >
              on 06 April, 2021
            </Typography>
            
              <button id="btn_mine" disabled>DISABLED</button>
            
          </React.Fragment>
        </Paper>
        </div>
        );
    }
    
  
  }   
    
export default Mine;