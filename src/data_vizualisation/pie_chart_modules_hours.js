import React from 'react';

import PieChart, {
    Series,
    Label,
    Connector,
    Size,
    Export
} from 'devextreme-react/pie-chart';


function PieChartHoursModules(props) {

    const [data, updateData] = React.useState([]);

    // The useEffect will be called at the beginning AND each time the props.Jobs changes
    // The component will be rendered each time useEffect is executed.
    React.useEffect(() => {
        updateData(props.data)
    }, [props.data])

        return (
            <PieChart
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
            </PieChart>
        );
}

export default PieChartHoursModules;