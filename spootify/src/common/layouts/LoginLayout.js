import React from 'react';
import { useLocation, Redirect } from 'react-router-dom'
import { setToken, removeToken} from '../../utils/cookies'

function LoginLayout({ children, history }) {
  const { hash } = useLocation()
  const access_token = new URLSearchParams(hash.substring(1)).get('access_token');
  const expires_in = new URLSearchParams(hash.substring(1)).get('expires_in');

  if (hash && access_token) {
    setToken(access_token, { expires: expires_in })
  } else { 
    removeToken()
  }

  return <Redirect to="/" />

}

export default LoginLayout;
