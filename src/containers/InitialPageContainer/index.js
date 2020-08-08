import React, { useState, useEffect } from 'react'
import { Grid, Fade, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
const useStyles = makeStyles({
  body: {
    height: '100vh',
    fontFamily: 'EB Garamond, serif',
  },
  container: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent:  'center',
  },
  title: {
    fontWeight: 400,
    alignSelf: 'flex-start',
    width: '100%',
    fontSize: '2rem',
  },
  description: {
    alignSelf: 'flex-start',
    width: '100%',
    fontSize: '1.2rem',
  },
  sidebar: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '0 1rem 0 0',
  },
  credits: {
    color: '#C6C6C6',
    alignSelf: 'flex-end',
  },
  selectionContainer: {
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    border: '1px solid #F4F4F4',
    width: '50%',
    alignSelf: 'center',
    height: '20vh',
    padding: '0 1rem',
    margin: '1rem 0',
    backgroundColor: '#FDFDFD',
  },
  selectionTitle: {
    alignSelf: 'center',
    color: '#A6A6A6',
  },
  button: {
    margin: '2rem 0 0 0',
    alignSelf: 'center',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    fontWeight: 600,
  },
});

export default function InitialPage() {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedBitcoin: false,
    checkedCovid: false,
  });
  const [bitcoinIsGoingUp, setBitcoinIsGoingUp] = useState({ bitcoinIsGoingUp : false})

  async function fetchData() {
    const res = await fetch("https://api.coindesk.com/v1/bpi/historical/close.json")
    res
    .json()
    .then(res => {
      let priceByDates = res.bpi
      {/* Next line is pure StackOverflow, oh yeah!*/}
      let yesterdayDate = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date).toISOString().slice(0,10)
      let yesterdayPrice = priceByDates[yesterdayDate]
      let priceSumLastMonth = Object.values(priceByDates).reduce((sum, curr) => curr + sum)
      let numOfDaysInLastMonth = Object.keys(priceByDates).length
      let monthAveragePrice = priceSumLastMonth / numOfDaysInLastMonth
      yesterdayPrice >= monthAveragePrice ? setBitcoinIsGoingUp({bitcoinIsGoingUp: true}) : setBitcoinIsGoingUp({bitcoinIsGoingUp: false})
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const checkBitcoinStatus = () => {
    return "bitcoin is cool"
  }

  const checkCovidStatus = () => {
    return "covid is not cool"
  }
  const handleButtonClick = (event) => {
    console.log(checkBitcoinStatus());
    console.log(checkCovidStatus());
    // console.log("state of covid:" + state.checkedCovid);
  }

  return (
    <Fade in timeout={3000}>
      <Grid container className={classes.body}>
        <Grid item xs={2} className={classes.sidebar}></Grid>
        <Grid item xs={8} className={classes.container}>
          <h1 className={classes.title}> What is the future of text-based storytelling? </h1>
          <section className={classes.description}>
            <p> The <i> Tale of Passion and Prowness</i> is a short-story that responds dinamically
            to social changes in the real world. <br></br>Are you ready to embark in an adventure directly
            influenced by the world around you? </p>
          </section>
          <h3 className={classes.selectionTitle}>My story should be influenced by...</h3>
          <section className={classes.selectionContainer}>
            <FormGroup row style={{display: 'flex'}}>
             <FormControlLabel
               control={<Checkbox checked={state.checkedBitcoin} onChange={handleChange} name="checkedBitcoin" />}
               label="Bitcoin volatility"
             />
             <FormControlLabel
               control={<Checkbox checked={state.checkedCovid} onChange={handleChange} name="checkedCovid" />}
               label="COVID-19 spread across the globe"
             />
            </FormGroup>
          </section>
          <button className={classes.button} onClick={handleButtonClick}> Start reading! </button>
        </Grid>
        <Grid item xs={2} className={classes.sidebar}>
          <h5 className={classes.credits}><i>by Teógenes Moura</i></h5>
        </Grid>
      </Grid>
    </Fade>
  )
}
