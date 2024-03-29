import './App.css';

// General Components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React from "react";
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

// Introduction Components
import Members from './data_vizualisation/hours_members'
import Intro from './data_vizualisation/intro'
import Legend from './data_vizualisation/legend'
import ToWatch from './data_vizualisation/to_watch'

// KPIs Components
import GaugePerformance from './data_vizualisation/gauge'
import FinancesGauge from './data_vizualisation/finance_gauge'
import PieChartHoursModules from './data_vizualisation/pie_chart_modules_hours'

// Graph Tree
import Graph from './data_vizualisation/graph'


// Pie Charts creation
const asana = require('asana');
const client = asana.Client.create().useAccessToken('1/130782075921760:ea95e018abbbc064e35274b2f6bc6cce'); // Mike's key
const Harvest = require('node-harvest-api')
const account_id = 1283808
const token = '2297874.pt.O_TLl_k0m8XTbi3eA5iXzoPkKHUftpx4Mp9Fq8zThEI8gqx2DY95hqJbDn5a0l9thCJEug23Z_UBuAh8sifVzw'
const app_name = 'PMC dashboard'
const harvest = new Harvest(account_id, token, app_name)

var weekAgo = new Date();
var pastDate = weekAgo.getDate() - (7); 

weekAgo.setDate(pastDate);
console.log(weekAgo)
var startSessionDate = new Date(2021, 7, 30, 0, 0, 0, 0);
var today = new Date();
var pastToday = today.getDate();
today.setDate(pastToday);
console.log(today)
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;


var yesterday = new Date();
pastDate = yesterday.getDate(); // change here for closest date
yesterday.setDate(pastDate);


const theme = createMuiTheme({
    palette: {
        primary: {
            main: green[500],
        },
    },
});

function App() {

    const [hoursPerMember, updateHoursPerMember] = React.useState([]);
    const [hoursPerMemberLoading, updateHoursPerMemberLoading] = React.useState(true);

    const [hoursPerModule, updateHoursPerModule] = React.useState([]);
    const [hoursPerModuleLoading, updateHoursPerModuleLoading] = React.useState(true);

    const [hoursPerType, updateHoursPerType] = React.useState([]);
    const [hoursPerTypeLoading, updateHoursPerTypeLoading] = React.useState(true);

    const [summaryIntro, updateSummaryIntro] = React.useState([]);
    const [summaryBullets, updateSummaryBullets] = React.useState([]);

    const [toWatch, updateToWatch] = React.useState([]);
    const [financeValues, updateFinanceValues] = React.useState([]);
    const [gauge, updateGauge] = React.useState([]);

    let grossProductData = [{
        state: 'Michael Simard',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Simon Chamorro',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Samuel Hovington',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Nicolas Morin',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Santiago Moya',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Anthony Marchand',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Antoine Leblanc',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Raphaël Labrecque',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'William Dubois',
        moyenne: 0,
        actuel: 0,
    }, {
        state: 'Étienne Gendron',
        moyenne: 0,
        actuel: 0,
    }];


    let modules = [{
        name: 'Admin',
        area: 0
    }, {
        name: 'Bras',
        area: 0
    }, {
        name: 'Suspension',
        area: 0
    }, {
        name: 'Propulsion',
        area: 0
    }, {
        name: 'Contrôle',
        area: 0
    }, {
        name: 'Puissance',
        area: 0
    }, {
        name: 'Châssis',
        area: 0
    }, {
        name: 'Science',
        area: 0
    }, {
        name: 'Connect 4',
        area: 0
    }, {
        name: 'Intégration',
        area: 0
    }];

    let types = [{
        name: 'Conception',
        area: 0
    },{
        name: 'Fabrication & Test',
        area: 0
    },{
        name: 'Présentation',
        area: 0
    }, {
        name: 'Rencontre',
        area: 0
    }, {
        name: 'Activité pédagogique',
        area: 0
    }, {
        name: 'Gestion',
        area: 0
    }, {
        name: 'Rédaction',
        area: 0
    }, {
        name: 'Travail COROM',
        area: 0
    }, {
        name: 'Autre (expliquez)',
        area: 0
    }];

    React.useEffect(() => {
        getData()
    }, [])

    function getTask(task_gid) {
        return new Promise(async resolve => {
            if (task_gid !== "1201355110642389" && task_gid !== "1200124598652249" && task_gid !== "1200089123421786" && task_gid !== "1199578972033038" && task_gid !== "1199594899825045" && task_gid !== "1199689394413937" && task_gid !== "1199964978561960" && task_gid !== "1199930149216598" && task_gid !== "1199921124082369" && task_gid !== "1199594899825042" && task_gid !== "1199906081843675" && task_gid !== "1199906081843657" && task_gid !== "1199658370254877") {
                console.log(task_gid)
                client.tasks.getTask(task_gid)
                    .then((result) => {
                        resolve(result);
                    });
            }
            else {resolve([]);}
        })
    }
    function getInfoTask() {
        return new Promise(async resolve => {
            client.tags.getTasksWithTag("1199709478483303")
                .then((result) => {
                    resolve(result);
                });
        })
    }

    function getInfos() {
        return new Promise(async resolve => {
            var newest_date = startSessionDate
            var taskWithInfos
            var task = await getInfoTask()
            for (var i = 0; i < task.data.length; i++) {
                const subTask = await getTask(task.data[i].gid)
                var d = new Date(subTask.created_at);
                if (d > newest_date) {
                    newest_date = d
                    taskWithInfos = subTask
                }
            }
            console.log(taskWithInfos.notes)
            var infos = JSON.parse(taskWithInfos.notes);
            resolve(infos);
        })
    }

    function get_hours(entry_list, type, session_date, today) {
        var diff =(today.getTime() - session_date.getTime()) / 1000;
        diff /= (60 * 60 * 24 * 7);
        var week = Math.abs(Math.round(diff));
        console.log(week)

        for (var i = 0; i < entry_list.length; i++) {
            for (var j = 0; j < grossProductData.length; j++) {
                if (entry_list[i].user.name === grossProductData[j].state)
                {
                    if (type === "actuel"){
                        grossProductData[j].actuel += entry_list[i].hours
                    }
                    else if (type === "moyenne") {
                        grossProductData[j].moyenne += entry_list[i].hours
                    }

                }
            }
        }
        console.log(grossProductData)
        if (type === "moyenne") {
            for (var j = 0; j < grossProductData.length; j++) {
                        grossProductData[j].moyenne /= (week) // pour la semaine de relache
            }
        }

    }

    function pie_chart(entries) {
        return new Promise(async resolve => {
            for (var i = 0; i < entries.length; i++) {
                console.log(String(i) + " entry over " + String(entries.length) + " entries")
                try {
                    const task = await getTask(entries[i].external_reference.id)
                    var task_module, task_type
                    if (task.custom_fields[0].name == "Harvest") {
                        task_type = task.custom_fields[0].enum_value.name
                        task_module = task.custom_fields[1].enum_value.name
                    }
                    else {
                        task_type = task.custom_fields[1].enum_value.name
                        task_module = task.custom_fields[0].enum_value.name
                    }
                    
                    for (var j = 0; j < modules.length; j++) {
                        if (task_module === modules[j].name) {
                            modules[j].area += entries[i].hours
                            break;
                        }
                
                    }
                    for (var k = 0; k < types.length; k++) {
                        if (task_type == types[k].name) {
                            types[k].area += entries[i].hours
                            break;
                        }
                    }
                }
                catch(err) { console.log("pass")
                }

            }
            resolve(types);
        })
    }

    function formatData() {
        return new Promise(resolve => {
            for (var i =0; i < grossProductData.length; i++) {
                grossProductData[i].moyenne = Math.round(grossProductData[i].moyenne)
                grossProductData[i].actuel = Math.round(grossProductData[i].actuel)
            }

            for (var i =0; i < types.length; i++) {
                types[i].area = Math.round(types[i].area)
            }

            for (var i =0; i < modules.length; i++) {
                modules[i].area = Math.round(modules[i].area)
            }
            resolve();
        })
    }

    async function getData() {

        const infos = await getInfos()
        console.log(infos.summary)
        updateSummaryIntro(infos.summary)
        updateSummaryBullets(infos.summary_bullets)
        updateToWatch(infos.important)
        updateFinanceValues(infos.finance)


        let entries = await harvest.time_entries.get({project_id: 24745864})
        var entry_list_session = []
        var entry_list_week = []
        for (var i =0; i < entries.length; i++) {
            var parts = entries[i].spent_date.split('-');
            var year = parts[0]
            var month = parts[1]
            var day = parts[2]
            var entry_date = new Date(year, month-1, day)
            try {
                if (entry_date > weekAgo  && entry_date < yesterday && entries[i].external_reference.id !== '1199598736876796') {
                    entry_list_week.push(entries[i])
                }
                if (entry_date > startSessionDate && entries[i].external_reference.id !== '1199598736876796') {
                    entry_list_session.push(entries[i])
                }
            }
            catch(err){}
            
        }
        console.log(entry_list_week)
        get_hours(entry_list_week, "actuel", startSessionDate, yesterday)
        get_hours(entry_list_session, "moyenne", startSessionDate, yesterday)
        updateHoursPerMember(grossProductData)
        updateHoursPerMemberLoading(false)

        const array = await pie_chart(entry_list_session)
        await formatData()
        updateHoursPerModule(modules)
        updateHoursPerModuleLoading(false)

        updateHoursPerType(array)
        updateHoursPerModuleLoading(false)
        updateHoursPerTypeLoading(false)
        console.log(array)
        console.log(modules)




    }

    function updateRatio(ratio){
        updateGauge(ratio)
        console.log('to' + gauge)
    }


    return (

        <ThemeProvider theme={theme}>
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
                                <Intro summary={summaryIntro} bullets={summaryBullets}></Intro>
                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Box  m={0}>
                            <Paper elevation={4}>
                                <Box p={0}>
                                    <ToWatch data={toWatch}></ToWatch>
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
                                    <FinancesGauge data={financeValues}></FinancesGauge>
                                </Box>
                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={3} lg={3}>
                        <Box  m={0}>
                            <Paper elevation={4}>
                                    <Legend></Legend>
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
                                    <Graph fromChildToParentCallback={updateRatio}></Graph>
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
                                    <PieChartHoursModules data={hoursPerModule} loading={hoursPerModuleLoading}></PieChartHoursModules>
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
                                    <PieChartHoursModules loading={hoursPerTypeLoading} data={hoursPerType}></PieChartHoursModules>
                                </Box>

                            </Paper>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Box mt={0}>
                            <Paper elevation={4}>
                                <Box p={2}>
                                    <Typography variant="h5" component="h2">
                                        Heures vs Membre
                                    </Typography>
                                    <Members data={hoursPerMember} loading={hoursPerMemberLoading}></Members>
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
        </ThemeProvider>
    );
}

export default App;