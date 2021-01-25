import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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


export default function OutlinedCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    Resumé
                </Typography>
                <Typography variant="body2" align="left" component="p">
                    L'équipe avance à un bon rythme et des avancements concrets sont visibles. On garde le cap sur une V0 pour le 15 février.
                    <ul>
                        <li>Optimisations Asana presque terminées</li>
                        <li>Assemblage débuté pour la presque totalité des modules; intégration imminente</li>
                        <li>3-4 jours de retard sur quelques jalons; déterminer les raisons</li>
                    </ul>
                </Typography>
            </CardContent>
        </Card>
    );
}