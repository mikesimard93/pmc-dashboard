import logo from './logo.svg';
import './App.css';
import Members from './hours_members'
import PieChartHours from './pie_chart_hours'
import TEST from './to_watch'
import Intro from './intro'
import GaugePerformance from './gauge'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from './avatars'
import Etienne from './etienne.jpg'; // with import
import Antoine from './antoine.jpg'; // with import
import Mike from './mike.jpg'; // with import
import Nic from './nic.jpg'; // with import
import William from './william.jpg'; // with import
import Santi from './santiago.jpg'; // with import
import Simon from './simon.jpg'; // with import
import Sam from './sam.jpg'; // with import
import Raph from './raph.jpg'; // with import
import AntoineM from './AntoineM.png'; // with import
import UdeS from './Logo_Couleurs.png'; // with import
import Box from '@material-ui/core/Box';

function App() {
  return (

    <div className="App">
        <Box >
            <Box >
                <img src={Antoine} align='left' height="100"/>
                <img src={Etienne} align='left' height="100"/>
                <img src={Mike} align='left' height="100"/>
                <img src={Nic} align='left' height="100"/>
                <img src={Raph} align='left' height="100"/>
                <img src={Sam} align='left' height="100"/>
                <img src={Santi} align='left' height="100"/>
                <img src={Simon} align='left' height="100"/>
                <img src={William} align='left' height="100"/>
                <img src={AntoineM} align='left' height="100"/>
            </Box>
        </Box>

        <Box p={2.5}>
            <Box><Typography align="left" variant="h5" component="h2">
                TABLEAU DE BORD ZEUS
            </Typography>
                <Typography align="left" variant="h5" component="h2">
                    18 Janvier 2021
                </Typography>
            </Box>
        </Box>

        <Grid container direction={'row'} spacing='5'>
            <Grid item xs={3}>
                <Box m={0} ml={4}>
                    <Paper elevation={4}>
                        <Intro></Intro>
                    </Paper>
                </Box>
                <Box m={0} pt={4} ml={4}>
                    <Paper elevation={4}>
                        <TEST></TEST>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box m={0} >
                    <Paper elevation={4}>
                        <Box p={3}>
                        <GaugePerformance></GaugePerformance>
                            </Box>
                    </Paper>
                </Box>
                <Box m={0} pt={4}>
                    <Paper elevation={4}>
                        <Box p={2}>
                        <PieChartHours></PieChartHours>
                            </Box>
                    </Paper>
                </Box>
            </Grid>
            <Grid item xs={6}>

                <Box mr={4}>
                    <Paper elevation={4}>
                        <Box p={4}>
                            <Members></Members>
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </Grid>


      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
