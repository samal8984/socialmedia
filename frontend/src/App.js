import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import store from './store';
import { loadUser } from './actions/userActions'
import { useSelector } from 'react-redux'

import {Register} from './components/Register'
import { Profile } from './components/Profile';
import { UpdateUserProfile } from './components/UpdateUserProfile';
import { AllUser } from './components/AllUser';
import { MyFriends } from './components/MyFriends';
import ProtectedRoute from './components/routes/ProtectedRoute'

import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    store.dispatch(loadUser());

  },[])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  return (
    
    <Router>
    <div className="App">
      <Navbar/>

      <div className='container-fluid'>
        <Route path="/" component={Home} exact />
      <Route path="/register" component={Register} />
      <Route path="/me" component={Profile} />
      <Route path="/me/update" component={UpdateUserProfile} />
      <ProtectedRoute path="/allusers" component={AllUser} />
      <Route path="/myfriends" component={MyFriends} />

      



     


       

      </div>
      
      
    </div>
    </Router>
  );
}

export default App;
