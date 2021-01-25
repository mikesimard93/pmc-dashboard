import Tree from 'react-tree-graph';
import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import '../App.css';


const asana = require('asana');
const client = asana.Client.create().useAccessToken('1/1105136235820223:056448b931a5e79f598f1fd698d25356');


function Graph() {
    const [graph, updateGraph] = React.useState([]);
    var dataLoaded = false;
    var tree = {}
    React.useEffect(() => {
        console.log(tree)
        test()
    }, [graph])

    var milestones = {}
    function getMilestones() {
        return new Promise(resolve => {
            client.tasks.searchInWorkspace('622159997203998', {'resource_subtype': 'milestone'})
                // ,opt_fields=['due_on','assignee','completed_at','custom_fields','name', 'created_at', 'resource_subtype'], opt_pretty=True
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

    function getDependencies(task_gid) {
        return new Promise(resolve => {
            client.tasks.dependencies(task_gid)
                .then((result) => {
                    resolve(result);
                });
        })
    }

    function fillObject(obj, task, time) {
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
                clocked_time: time
            });

            resolve(obj);
        })
    }

    function recursive(task_dependencies, obj) {
        return new Promise(async resolve => {
            obj.children = new Array();
            var total_time = 0
            var time_to_add = 0
            for (var i = 0; i < task_dependencies.length; i++) {
                var dependency_time = 0
                const dependency = await getTask(task_dependencies[i].gid)
                if (dependency.custom_fields[2].number_value !== null) {
                    total_time += dependency.custom_fields[2].number_value
                }
                await fillObject(obj, dependency, dependency_time)
                var sub_task_dependencies = await getDependencies(dependency.gid)
                if (sub_task_dependencies.length !== 0) {
                    console.log(obj.children)
                    var time_to_add = await recursive(sub_task_dependencies, obj.children[obj.children.length - 1])
                }
                else {}
                total_time += time_to_add
            }
            obj.total_dependencies_time = total_time
            resolve(total_time);
        });
    }
    async function test() {
        var top_task = {}
        const milestones = await getMilestones();
        // console.dir(milestones.data)
        var i;
        for (i = 0; i < milestones.data.length; i++) {
            const task = await getTask(milestones.data[i].gid);
            try {
                if (task.custom_fields[3].enum_value.name == 'Goal'){
                    top_task = task
                    break;
                }
            }
            catch(err){}
        }
        const dependencies = await getDependencies(top_task.gid)

        tree.name = top_task.name
        tree.children = new Array();
        await fillObject(tree, top_task, 0)
        await recursive(dependencies, tree)
        console.log(tree)
        updateGraph(tree)
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