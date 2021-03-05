import React, {Fragment, Component} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Users from './components/Users';
import axios from 'axios';
import Alert from './components/Alert';
import about from './components/Pages/about';
import Search from './components/Search';
import User from './components/User';

import './App.css';

class App extends Component{
  
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  }

    // Search Github Users
    searchUsers = async text => {
      this.setState({ loading: true});
      if(this.alert !== null) {
        this.setState({alert: null});
      }
      const res = await axios.get(`https://api.github.com/search/users?q=${text}&
    client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
    &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users: res.data.items, loading: false});
    }; 
    // Clear users from search
    clearUsers = () => {
      this.setState({users: [], loading: false});
    };

    setAlert = (message, type) => {
      this.setState({ alert: { message: message, type: type} });
      setTimeout( () => this.setState({ alert: null}), 5000);
    }


    getUser = async (username) => {
      this.setState({ loading: true});
      if(this.alert !== null) {
        this.setState({alert: null});
      }
      const res = await axios.get(`https://api.github.com/users/${username}?
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user: res.data, loading: false});
    }

    getUserRepos = async (username) => {
      this.setState({ loading: true});
      if(this.alert !== null) {
        this.setState({alert: null});
      }
      const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
      &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({repos: res.data, loading: false});
    }  

  render() {
    const { users, user, loading, repos } = this.state;

    return (
      <Router>
        <Fragment>
        <Navbar title="Github Finder"/>
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search  
              searchUsers={this.searchUsers} 
              clearUsers={this.clearUsers} showClear= {
              this.state.users.length > 0 ? true : false}
              setAlert={this.setAlert}
            />
            <Users loading={loading} users={users} />
              </Fragment>
            )} />
            <Route exact path='/about' component={about} />
            <Route exact path='/user/:login' render={props => (
              <User {...props} getUser={this.getUser} user={user} loading={loading} getUserRepos={this.getUserRepos} repos={repos}/>
            )}/>
          </Switch>            
        </div>
        </Fragment>
      </Router>
    );
  }
  
}

export default App;
