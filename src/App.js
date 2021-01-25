import './App.css';

// General Components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React from "react";

// Introduction Components
import Members from './data_vizualisation/hours_members'
import Intro from './data_vizualisation/intro'
import ToWatch from './data_vizualisation/to_watch'

// KPIs Components
import GaugePerformance from './data_vizualisation/gauge'
import FinancesGauge from './data_vizualisation/finance_gauge'
import PieChartHours from './data_vizualisation/pie_chart_hours'
import PieChartHoursModules from './data_vizualisation/pie_chart_modules_hours'

// Graph Tree
import Graph from './data_vizualisation/graph'



// Date Generation
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;


function App() {
    return (
        <div className="App">
            <Grid container direction={'row'}>
                <Box >
                    <Box >
                        <img src={process.env.PUBLIC_URL + './photos_membres/AntoineM.png'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/antoine.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/etienne.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/mike.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/nic.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/raph.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/sam.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/santiago.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/simon.jpg'} align='left' height="150"/>
                        <img src={process.env.PUBLIC_URL + './photos_membres/william.jpg'} align='left' height="150"/>
                    </Box>
                </Box>
                <Box p={2}>
                    <Box><Typography align="left" variant="h4" component="h2">
                        TABLEAU DE BORD ZEUS
                    </Typography>
                        <Typography align="left" variant="h5" component="h2">
                            {today}
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
                                    <ToWatch></ToWatch>
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
                                    <PieChartHours></PieChartHours>
                                </Box>

                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box m={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2">
                                        Heures vs Module
                                    </Typography>
                                    <PieChartHoursModules></PieChartHoursModules>
                                </Box>

                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Box mt={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2">
                                        Heures vs Module
                                    </Typography>
                                    <Members></Members>
                                </Box>

                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box mt={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2">
                                        Arbre des jalons
                                    </Typography>
                                </Box>
                                <Box p={2}>
                                    <Graph></Graph>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                </Grid>

            </Box>
            <Box p={2}>
                Tableau généré le {today}
            </Box>
        </div>
    );
}

export default App;