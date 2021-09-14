import React,{useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import ops from '../../redux/auth/authOperations';
import selectors from '../../redux/auth/authSelectors';
 import './UserInfo.scss';


const UserInfo = () => {
    const dispatch = useDispatch();
    const history = useHistory();
     const userEmail = useSelector(selectors.userEmail);

      const handleClick = () => {
        dispatch(ops.logout(history))
      localStorage.removeItem('token');    
};

  
return (
    <div className="user-info-wrapper" onClick={handleClick}>
                 <p className="user-info-wrapper-item">{userEmail}</p>
                 <span className="user-info-wrapper-item"></span>
                 <button onClick={handleClick} className="user-info-wrapper-item" type="button">Выйти</button>
    </div>   
  )
  }

export default UserInfo;



