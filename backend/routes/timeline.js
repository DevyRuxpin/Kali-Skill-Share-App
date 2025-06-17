const express = require('express');
const jwt = require('jsonwebtoken');
const { pool } = require('../database/db');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get all posts with comments
router.get('/posts', authenticateToken, async (req, res) => {
  try {
    const postsQuery = `
      SELECT 
        p.id, 
        p.content, 
        p.livestream_url,
        p.created_at,
        u.email as author_email
      FROM posts p
      JOIN users u ON p.user_id = u.id
      ORDER BY p.created_at DESC
    `;
    
    const posts = await pool.query(postsQuery);
    
    // Get comments for each post
    const postsWithComments = await Promise.all(
      posts.rows.map(async (post) => {
        const commentsQuery = `
          SELECT 
            c.id, 
            c.content, 
            c.created_at,
            u.email as author_email
          FROM comments c
          JOIN users u ON c.user_id = u.id
          WHERE c.post_id = $1
          ORDER BY c.created_at ASC
        `;
        
        const comments = await pool.query(commentsQuery, [post.id]);
        
        return {
          ...post,
          comments: comments.rows
        };
      })
    );

    res.json(postsWithComments);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new post
router.post('/posts', authenticateToken, async (req, res) => {
  try {
    const { content, livestream_url } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Post content is required' });
    }

    // Validate livestream URL if provided
    if (livestream_url && livestream_url.trim().length > 0) {
      const url = livestream_url.trim();
      
      // Check if it's a valid livestream URL from supported platforms
      const supportedPlatforms = [
        'youtube.com/watch',
        'youtube.com/live',
        'youtu.be/',
        'twitch.tv/',
        'zoom.us/j/',
        'meet.google.com/'
      ];
      
      const isValidLivestreamUrl = supportedPlatforms.some(platform => 
        url.includes(platform)
      );
      
      if (!isValidLivestreamUrl) {
        return res.status(400).json({ 
          error: 'Invalid livestream URL. Supported platforms: YouTube, Twitch, Zoom, Google Meet' 
        });
      }
    }

    const newPost = await pool.query(
      'INSERT INTO posts (user_id, content, livestream_url) VALUES ($1, $2, $3) RETURNING id, content, livestream_url, created_at',
      [req.user.id, content.trim(), livestream_url ? livestream_url.trim() : null]
    );

    // Get the user email for the response
    const user = await pool.query('SELECT email FROM users WHERE id = $1', [req.user.id]);

    const postWithAuthor = {
      ...newPost.rows[0],
      author_email: user.rows[0].email,
      comments: []
    };

    res.status(201).json(postWithAuthor);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a comment to a post
router.post('/posts/:postId/comments', authenticateToken, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ error: 'Comment content is required' });
    }

    // Check if post exists
    const postExists = await pool.query('SELECT id FROM posts WHERE id = $1', [postId]);
    if (postExists.rows.length === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = await pool.query(
      'INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING id, content, created_at',
      [postId, req.user.id, content.trim()]
    );

    // Get the user email for the response
    const user = await pool.query('SELECT email FROM users WHERE id = $1', [req.user.id]);

    const commentWithAuthor = {
      ...newComment.rows[0],
      author_email: user.rows[0].email
    };

    res.status(201).json(commentWithAuthor);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 