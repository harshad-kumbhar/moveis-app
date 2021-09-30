import './App.css';
import Movies from './components/movies';
import React from 'react';
import Navbar from './components/navbar';
import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Home from './components/home';
import Budget from './components/budget';
import MovieDetails from './components/movies-details';
import NotFound from './common-components/not-found';
import Login from './components/login-form';
import MovieForm from './components/movies-form';

class App extends Component {
  state = {
    activeTab: 'Home'
  }

  changeTab = (activeTab: string) => {
    this.setState({activeTab});
  }
  
  render() {
    return (
      <React.Fragment>
        <Navbar activeTab={this.state.activeTab} onTabChange={(tab: string) => this.changeTab(tab)}/>
        <div className="content">
          <Switch>
            <Route path="/movies/add" component={MovieForm}></Route>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/budget" render={(props) => <Budget message={'Not availble'} {...props}/> }></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/" exact component={Home}></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
