import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import _ from 'lodash';

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [source, setSource] = useState('');
  const [date, setDate] = useState('');
  const { user, preferences } = useAuth();

 
  const debouncedSearch = useCallback(
    _.debounce((searchTerm, category, source, date) => {
      onSearch(searchTerm, category, source, date);
    }, 500),
    [onSearch, _, searchTerm, category, source, date]
  );
  
  const getPreference = useCallback(async () => {
    if(user){
      try{
      const preference = await preferences();
      setCategory(preference?.data?.categories?.[0])
      setSource (preference?.data?.sources?.[0])
      }catch(e){

      }
    }
}, [preferences, user]);

  

  useEffect(() =>  {
    if(!category && !source){
      getPreference()
    }
    debouncedSearch(searchTerm, category, source, date);
    return () => debouncedSearch.cancel();
  }, [searchTerm, category, source, date, debouncedSearch, getPreference]);



  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className='row'>
     <div className="card-body ">
      <h5 className="card-title">Filter</h5>
      <div className="mb-3 ">
      <input 
        type="text" 
        className="form-control"
        placeholder="Search articles..." 
        value={searchTerm} 
        onChange={handleSearchChange} 
      />
      </div>
      <div className="mb-3">
      <select value={category} className="form-select" onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        <option value="technology">Technology</option>
        <option value="entertainment">Entertainment</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="health">Health</option>
        <option value="science">Science</option>
      </select>
      </div>
      <div className="mb-3">
      <select value={source} className="form-select" onChange={handleSourceChange}>
        <option value="">All Sources</option>
        <option value="newsapi">News</option>
        <option value="guardian">Guardian</option>
        <option value="nytimes">NY Times</option>
        {/* Add more sources as needed */}
      </select>
      </div>
      <div className="mb-3">
      <input 
        type="date" 
        className="form-select"
        value={date} 
        onChange={handleDateChange} 
      />
      </div>
    </div>
    </div>
  );
};

export default SearchFilter;
