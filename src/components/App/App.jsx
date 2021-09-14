
import React,{useEffect, Suspense, Fragment } from 'react';
import {Switch} from 'react-router-dom';
import { addLocaleData, IntlProvider } from 'react-intl';
import DocumentTitle from 'react-document-title';
import { enquireScreen } from 'enquire-js';
import Decoration from '../../components/Decoration';
import { DatePicker } from 'antd';
// import { getCurrentUser } from '../../redux/user/userOperations';
import Banner from '../Banner/Banner.jsx';
import BannerImage from '../Animate/Animate.jsx';
import routes from '../../routes';
import PublicRoute from '../PublicRoute/PublicRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {useDispatch} from 'react-redux';
import {auth} from '../../firebase/firebase';
import Loader from '../shared/Loader';
import Layout from '../Layout';
 import Alert from '../Alert';
 import 'antd/dist/antd.css';
 import '../../static/style';
//  import cnLocale from '../zh-CN';
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

