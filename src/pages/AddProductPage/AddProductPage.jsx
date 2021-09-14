import React,{useEffect,Fragment} from 'react'
import AddProductForm from '../../components/AddProductForm/AddProductForm'
import css from './AddProductPage.module.scss';
import Decoration from '../../components/Decoration';
const ContactList = () => {


  return (
    <Fragment>
        <Decoration  />
      <section className={css.container} >
                  <AddProductForm/>  
      </section>
      </Fragment>
  )
  }

export default ContactList;



