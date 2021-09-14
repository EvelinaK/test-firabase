
import React,{useEffect, Suspense, Fragment } from 'react';
import {Switch} from 'react-router-dom';
import Decoration from '../../components/Decoration';
// import { getCurrentUser } from '../../redux/user/userOperations';
import routes from '../../routes';
import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {useDispatch} from 'react-redux';
import {auth} from '../../firebase/firebase';
import Loader from '../shared/Loader';
import Layout from '../Layout';
 import Alert from '../Alert';

 import './App.scss';
console.log(routes)

function App() {
  const dispatch = useDispatch();

  useEffect(() => {

      auth.onAuthStateChanged(userAuth => {
          if(userAuth !== null) 
          localStorage.setItem('token', userAuth.uid);
      });

  },[dispatch]);
  

  return (
    
    <Fragment>
          <Decoration isLoginPage={true} />
            <Layout>
              <Suspense fallback={<Loader />}>
              <Switch>
              {routes.map((route => route.privated?
               <PrivateRoute key={route.path} component={route.component} {...route}></PrivateRoute>
               :
               <PublicRoute key={route.path}  restricted={true} component={route.component} {...route}></PublicRoute>))
              }
          </Switch>
             </Suspense>
           </Layout>
        </Fragment>
  )
}

export default App

