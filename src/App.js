import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Home from './components/home';

import UserForm from './components/userForm';
import NotFound from './components/notFound';
import ChangePasswordForm from './components/changePasswordForm';
import Settings from './components/settings';
import Navigation from './components/navigation';
import LoginForm from './components/loginForm';
import Register from './components/register';
import UserContext from './context/userContext';
import { getCurrentUser, logout } from './services/authService';
import ProtectedRoute from './common/protectedRoute';
import 'react-toastify/dist/ReactToastify.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem('token');
    if (token) {
      setCurrentUser(getCurrentUser());
    }
  }, []);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
  };

  return (
    <div className='App'>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <Navigation currentUser={currentUser} onLogout={handleLogout} />
        <ToastContainer />
        <main className='container'>
          <Switch>
            {/* <ProtectedRoute path='/users/:id' component={UserForm} />
            <ProtectedRoute path='/userAccounts/:id' component={UserAccountForm} />
            <ProtectedRoute path='/contacts/:id' component={ContactForm} />
            <ProtectedRoute path='/contactTypes/:id' component={ContactTypeForm} />
            <ProtectedRoute path='/products/:id' component={PlasticTypeForm} />
            <ProtectedRoute path='/products-image/:id' component={PlasticTypeImageForm} /> */}
            <Route path='/Register/:id' render={(props) => <Register {...props} />} />
            {/*Routes for Non Form */}
            <Route path='/login' render={(props) => <LoginForm {...props} />} />
            <Route path='/updatePassword' render={(props) => <ChangePasswordForm {...props} />} />
            {/* <Route path='/users' render={(props) => <User {...props} />} /> */}

            <Route
              path='/settings'
              render={(props) => <Settings {...props} />}
            />
            <Route path='/not-found' component={NotFound}></Route>
            <Route path='/' exact render={(props) => <Home {...props} />} />
            <Redirect to='/not-found' />
          </Switch>
        </main>
      </UserContext.Provider>
    </div>
  );
}

export default App;
