import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function OutlinedCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    Comment interpréter les ratios
                </Typography>
                <Typography fontWeight={500} variant="body2" align="center" component="p">
                    <Box fontWeight={400} m={1}>
                        <b>&lt; 1</b>: Retard sur échéancier
                    </Box>
                    <Box fontWeight={400} m={1}>
                        <b>&gt; 1</b>: Charge sous-estimée
                    </Box>
                    <Box fontWeight={400} m={1}>
                        <b>= 1 (+/- 0.5)</b>: Acceptable
                    </Box>
                </Typography>
                <Typography variant="body2" align="left" component="p">
                    Les indicateurs présents dans l'arbre sont le ratio entre le temps effectué et le temps prévu normalisé sur le temps.
                    Si un ratio est en dessous de 1, il se peut que la raison soit
                    une charge de travail sur-estimée qui résulte en un nombre d'heures prévues trop grand ce qui cause un retard virtuel non valide.
                </Typography>
            </CardContent>
        </Card>
    );
}