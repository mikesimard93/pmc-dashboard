import Tree from 'react-tree-graph';
import React from "react";
import '../App.css';
const asana = require('asana');
const client = asana.Client.create().useAccessToken('1/1105136235820223:056448b931a5e79f598f1fd698d25356');

function Graph() {
    const [graph, updateGraph] = React.useState([]);
    var tree = {}
    React.useEffect(() => {
        console.log(tree)
        test()
    }, [])

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
            obj[new_key] = {
                gid: task.gid,
                total_dependencies_time: 0.0,
                due_on: task.due_on,
                created_at: task.created_at,
                estimated_time: task.custom_fields[2].number_value,
                completed_at: task.completed_at,
                module: task.custom_fields[0].enum_value.name,
                type: task.resource_subtype,
                clocked_time: time
            };

            resolve(obj);
        })
    }

    function fillObject2(obj, task, time) {
        return new Promise(resolve => {
            const new_key = task.name
            obj[new_key] = {
                gid: task.gid,
                total_dependencies_time: 0.0,
                due_on: task.due_on,
                created_at: task.created_at,
                estimated_time: task.custom_fields[2].number_value,
                completed_at: task.completed_at,
                module: task.custom_fields[0].enum_value.name,
                type: task.resource_subtype,
                clocked_time: time
            };

            resolve(obj);
        })
    }

    function recursive(task_dependencies, obj) {
        return new Promise(async resolve => {
            obj.children = {}
            var total_time = 0
            var time_to_add = 0
            for (var i = 0; i < task_dependencies.length; i++) {
                updateGraph(tree)
                var dependency_time = 0
                const dependency = await getTask(task_dependencies[i].gid)
                console.log(dependency.name)
                await fillObject(obj.children, dependency, dependency_time)
                var sub_task_dependencies = await getDependencies(dependency.gid)
                if (sub_task_dependencies.length !== 0) {
                    var time_to_add = await recursive(sub_task_dependencies, obj.children[dependency.name])
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
                // console.dir(task.custom_fields[3].enum_value.name)
                if (task.custom_fields[3].enum_value.name == 'Goal'){
                    top_task = task
                    break;
                }
            }
            catch(err){}
        }
        console.dir(top_task.name)
        const dependencies = await getDependencies(top_task.gid)
        tree.name = top_task.name;
        await fillObject(tree, top_task, 0)
        await recursive(dependencies, tree)
        console.log(tree)
        return tree
    }

    return (
        <Tree
            data={graph}
            nodeRadius={30}
            height={800}
            width={1500}/>
    );
}

export default Graph;