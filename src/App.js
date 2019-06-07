import React from 'react';
import {Route, Switch} from 'react-router-dom'
import {Container} from 'semantic-ui-react'
import Navbar from './Navbar'
import Home from './Home'
import About from './About'
import NoMatch from './NoMatch'


const App = () => (
  <>
    <Navbar />
    <Container>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/About" component={About}/>
        <Route component={NoMatch} />
      </Switch>
    </Container>
  </>
)

export default App;