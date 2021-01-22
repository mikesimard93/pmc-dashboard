// https://github.com/indexzero/node-asana-api
import React from 'react';
var asana = require('asana-api');


var client = asana.createClient({
    apiKey: '1/130782075921760:ea95e018abbbc064e35274b2f6bc6cce'
});

client.users.list(function (err, users) {
    //
    // List all users for this Asana account.
    //
    console.dir(users);
});

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

