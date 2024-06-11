import React from 'react';
import {  Link } from 'react-router-dom';


const Profile = ({ name }) => {
  return (<Link className="btn btn-outline-light me-2" to="/profile"><span>Howdy {name}</span></Link>)
};

export default Profile;
