import React, { useState, useEffect } from 'react'
import { Grid,Dialog, DialogTitle,
          Fade, FormGroup, FormControlLabel,
          Checkbox, CircularProgress} from '@material-ui/core'
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

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Gathering Bitcoin's information...</DialogTitle>
        <Grid container style={{display: 'flex', justifyContent: 'center'}}>
          <Grid item style={{alignSelf: 'center', padding: '1rem'}}>
            <center>
            <h5> Determining Lúcio's fate... </h5>
            <CircularProgress />
            </center>
          </Grid>
        </Grid>
    </Dialog>
  );
}

export default function InitialPage() {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedBitcoin: false,
    checkedCovid: false,
  });
  const [open, setOpen] = useState(false);
  const [bitcoinIsGoingUp, setBitcoinIsGoingUp] = useState({ bitcoinIsGoingUp : false})

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = (value) => {
    setOpen(false)
  }

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
      setOpen(true)
      sleep(4000).then(() => {
        bitcoinIsGoingUp ?
        window.open('https://teogenesmoura.github.io/adaptative-book-version-1/', "_blank") :
        window.open('https://teogenesmoura.github.io/adaptative-book-version-2/', "_blank")
      })
  }

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  return (
    <Fade in timeout={3000}>
      <>
      <Grid container className={classes.body}>
        <Grid item xs={2} className={classes.sidebar}></Grid>
        <Grid item xs={8} className={classes.container}>
          <h1 className={classes.title}> What is the future of text-based storytelling? </h1>
          <section className={classes.description}>
            <p> The <i> Party's radio</i> is a short-story that responds dinamically
            to social changes in the real world. <br></br>Are you ready to embark in an adventure directly
            influenced by the world around you? </p>
          </section>
          <button className={classes.button} onClick={handleButtonClick}> Start reading! </button>
        </Grid>
        <Grid item xs={2} className={classes.sidebar}>
          <h5 className={classes.credits}><i>by Teógenes Moura</i></h5>
        </Grid>
      </Grid>
      <SimpleDialog open={open} onClose={handleClose} />
      </>
    </Fade>
  )
}
