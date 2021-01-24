// https://github.com/indexzero/node-asana-api
import React from 'react';

const asana = require('asana');
const client = asana.Client.create().useAccessToken('1/1105136235820223:056448b931a5e79f598f1fd698d25356');
var milestones = {}


function searchInWorkspace() {
    return new Promise(resolve => {
        client.tasks.searchInWorkspace('622159997203998', {'resource_subtype': 'milestone'})
            // ,opt_fields=['due_on','assignee','completed_at','custom_fields','name', 'created_at', 'resource_subtype'], opt_pretty=True
            .then((result) => {
                milestones = result
                console.log("milestones")
                console.dir(result)
                resolve(result);
            });
    })
}

function searchInWorkspace2() {
    return new Promise(resolve => {
        client.tasks.searchInWorkspace('622159997203998', {'resource_subtype': 'milestone'})
            // ,opt_fields=['due_on','assignee','completed_at','custom_fields','name', 'created_at', 'resource_subtype'], opt_pretty=True
            .then((result) => {
                milestones = result
                console.log("milestones2")
                console.dir(result)
                resolve();
            });
    })
}


async function test() {
    const milestones = await searchInWorkspace();
    console.log(milestones)
}

test()
// client.tasks.dependencies('1199564096090054')
//     .then((result) => {
//         console.log("dependencies")
//         console.dir(result)
// });

// client.tasks.findByExternalId()
console.log("milestones outside")
console.dir(milestones)





// var asana = require('asana-api');


// var client = asana.createClient({
//     // apiKey: '1/130782075921760:ea95e018abbbc064e35274b2f6bc6cce' //Mike's key
//     apiKey: '1/1105136235820223:056448b931a5e79f598f1fd698d25356' // Sam's key
// });

// client.users.list(function (err, users) {
//     //
//     // List all users for this Asana account.
//     //
//     console.log(users);
// });

// client.tasks.getTasks({opt_pretty: true})
//     .then((result) => {
//         console.log(result);
//     });

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

