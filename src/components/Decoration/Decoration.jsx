import React, { Component } from 'react';

class Decoration extends Component {
  state = {  }
  render() {
    let addStyle = '';
    if(this.props.isLoginPage){
      addStyle = "-login"
    }else {
      addStyle = "-calculation"
    }
    // const addStyle = this.props.isLoginPage ? "-login" : '';
    return ( 
      <section className={`decoration${addStyle}`} >
        {/* <div className="dec-container"> */}
          <div className='dec-spot'></div>
          <div className="dec-strawberry"></div>
          <div className="dec-leaves"></div>
          <div className="dec-banana"></div>
        {/* </div> */}
      </section>
     );
  }
}
 
export default Decoration;