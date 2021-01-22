import React from 'react';

import { Chart, Series, CommonSeriesSettings, Label, Format, Legend, Export } from 'devextreme-react/chart';
import { grossProductData } from '../data/data.js';

class Members extends React.Component {

    render() {
        return (
            <Chart id="chart"
                   title="Temps vs Membres"
                   dataSource={grossProductData}
                   onPointClick={this.onPointClick}
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

    onPointClick(e) {
        e.target.select();
    }
}

export default Members;

