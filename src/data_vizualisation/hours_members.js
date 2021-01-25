import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';

const Harvest = require('node-harvest-api')
const account_id = 1283808
const token = '2297874.pt.O_TLl_k0m8XTbi3eA5iXzoPkKHUftpx4Mp9Fq8zThEI8gqx2DY95hqJbDn5a0l9thCJEug23Z_UBuAh8sifVzw'
const app_name = 'PMC dashboard'
const harvest = new Harvest(account_id, token, app_name)

var weekAgo = new Date();
var pastDate = weekAgo.getDate() - 7;
weekAgo.setDate(pastDate);
var date = new Date(2021, 0, 10, 0, 0, 0, 0);


function Members() {

    const [entry_week, update_entry_list_week] = React.useState([]);
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

    React.useEffect(() => {
        getData()
    }, [])

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
        update_entry_list_week(grossProductData)
        return true

    }

        return (
            <Chart id="chart"
                   dataSource={entry_week}
            >
                <CommonSeriesSettings
                    argumentField="state"
                    type="bar"
                    hoverMode="allArgumentPoints"
                    selectionMode="allArgumentPoints"
                >
                    <Label visible={true}>
                        <Format type="fixedPoint" precision={0} />
                    </Label>
                </CommonSeriesSettings>
                <Series
                    argumentField="state"
                    valueField="moyenne"
                    name="Moyenne (session)"
                    color="#4C4C4C"
                />
                <Series
                    valueField="actuel"
                    name="Actuel"
                    color="#48D48A"
                />
                <Legend verticalAlignment="bottom" horizontalAlignment="center"></Legend>
                <Export enabled={false} />
            </Chart>
        );
}

export default Members;

