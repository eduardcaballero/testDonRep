import React, { Component } from 'react';
import { getToken } from '../../../utils/cookies'
// import axios from '../../../axiosConfig';
import axios from 'axios';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }
  componentDidMount() {
    axios({ method: 'GET', url:`${process.env.REACT_APP_BASE_URL}/browse/new-releases`, headers: { 'Authorization': `Bearer ${getToken()}` } }).then((res) => {
      this.setState({newReleases: res.data.albums.items})
    })
    axios({ method: 'GET', url:`${process.env.REACT_APP_BASE_URL}/browse/featured-playlists`, headers: { 'Authorization': `Bearer ${getToken()}` } }).then((res) => {
      this.setState({playlists: res.data.playlists.items})
    })
    axios({ method: 'GET', url:`${process.env.REACT_APP_BASE_URL}/browse/categories`, headers: { 'Authorization': `Bearer ${getToken()}` } }).then((res) => {
      this.setState({categories: res.data.categories.items})
    })
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} />
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} />
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" />
      </div>
    );
  }
}
