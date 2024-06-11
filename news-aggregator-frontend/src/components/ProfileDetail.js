// src/components/Profile.js

import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useAuth } from '../context/AuthContext';
import './ProfileDetail.css';

const ProfileDetail = () => {
  const { user, preferences } = useAuth();

  // Static categories and sources
  const categories = [['business', "Business"], ['technology','Technology'], ['entertainment','Entertainment'], ['health','Health'], ['sports',"Sports"]];
  const sources = [['newsapi','News'], ['guardian','The Guardian'], ['nytimes','The New York Times']];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await preferences();
        setSelectedCategories(response.data.categories);
        setSelectedSources(response.data.sources);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setError('Preferences not found.');
          } else if (error.response.status === 500) {
            setError('Server error. Please try again later.');
          } else {
            setError('An error occurred. Please try again.');
          }
        } else {
          setError('Network error. Please check your connection.');
        }
      }
      finally {
        setLoading(false);
      }
    };

    if (user) { 
        fetchPreferences();
    }
  }, [preferences, user]);

  const handleSavePreferences = async () => {
    try {
      await axios.post('/api/user/preferences', {
        categories: selectedCategories,
        sources: selectedSources,
      });
      localStorage.removeItem('preferences');
      setSuccess('Preferences saved successfully')
    } catch (error) {
      if (error.response) {
        if (error.response.status === 500) {
          setError('Server error. Please try again later.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    }
  };



  const handleCategoryChange = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(cat => cat !== category) : [...prev, category]
    );
  };

  const handleSourceChange = (source) => {
    setSelectedSources(prev =>
      prev.includes(source) ? prev.filter(src => src !== source) : [...prev, source]
    );
  };

  if (loading) {
    return <div>Loading...</div>; 
  }
  return (
    <div className="container">
      <h2>Profile Preferences</h2>
      {success && <div className="alert alert-success alert-dismissible fade show" role="alert">
        {success}
      </div>
      }
      {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {error}
      </div>
      }
      <div className="mb-3">
        <h5>Categories</h5>
        {categories.map(category => (
          <div key={category[0]} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedCategories.includes(category[0])}
              onChange={() => handleCategoryChange(category[0])}
            />
            <label className="form-check-label">{category[1]}</label>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <h5>Sources</h5>
        {sources.map(source => (
          <div key={source[0]} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedSources.includes(source[0])}
              onChange={() => handleSourceChange(source[0])}
            />
            <label className="form-check-label">{source[1]}</label>
          </div>
        ))}
      </div>
      <button className="btn btn-primary" onClick={handleSavePreferences}>Save Preferences</button>
    </div>
  );
};

export default ProfileDetail;
