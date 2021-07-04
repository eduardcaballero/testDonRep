import React, {useEffect, useState} from 'react';
import axios from 'axios';
import cx from 'classnames';
import { getToken } from '../../../utils/cookies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadphonesAlt,
  faHeart,
  faPlayCircle,
  faSearch, faStream, faSignInAlt
} from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Avatar } from '../../../assets/images/avatar.svg';
import './_sidebar.scss';

const AUTH_URL = `${process.env.REACT_APP_AUTHORIZE}?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT}&scope=user-read-email&response_type=token`

function renderSideBarOption(link, icon, text, { selected } = {}) {
  return (
    <div
      className={cx('sidebar__option', { 'sidebar__option--selected': selected })}
    >
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </div>
  )
}

export default function SideBar() {
  const [userName, setUserName] = useState()
  useEffect(() => {
    axios.get(process.env.REACT_APP_USER, { headers: { 'Authorization': `Bearer ${getToken()}`}} ).then((res)=>{
      setUserName(res.data.display_name)
    })
  },[])

  return (
    <div className="sidebar">
      {getToken() ?
        (<div className="sidebar__profile">
          <Avatar />
          <p>{userName || "Loading..."}</p>
        </div>)
        :
        (<div className="sidebar__login">
          <a href={AUTH_URL} rel="noreferrer"><FontAwesomeIcon icon={faSignInAlt} /><p>Login</p></a>
        </div>)}
      <div className="sidebar__options">
        {renderSideBarOption('/', faHeadphonesAlt, 'Discover', { selected: true })}
        {renderSideBarOption('/search', faSearch, 'Search')}
        {renderSideBarOption('/favourites', faHeart, 'Favourites')}
        {renderSideBarOption('/playlists', faPlayCircle, 'Playlists')}
        {renderSideBarOption('/charts', faStream, 'Charts')}
      </div>
    </div>
  );
}
