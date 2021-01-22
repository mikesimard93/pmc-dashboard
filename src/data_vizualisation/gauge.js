import React from 'react';
import { BarGauge, Label, Legend, Export, Title, Font } from 'devextreme-react/bar-gauge';

const values = [1];
const format = {
    type: 'fixedPoint',
    precision: 1
};

class App extends React.Component {

    render() {
        return (

            <BarGauge
                id="gauge"
                startValue={0}
                endValue={2}
                defaultValues={values}
            >
                <Label indent={20} format={format} customizeText={this.customizeText} />
                <Export enabled={false} />
            </BarGauge>
        );
    }

    customizeText({ valueText }) {
        return `${valueText}`;
    }
}

export default App;