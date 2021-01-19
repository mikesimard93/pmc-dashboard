import logo from './logo.svg';
import './App.css';
import Members from './hours_members'
import PieChartHours from './pie_chart_hours'
import TEST from './to_watch'
import Intro from './intro'
import GaugePerformance from './gauge'
import FinancesGauge from './finance_gauge'
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
import React from "react";

function App() {
    return (

        <div className="App">

            <Grid container direction={'row'}>
                <Box >
                    <Box >
                        <img src={Antoine} align='left' height="150"/>
                        <img src={Etienne} align='left' height="150"/>
                        <img src={Mike} align='left' height="150"/>
                        <img src={Nic} align='left' height="150"/>
                        <img src={Raph} align='left' height="150"/>
                        <img src={Sam} align='left' height="150"/>
                        <img src={Santi} align='left' height="150"/>
                        <img src={Simon} align='left' height="150"/>
                        <img src={William} align='left' height="150"/>
                        <img src={AntoineM} align='left' height="150"/>
                    </Box>
                </Box>
                <Box p={2}>
                    <Box><Typography align="left" variant="h4" component="h2">
                        TABLEAU DE BORD ZEUS
                    </Typography>
                        <Typography align="left" variant="h5" component="h2">
                            18 Janvier 2021
                        </Typography>
                    </Box>
                </Box>
            </Grid>


            <Box p={4}>
                <Grid container alignItems="stretch" direction={'row'} spacing='5'>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Box m={0}>
                            <Paper height="100%"  elevation={4}>
                                <Intro></Intro>
                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Box  m={0}>
                            <Paper elevation={4}>
                                <Box p={0}>
                                    <TEST></TEST>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>


                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Box  m={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2">
                                        Ratio
                                    </Typography>
                                    <GaugePerformance></GaugePerformance>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Box  m={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2">
                                        Finances
                                    </Typography>
                                    <FinancesGauge></FinancesGauge>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>



                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box m={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2">
                                        Heures vs Type
                                    </Typography>
                                </Box>
                                <PieChartHours></PieChartHours>
                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box mt={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Members></Members>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                </Grid>

            </Box>
        </div>
    );
}

export default App;