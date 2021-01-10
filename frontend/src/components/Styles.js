import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    container:{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
      },
    centered: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    progressBar: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
      list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
      },
    },
  }));


