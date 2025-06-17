import React, { useState, useEffect } from 'react';
import { 
  FaYoutube, FaTwitch, FaGoogle, 
  FaJs, FaPython, FaJava, FaPhp, FaSwift,
  FaReact, FaVuejs, FaAngular, FaHtml5, FaCss3Alt, FaBootstrap, FaSass,
  FaNodeJs, FaServer, FaLaravel,
  FaGraduationCap, FaBook, FaChalkboardTeacher,
  FaExternalLinkAlt, FaStar, FaFire, FaRocket, FaCode
} from 'react-icons/fa';
import { SiTypescript, SiKotlin, SiWebpack, SiNextdotjs, SiTailwindcss, SiDjango, SiFlask, SiSpringboot, SiFastapi, SiDotnet, SiCoursera, SiEdx, SiUdemy, SiFreecodecamp, SiCodecademy, SiMdnwebdocs } from 'react-icons/si';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Icon mapping for different platforms and categories
  const getPlatformIcon = (url) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return <FaYoutube style={{ color: '#FF0000' }} />;
    if (url.includes('twitch.tv')) return <FaTwitch style={{ color: '#9146FF' }} />;
    if (url.includes('zoom.us') || url.includes('meet.google.com')) return <FaGoogle style={{ color: '#4285F4' }} />;
    return <FaExternalLinkAlt style={{ color: '#6c757d' }} />;
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Languages': <FaCode style={{ color: '#007bff' }} />,
      'Frontend': <FaReact style={{ color: '#61DAFB' }} />,
      'Backend': <FaServer style={{ color: '#28a745' }} />,
      'Coding Schools/Platforms': <FaGraduationCap style={{ color: '#ffc107' }} />
    };
    return iconMap[category] || <FaBook style={{ color: '#6c757d' }} />;
  };

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
    
    // Platforms
    if (titleLower.includes('coursera')) return <SiCoursera style={{ color: '#0056D2' }} />;
    if (titleLower.includes('edx')) return <SiEdx style={{ color: '#02262B' }} />;
    if (titleLower.includes('udemy')) return <SiUdemy style={{ color: '#EC5252' }} />;
    if (titleLower.includes('freecodecamp')) return <SiFreecodecamp style={{ color: '#0A0A23' }} />;
    if (titleLower.includes('codecademy')) return <SiCodecademy style={{ color: '#1F4056' }} />;
    if (titleLower.includes('mdn')) return <SiMdnwebdocs style={{ color: '#000000' }} />;
    
    return <FaBook style={{ color: '#6c757d' }} />;
  };

  const getPopularityBadge = (index) => {
    if (index < 3) return <FaFire style={{ color: '#FF6B35', fontSize: '0.8rem' }} />;
    if (index < 8) return <FaStar style={{ color: '#FFD700', fontSize: '0.8rem' }} />;
    if (index < 15) return <FaRocket style={{ color: '#007bff', fontSize: '0.8rem' }} />;
    return null;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/search/categories', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.categories);
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message || 'Failed to load educational resources');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '1.2rem', color: '#6c757d', marginBottom: '10px' }}>
            📚 Loading educational resources...
          </div>
          <div style={{ color: '#6c757d' }}>
            This may take a few seconds
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '15px' }}>⚠️</div>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>Error Loading Resources</h3>
          <p style={{ color: '#6c757d', marginBottom: '20px' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
            style={{ fontSize: 16 }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px', fontWeight: 700, fontSize: 36 }}>
          Welcome to Kali Skill Share
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#6c757d', marginBottom: 0 }}>
          Discover the best web development resources organized by skill categories
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
        {categories.map((category) => (
          <section key={category.key} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.06)', padding: 28, border: '1px solid #e3e3e3' }}>
            <h2 style={{ 
              color: '#007bff', 
              borderBottom: '2px solid #007bff22', 
              paddingBottom: 10, 
              marginBottom: 20, 
              fontWeight: 600, 
              fontSize: 26, 
              letterSpacing: 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: 12
            }}>
              {getCategoryIcon(category.name)}
              {category.name}
            </h2>
            
            <div className="search-results" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18 }}>
              {results[category.key] && results[category.key].slice(0, 25).map((result, index) => (
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

                  {/* Platform Icon */}
                  <div style={{ 
                    position: 'absolute', 
                    bottom: 12, 
                    right: 12,
                    fontSize: '1rem'
                  }}>
                    {getPlatformIcon(result.link)}
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
          </section>
        ))}
      </div>

      <div style={{ background: '#e9ecef', padding: '28px', borderRadius: '12px', marginTop: '40px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '10px', fontWeight: 600, fontSize: 22 }}>
          Ready to share your knowledge?
        </h3>
        <p style={{ color: '#6c757d', marginBottom: '15px', fontSize: 16 }}>
          Join the conversation in our Timeline and connect with other developers
        </p>
        <a 
          href="/timeline" 
          className="btn btn-primary"
          style={{ textDecoration: 'none', minWidth: 160, fontSize: 17 }}
        >
          Go to Timeline
        </a>
      </div>
    </div>
  );
};

export default Home; 