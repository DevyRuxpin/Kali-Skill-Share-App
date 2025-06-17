import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { 
  FaSearch, FaExternalLinkAlt, FaStar, FaFire, FaRocket,
  FaJs, FaPython, FaJava, FaPhp, FaSwift,
  FaReact, FaVuejs, FaAngular, FaHtml5, FaCss3Alt, FaBootstrap, FaSass,
  FaNodeJs, FaServer, FaLaravel, FaBook, FaCode
} from 'react-icons/fa';
import { SiTypescript, SiKotlin, SiWebpack, SiNextdotjs, SiTailwindcss, SiDjango, SiFlask, SiSpringboot, SiFastapi, SiDotnet } from 'react-icons/si';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { trackUserAction, trackFeatureUsage } = useAnalytics();

  // Icon mapping for different technologies
  const getTechnologyIcon = (title) => {
    const titleLower = title.toLowerCase();
    
    // Languages
    if (titleLower.includes('javascript')) return <FaJs style={{ color: '#F7DF1E' }} />;
    if (titleLower.includes('python')) return <FaPython style={{ color: '#3776AB' }} />;
    if (titleLower.includes('java')) return <FaJava style={{ color: '#ED8B00' }} />;
    if (titleLower.includes('php')) return <FaPhp style={{ color: '#777BB4' }} />;
    if (titleLower.includes('swift')) return <FaSwift style={{ color: '#FA7343' }} />;
    if (titleLower.includes('go') || titleLower.includes('golang')) return <FaCode style={{ color: '#00ADD8' }} />;
    if (titleLower.includes('typescript')) return <SiTypescript style={{ color: '#3178C6' }} />;
    if (titleLower.includes('kotlin')) return <SiKotlin style={{ color: '#7F52FF' }} />;
    
    // Frontend
    if (titleLower.includes('react')) return <FaReact style={{ color: '#61DAFB' }} />;
    if (titleLower.includes('vue')) return <FaVuejs style={{ color: '#4FC08D' }} />;
    if (titleLower.includes('angular')) return <FaAngular style={{ color: '#DD0031' }} />;
    if (titleLower.includes('html')) return <FaHtml5 style={{ color: '#E34F26' }} />;
    if (titleLower.includes('css')) return <FaCss3Alt style={{ color: '#1572B6' }} />;
    if (titleLower.includes('bootstrap')) return <FaBootstrap style={{ color: '#7952B3' }} />;
    if (titleLower.includes('sass')) return <FaSass style={{ color: '#CC6699' }} />;
    if (titleLower.includes('webpack')) return <SiWebpack style={{ color: '#8DD6F9' }} />;
    if (titleLower.includes('next.js')) return <SiNextdotjs style={{ color: '#000000' }} />;
    if (titleLower.includes('tailwind')) return <SiTailwindcss style={{ color: '#06B6D4' }} />;
    
    // Backend
    if (titleLower.includes('node.js')) return <FaNodeJs style={{ color: '#339933' }} />;
    if (titleLower.includes('django')) return <SiDjango style={{ color: '#092E20' }} />;
    if (titleLower.includes('flask')) return <SiFlask style={{ color: '#000000' }} />;
    if (titleLower.includes('spring')) return <SiSpringboot style={{ color: '#6DB33F' }} />;
    if (titleLower.includes('laravel')) return <FaLaravel style={{ color: '#FF2D20' }} />;
    if (titleLower.includes('fastapi')) return <SiFastapi style={{ color: '#009688' }} />;
    if (titleLower.includes('asp.net')) return <SiDotnet style={{ color: '#512BD4' }} />;
    
    return <FaBook style={{ color: '#6c757d' }} />;
  };

  const getPopularityBadge = (index) => {
    if (index < 3) return <FaFire style={{ color: '#FF6B35', fontSize: '0.8rem' }} />;
    if (index < 8) return <FaStar style={{ color: '#FFD700', fontSize: '0.8rem' }} />;
    if (index < 15) return <FaRocket style={{ color: '#007bff', fontSize: '0.8rem' }} />;
    return null;
  };

  const categories = [
    { key: 'languages', name: 'Languages', icon: <FaJs style={{ color: '#007bff' }} /> },
    { key: 'frontend', name: 'Frontend', icon: <FaReact style={{ color: '#61DAFB' }} /> },
    { key: 'backend', name: 'Backend', icon: <FaServer style={{ color: '#28a745' }} /> },
    { key: 'platforms', name: 'Coding Schools/Platforms', icon: <FaBook style={{ color: '#ffc107' }} /> }
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/search/keyword?q=${encodeURIComponent(searchQuery)}&category=${selectedCategory}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Search failed');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
      
      // Track search activity
      trackUserAction('Search Performed', {
        searchTerm: searchQuery,
        category: selectedCategory,
        resultCount: data.results ? data.results.length : 0,
        searchType: 'keyword'
      });
      
    } catch (error) {
      console.error('Search error:', error);
      setError(error.message || 'Failed to perform search');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySearch = async (category) => {
    setSelectedCategory(category);
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/search/category/${category}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Category search failed');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
      
      // Track category search
      trackFeatureUsage('Category Search', {
        category: category,
        resultCount: data.results ? data.results.length : 0
      });
      
    } catch (error) {
      console.error('Category search error:', error);
      setError(error.message || 'Failed to load category');
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSelectedCategory('');
    setError('');
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <FaSearch style={{ color: '#007bff', fontSize: '1.5rem' }} />
          Search Resources
        </h1>
        
        {/* Search Form */}
        <div className="card" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #e3e3e3', marginBottom: '20px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '15px', padding: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <label htmlFor="searchQuery" style={{ fontWeight: 500, marginBottom: '5px', display: 'block' }}>
                  Search for resources:
                </label>
                <input
                  type="text"
                  id="searchQuery"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter keywords (e.g., React, Python, JavaScript)"
                  style={{ fontSize: 16 }}
                />
              </div>
              <div style={{ minWidth: '150px' }}>
                <label htmlFor="category" style={{ fontWeight: 500, marginBottom: '5px', display: 'block' }}>
                  Category:
                </label>
                <select
                  id="category"
                  className="form-control"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ fontSize: 16 }}
                >
                  <option value="">All Categories</option>
                  <option value="languages">Languages</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="platforms">Coding Schools/Platforms</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                type="button" 
                onClick={clearSearch}
                className="btn btn-secondary"
                style={{ minWidth: 100 }}
              >
                Clear
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading || !searchQuery.trim()}
                style={{ minWidth: 120 }}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Category Quick Search */}
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px', fontSize: 18 }}>Quick Search by Category:</h3>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategorySearch(category.key)}
                className="btn btn-outline-primary"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  padding: '8px 16px',
                  fontSize: 14,
                  borderRadius: '20px',
                  border: '1px solid #007bff',
                  background: selectedCategory === category.key ? '#007bff' : 'transparent',
                  color: selectedCategory === category.key ? 'white' : '#007bff',
                  transition: 'all 0.2s ease'
                }}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div style={{ 
          background: '#f8d7da', 
          color: '#721c24', 
          padding: '12px', 
          borderRadius: '8px', 
          marginBottom: '20px',
          border: '1px solid #f5c6cb'
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div>
          <h3 style={{ color: '#2c3e50', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: 8 }}>
            Search Results ({searchResults.length})
            {selectedCategory && (
              <span style={{ 
                background: '#007bff', 
                color: 'white', 
                padding: '4px 8px', 
                borderRadius: '12px', 
                fontSize: 12,
                fontWeight: 500
              }}>
                {selectedCategory}
              </span>
            )}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
            {searchResults.map((result, index) => (
              <div 
                key={index} 
                className="search-result-item" 
                style={{ 
                  background: '#f8f9fa', 
                  borderRadius: 12, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', 
                  padding: 20, 
                  transition: 'all 0.3s ease', 
                  border: '1px solid #e3e3e3', 
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-4px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                  e.target.style.borderColor = '#007bff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  e.target.style.borderColor = '#e3e3e3';
                }}
              >
                {/* Technology Icon */}
                <div style={{ 
                  position: 'absolute', 
                  top: 12, 
                  left: 12, 
                  fontSize: '1.2rem',
                  background: 'white',
                  borderRadius: '50%',
                  padding: 4,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}>
                  {getTechnologyIcon(result.title)}
                </div>

                {/* Popularity Badge */}
                {getPopularityBadge(index) && (
                  <div style={{ 
                    position: 'absolute', 
                    top: 12, 
                    right: 12,
                    background: 'white',
                    borderRadius: '50%',
                    padding: 4,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {getPopularityBadge(index)}
                  </div>
                )}

                {/* External Link Icon */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: 12, 
                  right: 12,
                  fontSize: '1rem',
                  color: '#6c757d'
                }}>
                  <FaExternalLinkAlt />
                </div>

                <a 
                  href={result.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="result-title"
                  style={{ 
                    color: '#007bff', 
                    fontWeight: 600, 
                    fontSize: 16, 
                    textDecoration: 'none', 
                    marginBottom: 8, 
                    display: 'block',
                    lineHeight: 1.4,
                    paddingTop: 8,
                    paddingRight: 40
                  }}
                >
                  {result.title}
                </a>
                <p className="result-snippet" style={{ 
                  color: '#6c757d', 
                  fontSize: 14, 
                  margin: 0,
                  lineHeight: 1.5,
                  paddingBottom: 30
                }}>
                  {result.snippet}
                </p>

                {/* External Link Badge */}
                <div style={{ 
                  position: 'absolute', 
                  bottom: 12, 
                  left: 12, 
                  background: '#28a745', 
                  color: 'white', 
                  fontSize: '0.7rem', 
                  padding: '3px 8px', 
                  borderRadius: '12px',
                  fontWeight: 500
                }}>
                  External
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {searchResults.length === 0 && !loading && searchQuery && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px', color: '#6c757d' }}>🔍</div>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No results found</h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>
            Try adjusting your search terms or browse by category
          </p>
          <button 
            onClick={clearSearch}
            className="btn btn-primary"
            style={{ fontSize: 16 }}
          >
            Clear Search
          </button>
        </div>
      )}
    </div>
  );
};

export default Search; 