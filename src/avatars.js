import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function ImageAvatars() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="A" src="public/photos_membres/IMG_1014.jpeg" />
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
        </div>
    );
}