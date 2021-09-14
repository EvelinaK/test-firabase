import React from 'react';
import styles from './BurgerMenu.module.scss';
import { NavLink } from 'react-router-dom';

export const BurgerMenu = (props) => {
  const {onClick} = props;
  return (
    <div className={styles.burgerMenu}>
      <ul className={styles.burgerMenuList}>
        <li>
          <NavLink exact to="/product-list" className={styles.burgerMenuItemDiary} onClick={onClick}>
          Product list
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/add" className={styles.burgerMenuItemCalc} onClick={onClick}>
          Add/Edit product
          </NavLink>
        </li>
      </ul>
    </div>
  );
};


