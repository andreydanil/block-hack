import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {withRouter} from 'react-router-dom';

class Header extends React.Component{
    sendHome = () =>{
        this.props.history.push("/");
    }
    render(){
        return(
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.sendHome}>
                        <Typography variant="h6">
                            BlockHack
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
        )
    }
}

export default withRouter(Header);