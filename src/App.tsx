import './App.css';
import Movies from './components/movies';
import React from 'react';
import Navbar from './components/navbar';
import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import jwt from 'jwt-decode';
import Home from './components/home';
import Budget from './components/budget';
import NotFound from './common-components/not-found';
import Login from './components/login-form';
import MovieForm from './components/movies-form';
import Register from './components/register';
import Hooks from './hooks/hooks';
import UserContext from './hooks/userontect';
import jwtDecode from 'jwt-decode';
import { toast } from 'react-toastify';
import Logout from './components/logout';

class App extends Component {
  state = {
    activeTab: 'Home',
    userName: {name: ''},
    user: null
  }

  changeTab = (activeTab: string) => {
    this.setState({activeTab});
  }
  
  componentDidMount() {
    try {
      const token = localStorage.getItem('token') || '';
      if (token !== '') {
      const user: any = jwtDecode(token);
      this.setState({user})
      }
    } catch (ex: any) {
      toast.error(ex);
    }
  }

  render() {
    return (
      <React.Fragment>
        <UserContext.Provider value={this.state.userName}>
           <Navbar user={this.state.user} activeTab={this.state.activeTab} onTabChange={(tab: string) => this.changeTab(tab)}/>
        </UserContext.Provider>              
        <div className="content">
          <Switch>
            <Route path="/movies/add" component={MovieForm}></Route>
            <Route path="/hooks" component={Hooks}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/movies/:id" render={(props) => {
              if (!this.state.user) return <Redirect to='/login'/>
              return <MovieForm {...props}/>
            }}></Route>
            <Route path="/movies" render={(props) => <Movies user={this.state.user} {...props}/>}></Route>
            <Route path="/budget" render={(props) => <Budget message={'Not availble'} {...props}/> }></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Route path="/" exact component={Home}></Route>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </div>

      </React.Fragment>
    );
  }
}

export default App;
