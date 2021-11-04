import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import '../App.css';
import Tree from 'react-d3-tree';
import {Typography} from "@material-ui/core";

const dataa =
{
    "name": "CEO",
    "children": [
    {
        "name": "Manager",
        "attributes": {
            "department": "Production"
        },
        "children": [
            {
                "name": "Foreman",
                "attributes": {
                    "department": "Fabrication"
                },
                "children": [
                    {
                        "name": "Workers"
                    }
                ]
            },
            {
                "name": "Foreman",
                "attributes": {
                    "department": "Assembly"
                },
                "children": [
                    {
                        "name": "Workers"
                    }
                ]
            }
        ]
    },
    {
        "name": "Manager",
        "attributes": {
            "department": "Marketing"
        },
        "children": [
            {
                "name": "Sales Officer",
                "attributes": {
                    "department": "A"
                },
                "children": [
                    {
                        "name": "Salespeople"
                    }
                ]
            },
            {
                "name": "Sales Officer",
                "attributes": {
                    "department": "B"
                },
                "children": [
                    {
                        "name": "Salespeople"
                    }
                ]
            }
        ]
    }
]
}

const asana = require('asana');
const client = asana.Client.create().useAccessToken('1/130782075921760:ea95e018abbbc064e35274b2f6bc6cce'); // Mike's key

const Harvest = require('node-harvest-api')
const account_id = 1283808
const token = '2297874.pt.O_TLl_k0m8XTbi3eA5iXzoPkKHUftpx4Mp9Fq8zThEI8gqx2DY95hqJbDn5a0l9thCJEug23Z_UBuAh8sifVzw'
const app_name = 'PMC dashboard'
const harvest = new Harvest(account_id, token, app_name)
let entries = []
var entry_list_session = []
var startSessionDate = new Date(2021, 0, 10, 0, 0, 0, 0);
var today = new Date();

function Graph(props) {
    const [graph, updateGraph] = React.useState([]);
    const [dataLoaded, changeLoadStatus] = React.useState(false);
    var tree = {}
    React.useEffect(() => {
        test()
    }, [])



    const containerStyles = {
        width: "100vw",
        height: "800px"
    };

    const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
        const [translate, setTranslate] = React.useState(defaultTranslate);
        const containerRef = React.useCallback((containerElem) => {
            if (containerElem !== null) {
                const { width, height } = containerElem.getBoundingClientRect();
                setTranslate({ x: width / 2, y: height / 2 });
            }
        }, []);
        return [translate, containerRef];
    };

    const [translate, containerRef] = useCenteredTree();
    const nodeSize = { x: 275, y: 300 };
    const foreignObjectProps = { width: nodeSize.x, height: nodeSize.y, x: 20 };


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
            console.log(task.gid)
            console.log(task.name)
            obj.children.push( {
                gProps: {
                    className: 'red-node'
                },
                attributes: {
                    Ratio: 0,
                    Time: 0,
                    Due: "",
                },
                nodeSvgShape: {
                    shape: 'circle',
                    shapeProps: {
                        r: 10,
                        fill: 'blue',
                    },
                },
                rootNodeClassName: 'node__branch',
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
                console.log(task_dependencies[i].name)
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


            var dueDate = new Date(obj.due_on)
            var dueTime = dueDate.getTime()
            var startTime = startSessionDate.getTime()
            var todayTime = today.getTime()

            var temp = (todayTime - startTime)/(dueTime - startTime)

            console.log(temp)
            console.log(obj.total_dependencies_time)
            console.log(obj.clocked_time)
            var ratio = obj.clocked_time/(temp * obj.total_dependencies_time + + Number.EPSILON)
            var ratioRounded = Math.round((ratio + Number.EPSILON) * 100) / 100

            console.log(ratio)
            obj.attributes.Time = ratioRounded/(temp)
            obj.attributes.Due = obj.due_on
            console.log(obj.name)
            console.log(obj.attributes.Time)


            resolve(time);
        });
    }

    function keepMilestoneOnly(obj) {
        return new Promise(async resolve => {
            console.log(obj)
            obj.attributes.Time = obj.attributes.Time.toFixed(2)
            console.log(obj.name)
            var remove_list = []
            try {
                for (var i = 0; i < obj.children.length; i++) {
                    if (obj.children[i].type !== "milestone") {
                        delete obj.children[i]
                    }
                    else {
                        await keepMilestoneOnly(obj.children[i])
                    }
                }
                const result = obj.children.filter(child => child !== undefined)
                obj.children = result
                console.log(result)
                
                if (obj.children.length == 0) {
                    delete obj.children
                }
            }
            catch(err){}
            
            resolve(obj);
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
            try {
                if (entry_date > startSessionDate && entries[i].external_reference.id !== '1199598736876796') {
                entry_list_session.push(entries[i])
                }
            }
            catch(err){}
            
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
        const dependencies = await getDependencies(top_task.gid)

        tree.name = top_task.name
        tree.children = new Array();
        await fillObject(tree, top_task)
        tree.attributes = {
            Ratio: 0,
            Time: 0,
            Due: "",
        }
        tree.completed_at = null
        tree.due_on = top_task.due_on
        await recursive(dependencies, tree)
        console.log(tree)
        let milestonesTree = JSON.parse(JSON.stringify(tree))
        await keepMilestoneOnly(milestonesTree)
        // console.log(JSON.stringify(tree))
        console.log(milestonesTree)
        updateGraph(milestonesTree)
        changeLoadStatus(true)
        var ratio = milestonesTree.clocked_time/milestonesTree.total_dependencies_time
        var ratioRounded = Math.round((ratio + Number.EPSILON) * 100) / 100
        props.fromChildToParentCallback(ratioRounded)
        return milestonesTree
    }

    const renderForeignObjectNode = ({
                                          nodeDatum,
                                          toggleNode,
                                          foreignObjectProps
                                      }) => (
        <g>
            <circle r={15}></circle>
            {/* `foreignObject` requires width & height to be explicitly set. */}
            <foreignObject {...foreignObjectProps}>
                <div style={{ border: "1px solid black", backgroundColor: "#dedede" }}>
                    {(function () {
                        // !dataLoaded
                        if (nodeDatum.completed_at !== null) {
                            return <Typography variant="h6" color="primary">COMPLÉTÉ</Typography>
                        }
                        else if (nodeDatum.completed_at == null && (nodeDatum.attributes.Time < 0.5 || nodeDatum.attributes.Time >1.5)) {
                            return <Typography variant="h6" color="error">À SURVEILLER</Typography>
                        } 
                        else {
                            return <Typography variant="h5" color="success">OK</Typography>
                        }
                    })()}

                    <h3 style={{ textAlign: "center" }}>{nodeDatum.name}</h3>

                    {(function () {
                        // !dataLoaded
                        if (nodeDatum.completed_at == null) {
                            return <h1 style={{ textAlign: "center" }}>{nodeDatum.attributes.Time}</h1>
                        }
                    })()}

                    {(function () {
                        // !dataLoaded
                        if (nodeDatum.completed_at == null) {
                            return <h3 style={{ textAlign: "center" }}>Dû le {nodeDatum.attributes.Due}</h3>
                        }
                    })()}

                    {nodeDatum.children && (
                        <button style={{ width: "100%" }} onClick={toggleNode}>
                            {nodeDatum.__rd3t.collapsed ? "Expand" : "Collapse"}
                        </button>
                    )}
                </div>
            </foreignObject>
        </g>
    );

    return (
        <div >
            {(function () {
                // !dataLoaded
                if (!dataLoaded) {
                    return <Box > <CircularProgress size={40} />
                    <Box pt={2}>May take several minutes to load..</Box>
                    </Box>
                } else {
                    return (
                        <div style={containerStyles} ref={containerRef}>
                            <Tree
                                data={graph}
                                translate={translate}
                                nodeSize={nodeSize}
                                renderCustomNodeElement={(rd3tProps) =>
                                    renderForeignObjectNode({ ...rd3tProps, foreignObjectProps })
                                }
                                orientation="vertical"
                            />
                        </div>
                    );
                }
            })()}
        </div>
    );
}

export default Graph;
//
// <Tree
//     data={graph}
//     nodeRadius={30}
//     height={2000}
//     width={1500}
//     animated
//     textProps={{ dy: -10.5 }}/>