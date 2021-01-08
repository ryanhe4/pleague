import * as React from 'react';
import {BrowserRouter as Router, Route,} from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Register from '../pages/Register';

const App = () => {
    return (
        <Router>
            <Route path="/" exact component={Home}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/Register" component={Register}/>
        </Router>)
}

export default App;
