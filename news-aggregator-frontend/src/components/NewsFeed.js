import React, { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from '../axios';
import SearchFilter from './SearchFilter';
import './NewsFeed.css';

const NewsFeed = () => {
  const { user } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async (searchTerm = '', category = '', source = '', date = '') => {
    if(user){
        setLoading(true);
        try {
          const response = await axios.get('/api/news', {
            params: {
              q: searchTerm,
              category: category,
              source: source,
              date: date,
            },
          });
          setArticles(response.data.news);
        
        } catch (error) {
          console.error('Error fetching articles:', error);
        }
      setLoading(false);
    }
  }, [user]);

  return (
      <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 mt-4">
          <div className="card">
          <SearchFilter onSearch={fetchArticles} />
          </div>
        </div>
        <div className="col-md-8">
          <h2 className="mb-4 mt-4">News Feed</h2> 
          <div className="list-container">
          { !user ? (
            <div className="alert alert-warning" role="alert">
              Login and get the latest news.
            </div>
          
          ) : (
            <div>
          {loading ? (
            <div>
              <div className="spinner-grow text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
              </div>
              <div className="spinner-grow text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          </div>
          ) : (
            <div className="list-group">
              { 
             articles.length === 0 && <div className="alert alert-danger alert-dismissible fade show" role="alert">
              No News found for given filter, please try something other filter.
              </div>
            } 
              {articles.map(article => (
                <a
                key={article.url}
                href={article.url}
                className="list-group-item list-group-item-action"
                target="_blank"
                rel="noopener noreferrer"
              >
                <h5 className="mb-1">{article.title}</h5>
                <p className="mb-1">{article.description}</p>
                <span className="badge rounded-pill bg-info text-dark">{article.source?.name || article.source}</span>
              </a>
              ))}
            </div>
          )}
          </div>
        )}
        </div>
        </div>
      </div>
      </div>
    
  );
};

export default NewsFeed;

