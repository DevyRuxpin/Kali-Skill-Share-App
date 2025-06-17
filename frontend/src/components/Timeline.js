import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useAnalytics } from '../hooks/useAnalytics';

const getAvatar = (email) => {
  // Simple avatar using first letter of email
  return email ? email.charAt(0).toUpperCase() : '?';
};

// Helper function to convert livestream URLs to embed URLs
const getEmbedUrl = (url) => {
  if (!url) return null;
  
  // YouTube Live
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/')) {
    const videoId = url.includes('youtu.be/') 
      ? url.split('youtu.be/')[1].split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }
  
  // Twitch
  if (url.includes('twitch.tv/')) {
    const channel = url.split('twitch.tv/')[1]?.split('/')[0];
    return channel ? `https://player.twitch.tv/?channel=${channel}&parent=localhost` : null;
  }
  
  // Zoom (convert to iframe-friendly format)
  if (url.includes('zoom.us/j/')) {
    return url; // Zoom URLs work directly in iframes
  }
  
  // Google Meet
  if (url.includes('meet.google.com/')) {
    return url; // Google Meet URLs work directly in iframes
  }
  
  return null;
};

const Timeline = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newLivestreamUrl, setNewLivestreamUrl] = useState('');
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const { trackUserAction, trackFeatureUsage } = useAnalytics();

  useEffect(() => {
    fetchPosts();
    const newSocket = io('http://localhost:5001');
    setSocket(newSocket);
    newSocket.on('connect', () => {
      newSocket.emit('join-timeline');
    });
    newSocket.on('post-added', (post) => {
      setPosts(prevPosts => [post, ...prevPosts]);
    });
    newSocket.on('comment-added', (comment) => {
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === comment.post_id) {
            return {
              ...post,
              comments: [...(post.comments || []), comment]
            };
          }
          return post;
        })
      );
    });
    return () => {
      newSocket.close();
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/timeline/posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/timeline/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          content: newPost,
          livestream_url: newLivestreamUrl.trim() || null
        })
      });
      if (response.ok) {
        const post = await response.json();
        setNewPost('');
        setNewLivestreamUrl('');
        
        // Track post creation
        trackUserAction('Post Created', {
          hasLivestream: !!newLivestreamUrl.trim(),
          postLength: newPost.length,
          livestreamPlatform: newLivestreamUrl.includes('youtube') ? 'YouTube' : 
                             newLivestreamUrl.includes('twitch') ? 'Twitch' :
                             newLivestreamUrl.includes('zoom') ? 'Zoom' :
                             newLivestreamUrl.includes('meet.google') ? 'Google Meet' : null
        });
        
        if (socket) {
          socket.emit('new-post', post);
        }
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleSubmitComment = async (postId) => {
    const commentContent = newComment[postId];
    if (!commentContent || !commentContent.trim()) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/timeline/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content: commentContent })
      });
      if (response.ok) {
        const comment = await response.json();
        setNewComment(prev => ({ ...prev, [postId]: '' }));
        
        // Track comment creation
        trackUserAction('Comment Added', {
          commentLength: commentContent.length,
          postId: postId
        });
        
        if (socket) {
          socket.emit('new-comment', { ...comment, post_id: postId });
        }
      }
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  // Track livestream views
  const handleLivestreamView = (platform, url) => {
    trackFeatureUsage('Livestream Viewed', {
      platform: platform,
      url: url
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Loading timeline...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>Timeline</h1>
        <div className="card" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.07)', border: '1px solid #e3e3e3' }}>
          <form onSubmit={handleSubmitPost} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="form-group">
              <label htmlFor="newPost" style={{ fontWeight: 500 }}>Share your thoughts:</label>
              <textarea
                id="newPost"
                className="form-control"
                rows="3"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind about web development?"
                required
                style={{ resize: 'vertical', minHeight: 60 }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="livestreamUrl" style={{ fontWeight: 500, color: '#6c757d' }}>
                🎥 Livestream URL (optional):
              </label>
              <input
                type="url"
                id="livestreamUrl"
                className="form-control"
                value={newLivestreamUrl}
                onChange={(e) => setNewLivestreamUrl(e.target.value)}
                placeholder="YouTube Live, Twitch, Zoom, or Google Meet URL"
                style={{ fontSize: 14 }}
              />
              <small style={{ color: '#6c757d', fontSize: 12 }}>
                Supported: YouTube Live, Twitch, Zoom, Google Meet
              </small>
            </div>
            <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end', minWidth: 120 }}>
              Post
            </button>
          </form>
        </div>
      </div>
      <div>
        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <h3 style={{ color: '#6c757d' }}>No posts yet</h3>
            <p>Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="timeline-post" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e3e3e3' }}>
              <div style={{ minWidth: 48, minHeight: 48, background: '#007bff22', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 22, color: '#007bff', marginTop: 6 }}>
                {getAvatar(post.author_email)}
              </div>
              <div style={{ flex: 1 }}>
                <div className="post-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span className="post-author" style={{ fontWeight: 600, color: '#2c3e50' }}>{post.author_email}</span>
                  <span className="post-date" style={{ color: '#6c757d', fontSize: '0.95rem' }}>{formatDate(post.created_at)}</span>
                </div>
                <div className="post-content" style={{ marginBottom: 10, lineHeight: 1.7, fontSize: 17 }}>
                  {post.content}
                </div>
                {post.livestream_url && (
                  <div className="livestream-section" style={{ marginBottom: 15 }}>
                    <div style={{ 
                      background: '#f8f9fa', 
                      border: '1px solid #e3e3e3', 
                      borderRadius: 8, 
                      padding: 12,
                      marginBottom: 10
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 8, 
                        marginBottom: 8,
                        color: '#dc3545',
                        fontWeight: 600,
                        fontSize: 14
                      }}>
                        🎥 <span>Live Stream</span>
                      </div>
                      <iframe
                        src={getEmbedUrl(post.livestream_url)}
                        width="100%"
                        height="315"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Livestream"
                        style={{ borderRadius: 4 }}
                      />
                    </div>
                  </div>
                )}
                <div className="comments-section" style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #f0f0f0' }}>
                  <h4 style={{ marginBottom: 10, color: '#2c3e50', fontSize: 17, fontWeight: 500 }}>
                    Comments ({post.comments ? post.comments.length : 0})
                  </h4>
                  {post.comments && post.comments.map((comment) => (
                    <div key={comment.id} className="comment" style={{ background: '#f8f9fa', padding: 10, marginBottom: 8, borderRadius: 5, display: 'flex', gap: 10 }}>
                      <div style={{ minWidth: 32, minHeight: 32, background: '#007bff11', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 15, color: '#007bff' }}>
                        {getAvatar(comment.author_email)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                          <strong style={{ color: '#2c3e50', fontSize: 15 }}>{comment.author_email}</strong>
                          <small style={{ color: '#6c757d' }}>{formatDate(comment.created_at)}</small>
                        </div>
                        <p style={{ margin: 0, fontSize: 15 }}>{comment.content}</p>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                    <textarea
                      className="form-control"
                      rows="2"
                      placeholder="Add a comment..."
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                      style={{ flex: 1, minHeight: 36, resize: 'vertical' }}
                    />
                    <button 
                      onClick={() => handleSubmitComment(post.id)}
                      className="btn btn-secondary"
                      style={{ minWidth: 100 }}
                      disabled={!newComment[post.id] || !newComment[post.id].trim()}
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Timeline; 