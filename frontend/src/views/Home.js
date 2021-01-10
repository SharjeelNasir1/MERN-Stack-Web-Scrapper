
import React from 'react';
import {auth} from '../firebase';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios'
import {useState} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const hardLinks = [
    "https://github.com/", "https://www.facebook.com/", "https://www.google.com/",
    "https://www.youtube.com/", "https://twitter.com/",
]; 

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export default function Home() {
    const [links, setlinks] = useState([]);
    const [input, setinput] = useState('');
    const [loading,setloading]=useState(false)
    const classes = useStyles();

    function ListItemLink(props) {
        return <ListItem button component="a" {...props} />;
    }

    async function getlinks(input){
        const config = {
            headers: {
            "Content-Type": "application/json",
          },
        };
      
        const body = {inputt:input}
        console.log(body);
        
        setloading(true)
        const res=await axios.post("http://localhost:5000/links",body,config)
        console.log(res.data);
        if(res.data.success){
            setlinks(res.data.links)
            console.log(links)
            setloading(false)
        }
       
        
        
    }

    const onChange = (e) =>{
      
        setinput( e.target.value);
        console.log(input)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(input)

        if(input!=''){
            getlinks(input)
        }
        
        
        
        
    };

    return (
        <React.Fragment>
        <CssBaseline />
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                Web Scrapper
            </Typography>
            <nav>
                <Link  variant="button" color="textPrimary" underline="always" href="#" className={classes.link}
                >
                Home
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Services
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                About us
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.link}>
                Contact us
                </Link>
            </nav>
            <Button
                    variant="outlined" color="primary"
                    className={classes.link}
                    // className={classes.button}
                    startIcon={<PowerSettingsNewIcon />}
                    onClick={() => auth.signOut()}
                    >
                    Logout
                    </Button>
            </Toolbar>
        </AppBar>
        {/* Hero unit */}
        <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <div className={classes.centered}>
                    <form  noValidate autoComplete="off" onSubmit={(e) => onSubmit(e)}>
                        <TextField id="outlined-basic" label="enter keyword " variant="outlined" onChange={(e) => onChange(e)} />
                        
                    </form>
        </div>
        <br/>
            <h2>Google Scholar Links:</h2>
            {loading?
                    <div className={classes.centered}>
                        <CircularProgress />
                        <CircularProgress color="secondary" />
                    </div>
                    :
                    <div className={classes.list}>
                    <List 
                    component="nav" 
                    aria-label="secondary mailbox folders"
                    >
                    {links.map((value, index) => {
                        return (
                            <ListItemLink href={value}>
                                <ListItemText primary={(index + 1) + " " + value} />
                            </ListItemLink>
                        )
                    })}
                        {/* <ListItem button>
                        <ListItemText primary="Trash" />
                        </ListItem>
                        <ListItemLink href="#simple-list">
                        <ListItemText primary="Spam" />
                        </ListItemLink> */}
                    </List>
                    </div>}
        </Container>
        {/* End hero unit */}
        
        {/* Footer */}
        <Container maxWidth="md" component="footer" className={classes.footer}>
            <Grid container spacing={4} justify="space-evenly">
            {footers.map((footer) => (
                <Grid item xs={6} sm={3} key={footer.title}>
                <Typography variant="h6" color="textPrimary" gutterBottom>
                    {footer.title}
                </Typography>
                <ul>
                    {footer.description.map((item) => (
                    <li key={item}>
                        <Link href="#" variant="subtitle1" color="textSecondary">
                        {item}
                        </Link>
                    </li>
                    ))}
                </ul>
                </Grid>
            ))}
            </Grid>
            <Box mt={5}>
            <Copyright />
            </Box>
        </Container>
        {/* End footer */}
        </React.Fragment>
    );
}