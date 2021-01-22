// https://github.com/indexzero/node-asana-api
var asana = require('asana-api');

var client = asana.createClient({
    apiKey: 'your-secret-api-key'
});

client.users.list(function (err, users) {
    //
    // List all users for this Asana account.
    //
    console.dir(users);
});