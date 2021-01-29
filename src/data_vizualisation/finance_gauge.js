import React from 'react';
import { BarGauge, Label, Export, Legend, Title, Font } from 'devextreme-react/bar-gauge';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const textD = ["Revenus", "Dépenses", "Balance"];


export default function OutlinedCard(props) {

    const [values, updateValues] = React.useState([]);

    React.useEffect(() => {
        updateValues(props.data)
    }, [props.data])


    function customizeTooltip({ valueText }) {
        return `${valueText} $`;
    }

    function customizeText(arg) {
        return getText(arg.item, arg.text);
    }

    function getText(item, text) {
        return `${textD[item.index]}`;
    }

    return (
        <BarGauge
            id="gauge"
            startValue={-10000}
            endValue={10000}
            baseValue={0}
            values={values}
            palette="Ocean"
        >
            <Label customizeText={customizeTooltip} />
            <Export enabled={false} />
            <Legend visible={true} customizeText={customizeText} verticalAlignment="bottom" horizontalAlignment="center" />
        </BarGauge>
    );
}

