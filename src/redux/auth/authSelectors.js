const sid = (state) => state.auth.sid;
const getToken = state => state.auth.accessToken;
const getRefreshToken = state => state.auth.refreshToken;
const userEmail= state => state.auth.userEmail;

const selectors =  {sid, getToken ,getRefreshToken,userEmail }
export default selectors
