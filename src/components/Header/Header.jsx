import React, { Component, Fragment } from 'react';
import Media from 'react-media';
import { NavLink } from 'react-router-dom';
import { Logo, LogoText } from '../Logo';
import NavigationBar from '../NavigationBar';
import AuthNavigations from '../AuthNavigations/AuthNavigations';
import UserInfo from '../UserInfo';
import { BurgerMenu, Burger } from '../BurgerMenu';
import styles from "./Header.module.scss"
import '../../shared-styles/_container.scss'
import withAuth from "../hocs/withAuth"

class Header extends Component {
  state = {
    isOpen: false,
  };
  handleToggle = () => {
    this.setState({ isOpen: !this.state.isOpen })
  }
  handleIsOpenLogout = () => {
    this.setState({ isOpen: false })
  }

  render() {
    const { isAuth } = this.props;
    const { isOpen } = this.state;

    return (
      <>
      <section className={styles.sectionHeader}>
        <header className="container">
          <div className={styles.mainHeader}>
            <NavLink exact to="/" className={styles.logoLink}>
              <div className={styles.logoContainer}>
                <Media
                  queries={{
                    small: '(min-width: 320px) and (max-width: 649px)',
                    medium: '(min-width: 650px) and (max-width: 1099px)',
                    large: '(min-width: 1100px)',
                  }}
                >
                  {matches => (
                    <Fragment>
                      {matches.small && (
                        <>
                          <Logo /> {isAuth && <LogoText />}
                        </>
                      )}
                      {matches.medium && (
                        <>
                          <Logo />
                          <LogoText />
                        </>
                      )}
                      {matches.large && (
                        <>
                          <Logo />
                          <LogoText />
                        </>
                      )}
                    </Fragment>
                  )}
                </Media>
              </div>
            </NavLink>
              <Media
                queries={{
                  small: '(min-width: 320px) and (max-width: 649px)',
                  medium: '(min-width: 650px) and (max-width: 1099px)',
                  large: '(min-width: 1100px)',
                }}
              >
                {matches => (
                  <Fragment>
                    {matches.small && (
                      <>
                        {isAuth ? (
                          <div className={styles.navigationAuth}>
                            {!isOpen ? (
                              <Burger onClick={this.handleToggle} />
                            ) : (
                              <button
                                type="button"
                                className={styles.closeBtn}
                                onClick={() => this.handleToggle()}
                              >
                                X
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className={styles.navigation}>
                            <NavigationBar />
                          </div> 
                        )}
                       
                      </>
                    )}
                    {matches.medium && (
                      <>{isAuth ? (
                        <div className={styles.navigationAuth}>
                          {isAuth && <div><UserInfo onClick={this.handleIsOpenLogout}/></div>}

                            {!isOpen ? (
                              <Burger onClick={this.handleToggle} />
                            ) : (
                              <button
                                type="button"
                                className={styles.closeBtn}
                                onClick={() => this.handleToggle()}
                              >
                                X
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className={styles.navigation}>
                            {' '}
                            <NavigationBar />{' '}
                          </div>
                        )}
                      </>
                    )}
                    {matches.large && (
                      <>
                        {isAuth ? (
                          <div className={styles.navigationAuth}>
                            {isAuth && (
                              <>
                                <div className={styles.navigation}>
                                  {' '}
                                  <AuthNavigations />{' '}
                                </div>
                                <div>
                                  <UserInfo />
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className={styles.navigation}>
                            {' '}
                            <NavigationBar />{' '}
                          </div>
                        )}
                      </>
                    )}
                  </Fragment>
                )}
              </Media>
          </div>
        

      </header>
      {<Media
                queries={{
                  small: "(min-width: 320px) and (max-width: 649px)",
                  medium: "(min-width: 650px) and (max-width: 1099px)",
                  large: "(min-width: 1100px)",
                }}
              >
              {(matches) => (
                <Fragment>
                {matches.small && isAuth && 
                <section className={styles.userInfoSection}>

                <div className="container">

                <div 
                className={`${styles.mobUserInfoWrap}`}>
                  <UserInfo 
                onClick={this.handleIsOpenLogout}/>
                </div>
                </div>
                </section>
                }
                </Fragment>
                )
              }</Media>
      }
      {this.state.isOpen && <BurgerMenu onClick={this.handleToggle} />}
      </section>
    </>
  
  );
}
}

export default withAuth(Header);
