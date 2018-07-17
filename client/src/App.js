import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//needs completed paths
import NoMatch from './pages/NoMatch';
import Articles from './pages/Articles';
import Nav from './components/Nav';
import SavedArticles from './pages/SavedArticles';


const App = () => (
  <Router>
    <div>
      <Nav />
        <Switch>
          <Route exact path='/' component={Articles} />
          <Route exact path='/articles' component={Articles} />
          <Route exact path='/articles:id' component={SavedArticles} />
          <Route component={NoMatch} />
        </Switch>
    </div>
  </Router>
);

export default App;
