// https://github.com/indexzero/node-asana-api
import React from 'react';

const asana = require('asana');
const client = asana.Client.create().useAccessToken('1/130782075921760:ea95e018abbbc064e35274b2f6bc6cce'); // Mike's key
// const client = asana.Client.create().useAccessToken('1/1105136235820223:056448b931a5e79f598f1fd698d25356');

const Harvest = require('node-harvest-api')
 
const account_id = 1283808
const token = '2297874.pt.O_TLl_k0m8XTbi3eA5iXzoPkKHUftpx4Mp9Fq8zThEI8gqx2DY95hqJbDn5a0l9thCJEug23Z_UBuAh8sifVzw'
const app_name = 'PMC dashboard'
 
const harvest = new Harvest(account_id, token, app_name)

var weekAgo = new Date();
var pastDate = weekAgo.getDate() - 7;
weekAgo.setDate(pastDate);
var date = new Date(2021, 0, 10, 0, 0, 0, 0);

var grossProductData = [{
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

const modules = [{
    name: 'Présentation',
    area: 0
}, {
    name: 'Conception',
    area: 0
}, {
    name: 'Gestion',
    area: 0
}, {
    name: 'Rencontre',
    area: 0
}, {
    name: 'A.P.',
    area: 0
}, {
    name: 'Fabrication',
    area: 0
}];

const types = [{
    name: 'Gestion',
    area: 0
}, {
    name: 'Fabrication & Test',
    area: 0
}, {
    name: 'Activité Pédagogique',
    area: 0
}, {
    name: 'Présentation',
    area: 0
}, {
    name: 'Rédaction.',
    area: 0
}, {
    name: 'Travail COROM',
    area: 0
}, {
    name: 'Autre (expliquez)',
    area: 0
}];
function get_hours(entry_list, type, session_date) {  
    var today = new Date();
    var diff =(today.getTime() - session_date.getTime()) / 1000;
    diff /= (60 * 60 * 24 * 7);
    var week = Math.abs(Math.round(diff));
    
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

    for (var j = 0; j < grossProductData.length; j++) {
        grossProductData[j].moyenne /= week
    }

}

async function pie_chart(entries) {
    return new Promise(async resolve => {
        for (var i = 0; i < entries.length; i++) {
            // console.log(i)
            try {
                // console.log(entries[i].external_reference.id)
                const task = await getTask(entries[i].external_reference.id)
                for (var j = 0; j < modules.length; j++) {
                    if (task.custom_fields[0].enum_value.name === modules[j].name) {
                        modules[j].area += entries[i].hours
                    }
                // console.log(modules)
                    
                }
                for (var k = 0; k < types.length; k++) {
                    if (task.custom_fields[1].enum_value.name === types[j].name) {
                        types[j].area += entries[i].hours
                    }
                }
            }
            catch(err) {
                console.log(err)
            }
            
        }
        resolve(types);  
    })  
}

async function getData() {
    
    let entries = await harvest.time_entries.get({project_id: 24745864})
    var entry_list_session = []
    var entry_list_week = []
    for (var i =0; i < entries.length; i++) {
        var parts = entries[i].spent_date.split('-');
        var year = parts[0]
        var month = parts[1]
        var day = parts[2]
        var entry_date = new Date(year, month-1, day)
        if (entry_date > weekAgo) {
            entry_list_week.push(entries[i])
        } 
        if (entry_date > date) {
            entry_list_session.push(entries[i])
        } 
    }
    get_hours(entry_list_week, "actuel", date)
    get_hours(entry_list_session, "moyenne", date)

    const array = await pie_chart(entry_list_week)
}
getData()
// var milestones = {}
// function getMilestones() {
//     return new Promise(resolve => {
//         client.tasks.searchInWorkspace('622159997203998', {'resource_subtype': 'milestone'})
//             // ,opt_fields=['due_on','assignee','completed_at','custom_fields','name', 'created_at', 'resource_subtype'], opt_pretty=True
//             .then((result) => {
//                 resolve(result);
//             });
//     })
// }

function getTask(task_gid) {
    return new Promise(resolve => {
        client.tasks.getTask(task_gid)
            .then((result) => {
                resolve(result);
            });
    })
}

// function getDependencies(task_gid) {
//     return new Promise(resolve => {
//         client.tasks.dependencies(task_gid)
//             .then((result) => {
//                 resolve(result);
//             });
//     })
// }

// function fillObject(obj, task, time) {
//     return new Promise(resolve => {
//         const new_key = task.name
//         obj.children.push( {
//                         name: task.name,
//                         gid: task.gid,
//                         total_dependencies_time: 0.0,
//                         due_on: task.due_on,
//                         created_at: task.created_at,
//                         estimated_time: task.custom_fields[2].number_value,
//                         completed_at: task.completed_at,
//                         module: task.custom_fields[0].enum_value.name,
//                         type: task.resource_subtype,
//                         clocked_time: time
//         });
        
//         resolve(obj);
//     })
// }

// function recursive(task_dependencies, obj) {
//     return new Promise(async resolve => {
//         obj.children = new Array();
//         var total_time = 0
//         var time_to_add = 0
//         for (var i = 0; i < task_dependencies.length; i++) {
//             var dependency_time = 0
//             const dependency = await getTask(task_dependencies[i].gid)
//             if (dependency.custom_fields[2].number_value !== null) {
//                 total_time += dependency.custom_fields[2].number_value
//             }
//             await fillObject(obj, dependency, dependency_time)
//             var sub_task_dependencies = await getDependencies(dependency.gid)
//             if (sub_task_dependencies.length !== 0) {
//                 console.log(obj.children)
//                 var time_to_add = await recursive(sub_task_dependencies, obj.children[obj.children.length - 1])
//             }
//             else {}
//             total_time += time_to_add
//         }
//         obj.total_dependencies_time = total_time 
//         resolve(total_time);
//     });
// }
// async function test() {
//     var top_task = {}
//     const milestones = await getMilestones();
//     // console.dir(milestones.data)
//     var i;
//     for (i = 0; i < milestones.data.length; i++) {
//         const task = await getTask(milestones.data[i].gid);
//         try {
//             if (task.custom_fields[3].enum_value.name == 'Goal'){
//                 top_task = task
//                 break;
//             }
//         }
//         catch(err){}
//     }
//     const dependencies = await getDependencies(top_task.gid)

//     var tree = {}
//     tree.name = top_task.name
//     tree.children = new Array();
//     await fillObject(tree, top_task, 0)
//     await recursive(dependencies, tree)
//     console.log(tree)

// }
// console.log("start")
// test()


class BackendTest extends React.Component {

    render() {
        return (
            <p>
                // Pour voir le stock à cette étape, vas sur le site et clique droit puis "inspecter console"
            </p>
        );
    }
}

export default BackendTest;

