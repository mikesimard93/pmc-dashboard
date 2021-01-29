import Tree from 'react-tree-graph';
import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import '../App.css';


const asana = require('asana');
const client = asana.Client.create().useAccessToken('1/1105136235820223:70f88e295406e4a4c73ba90cce7a7e69');

const Harvest = require('node-harvest-api')
const account_id = 1283808
const token = '2297874.pt.O_TLl_k0m8XTbi3eA5iXzoPkKHUftpx4Mp9Fq8zThEI8gqx2DY95hqJbDn5a0l9thCJEug23Z_UBuAh8sifVzw'
const app_name = 'PMC dashboard'
const harvest = new Harvest(account_id, token, app_name)
let entries = []
var entry_list_session = []
var startSessionDate = new Date(2021, 0, 10, 0, 0, 0, 0);

function Graph(props) {
    const [graph, updateGraph] = React.useState([]);
    const [dataLoaded, changeLoadStatus] = React.useState(false);
    var tree = {}
    React.useEffect(() => {
        test()
    }, [graph])

    function getMilestones() {
        return new Promise(resolve => {
            client.tasks.searchInWorkspace('622159997203998', {'resource_subtype': 'milestone'})
                .then((result) => {
                    resolve(result);
                });
        })
    }

    function getTask(task_gid) {
        return new Promise(resolve => {
            client.tasks.getTask(task_gid)
                .then((result) => {
                    resolve(result);
                });
        })
    }
    function getSubtask(task_gid) {
        return new Promise(resolve => {
            client.tasks.subtasks(task_gid)
                .then((result) => {
                    resolve(result);
                });
        })
    }

    function getDependencies(task_gid) {
        return new Promise(resolve => {
            client.tasks.dependencies(task_gid)
                .then((result) => {
                    resolve(result);
                });
        })
    }

    function fillObject(obj, task) {
        return new Promise(resolve => {
            const new_key = task.name
            obj.children.push( {
                gProps: {
                    className: 'red-node'
                },
                name: task.name,
                gid: task.gid,
                total_dependencies_time: 0.0,
                due_on: task.due_on,
                created_at: task.created_at,
                estimated_time: task.custom_fields[2].number_value,
                completed_at: task.completed_at,
                module: task.custom_fields[0].enum_value.name,
                type: task.resource_subtype,
                clocked_time: 0
            });

            resolve(obj);
        })
    }

    function recursive(task_dependencies, obj) {
        return new Promise(async resolve => {
            obj.children = new Array();
            var time = {
                        planned_time: 0,
                        clocked_time: 0
            }
            var time_under = {
                            planned_time: 0,
                            clocked_time: 0
            }
            for (var i = 0; i < task_dependencies.length; i++) {
                var task_name_list = []
                const asana_sub_task = await getSubtask(task_dependencies[i].gid)
                for (var k = 0; k < asana_sub_task.data.length; k++) {
                    task_name_list.push(asana_sub_task.data[k].name)
                }
                task_name_list.push(task_dependencies[i].name)
                for (var j = 0; j < entry_list_session.length; j++) {
                    if (task_name_list.includes(entry_list_session[j].notes)) {
                        time.clocked_time += entry_list_session[j].hours
                    }
                }

                const dependency = await getTask(task_dependencies[i].gid)
                if (dependency.custom_fields[2].number_value !== null) {
                    time.planned_time += dependency.custom_fields[2].number_value
                }
                await fillObject(obj, dependency)
                var sub_task_dependencies = await getDependencies(dependency.gid)
                if (sub_task_dependencies.length !== 0) {
                    var time_under = await recursive(sub_task_dependencies, obj.children[obj.children.length - 1])
                }
                else {}
                time.planned_time += time_under.planned_time
                time.clocked_time += time_under.clocked_time
            }
            obj.total_dependencies_time = time.planned_time
            obj.clocked_time = time.clocked_time
            resolve(time);
        });
    }
    async function test() {
        var top_task
        const milestones = await getMilestones();
        entries = await harvest.time_entries.get({project_id: 24745864})
        for (var i =0; i < entries.length; i++) {
            var parts = entries[i].spent_date.split('-');
            var year = parts[0]
            var month = parts[1]
            var day = parts[2]
            var entry_date = new Date(year, month-1, day)
            if (entry_date > startSessionDate && entries[i].external_reference.id !== '1199598736876796') {
                entry_list_session.push(entries[i])
            }
        }
        for (var i = 0; i < milestones.data.length; i++) {
            const task = await getTask(milestones.data[i].gid);
            try {
                if (task.custom_fields[3].enum_value.name == 'Goal'){
                    top_task = task
                    break;
                }
            }
            catch(err){}
        }
        console.log(top_task)
        const dependencies = await getDependencies(top_task.gid)

        tree.name = top_task.name
        tree.children = new Array();
        await fillObject(tree, top_task)
        await recursive(dependencies, tree)
        console.log(tree)
        updateGraph(tree)
        changeLoadStatus(true)
        var ratio = tree.clocked_time/tree.total_dependencies_time
        var ratioRounded = Math.round((ratio + Number.EPSILON) * 100) / 100
        props.fromChildToParentCallback(ratioRounded)
        return tree
    }

    return (
        <div >
            {(function () {
                if (!dataLoaded) {
                    return <Box > <CircularProgress size={40} />
                    <Box pt={2}>May take several minutes to load..</Box>
                    </Box>
                } else {
                    return <Tree
                        data={graph}
                        nodeRadius={30}
                        height={2000}
                        width={1500}/>;
                }
            })()}
        </div>
    );
}

export default Graph;