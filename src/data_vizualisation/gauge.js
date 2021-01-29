import React from 'react';
import { BarGauge, Label, Legend, Export, Title, Font } from 'devextreme-react/bar-gauge';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const format = {
    type: 'fixedPoint',
    precision: 1
};

export default function Gauge(props) {

    const [gauge, updateGauge] = React.useState([]);

    React.useEffect(() => {
        updateGauge(props.data)
    }, [props.data])

    function customizeText({ valueText }) {
        return `${valueText}`;
    }

    return (
        <Typography variant="h1">{gauge}</Typography>

    );
}