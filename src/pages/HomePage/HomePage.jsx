import React, { Fragment } from "react";
import Decoration from '../../components/Decoration';
import BannerImage from '../../components/Animate/Animate';
import css from '../../components/AddProductForm/AddProductForm.module.scss';
const HomePage = () => {
  return (

    <Fragment>
        <Decoration /> 
      <section className='container'>
        <h2 className={css.DailyCaloriesFormTitle} >Internet store app</h2>
      </section>
      <div className={css.HomeWrapper}>
            < BannerImage/>
            </div>
    </Fragment>
    
  );
};

HomePage.propTypes = {

};

HomePage.defaultProps = {

};

export default HomePage;
