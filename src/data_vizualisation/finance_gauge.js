import React from 'react';
import { BarGauge, Label, Export, Legend, Title, Font } from 'devextreme-react/bar-gauge';

const values = [8000, -2000, 3500];
const textD = ["Revenus", "Dépenses", "Balance"];


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
            >
                <Label customizeText={this.customizeTooltip} />
                <Export enabled={false} />
                <Legend visible={true} customizeText={this.customizeText} verticalAlignment="bottom" horizontalAlignment="center" />
            </BarGauge>
        );
    }

    customizeTooltip({ valueText }) {
        return `${valueText} $`;
    }

    customizeText(arg) {
        return getText(arg.item, arg.text);
    }
}

function getText(item, text) {
    return `${textD[item.index]}`;
}

export default App;

