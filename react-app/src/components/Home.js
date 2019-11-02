import React from 'react';
import Button from '@material-ui/core/Button';
import {withRouter} from 'react-router-dom';

class Home extends React.Component{
    makeClub = () =>{
        this.props.history.push("/club");
    }
    makeEvent = () =>{
        this.props.history.push("/event");
    }
    componentDidMount(){
        let p = window.location.search;
        if(p.includes("?")){
            p = p.replace("?","");
            this.props.history.push(`/${p}`);
        }
    }
    render(){
        return(
            <div className="center">
                <h2>Welcome to BlockHack!</h2>
                <p>
                    This website is designed to help you start a block club or a community event.
                </p>
                <p>
                    What are you looking to start?
                </p>
                <Button variant="contained" color="primary" onClick={this.makeClub}>
                    Block Club
                </Button>
                <p>- or -</p>
                <Button variant="contained" color="secondary" onClick={this.makeEvent}>
                    Community Event
                </Button>
            </div>
        )
    }
}

export default withRouter(Home);