import authActions from "./authActions";
import { auth, database } from "../../firebase/firebase";
import app from "firebase";
import api from "../../services/backend.service";

const register =
  ({ email, password }, history) =>
  async (dispatch) => {
    try {
      dispatch(authActions.registerRequest());
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      dispatch(authActions.registerRequest());
      dispatch(authActions.registerSuccess(user));
      history.push("/login");
      return dispatch(authActions.registerSuccess(user));
    } catch (e) {
      return dispatch(authActions.loginError(e.err));
    }
  };

const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch(authActions.loginRequest());
      const data = await auth.signInWithEmailAndPassword(email, password);
      console.log(data)
      const {
        user: {email: userEmail, uid, refreshToken, l: accessToken },
      } = data;
      const userInfo = {
        auth: { uid, refreshToken, accessToken,userEmail },
        userProduct: {
          products: [],
        },
      };
      return dispatch(authActions.loginSuccess(userInfo));
    } catch (e) {
      if (e.response) {
        dispatch(authActions.loginError(e.err));
      } else return dispatch(authActions.loginError(e.err));
    }
  };

const logout = (history) => async(dispatch) => {
  dispatch(authActions.logoutRequest());
  auth.signOut().then(function() {
    dispatch(authActions.logoutSuccess());
    history.push("/login");
  }).catch(function(err) {
    dispatch(authActions.logoutError(err))
  });
};

const refresh = () => (dispatch) => {
  
};

const ops = { register, login, logout, refresh };

export default ops;
