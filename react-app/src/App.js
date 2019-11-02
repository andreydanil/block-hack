import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Club from './components/Club';
import Event from './components/Event';
import Flyer from './components/Flyer';
import Header from './components/Header';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

class App extends React.Component{
    render(){
        const theme = createMuiTheme({
            palette: {
                primary: blue,
            }
        });
        return(
            <Router>
                <div>
                    <ThemeProvider theme={theme}>
                        <Header />
                        <Switch>
                            <Route path="/" exact>
                                <Home />
                            </Route>
                            <Route path="/club">
                                <Club />
                            </Route>
                            <Route path="/event">
                                <Event />
                            </Route>
                            <Route path="/flyer">
                                <Flyer />
                            </Route>
                        </Switch>
                    </ThemeProvider>
                </div>
            </Router>
        )
    }
}

export default App;