import React from 'react';
import { BarGauge, Label, Export, Legend, Title, Font } from 'devextreme-react/bar-gauge';

const values = [8000, -2000, 3500];
const text = ["yo", "yo", "yo"];


class App extends React.Component {

    render() {
        return (
            <BarGauge
                id="gauge"
                startValue={-10000}
                endValue={10000}
                baseValue={0}
                values={values}
                palette="Ocean"
                text={text}
            >
                <Label customizeText={this.customizeText} />
                <Export enabled={false} />
                <Legend visible={true} customizeText2={this.customizeText2} verticalAlignment="bottom" horizontalAlignment="center" />
            </BarGauge>
        );
    }

    customizeText({ valueText }) {
        return `${valueText} $`;
    }

    customizeText2({ arg }) {
        return `${arg.text} 1`;
    }
}

export default App;

