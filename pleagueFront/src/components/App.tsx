import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Chat from '../pages/Chat';

import 'antd/dist/antd.css';

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/chat" component={Chat} />
      <Redirect path="*" to="/" />
    </Router>
  );
};

export default App;
