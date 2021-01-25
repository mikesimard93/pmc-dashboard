import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export
} from 'devextreme-react/pie-chart';
import Box from "@material-ui/core/Box";
import Tree from "react-tree-graph";


function PieChartHoursModules(props) {

    const [data, updateData] = React.useState([]);
    const [loading, changeLoadStatus] = React.useState(true);

    // The useEffect will be called at the beginning AND each time the props.Jobs changes
    // The component will be rendered each time useEffect is executed.
    React.useEffect(() => {
        updateData(props.data)
        changeLoadStatus(props.loading)
    }, [props.data])

        return (
            <div >
                {(function () {
                    if (loading) {
                        return <Box > <CircularProgress size={40} />
                            <Box pt={2}>May take several minutes to load..</Box>
                        </Box>
                    } else {
                        return <PieChart
                            id="pie"
                            dataSource={data}
                            palette="Bright"
                        >
                            <Series
                                argumentField="name"
                                valueField="area"
                            >
                                <Label visible={true}>
                                    <Connector visible={true} width={1} />
                                </Label>
                            </Series>


                            <Export enabled={false} />
                        </PieChart>;
                    }
                })()}
            </div>
        );
}

export default PieChartHoursModules;