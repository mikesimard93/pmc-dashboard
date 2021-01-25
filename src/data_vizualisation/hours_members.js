import React from 'react';

import {Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export} from 'devextreme-react/chart';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from "@material-ui/core/Box";

function Members(props) {

    const [entry_week, update_entry_list_week] = React.useState([]);
    const [loading, updateLoading] = React.useState(true);


    React.useEffect(() => {
        update_entry_list_week(props.data)
        updateLoading(props.loading)
    }, [props.data, props.loading])


    return (
        <div>
            {(function () {
                if (loading) {
                    return <Box p={2}> <CircularProgress size={40}/>
                        <Box pt={2}>+/- 10 seconds to load</Box>
                    </Box>
                } else {
                    return <Chart id="chart"
                                  dataSource={entry_week}
                    >
                        <CommonSeriesSettings
                            argumentField="state"
                            type="bar"
                            hoverMode="allArgumentPoints"
                            selectionMode="allArgumentPoints"
                        >
                            <Label visible={true}>
                                <Format type="fixedPoint" precision={0}/>
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
                        <Export enabled={false}/>
                    </Chart>;
                }
            })()}
        </div>
    );
}

export default Members;

