import React from 'react';

import styles from './AuthNavigations.module.scss';
import { NavLink } from 'react-router-dom';


const AuthNavigations = () => (
  <div className={styles.authnav}>
    <NavLink  to="/"  className={styles.link} activeClassName={styles.active}>Home</NavLink>
    <NavLink  to="product-list"  className={styles.link} activeClassName={styles.active}>Product list</NavLink>
    <NavLink  to="/add"  className={styles.link} activeClassName={styles.active}>Add/Edit product</NavLink>
  </div>
);


export default (AuthNavigations);
