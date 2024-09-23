const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');
const {jwtAuthMiddleware} = require('../Authentication/jwt'); 

router.post('/save', jwtAuthMiddleware, async (req, res) => {
  
  try {
  const { articleId, title, url } = req.body;
  const userId = req.user._id;

  const newBookmark = new Bookmark({ userId, articleId, title, url });

    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add bookmark' });
  }
});

router.delete('/bookmarks/:id', jwtAuthMiddleware, async (req, res) => {
  const bookmarkId = req.params.id;
  const userId = req.user._id;

  try {
    const deletedBookmark = await Bookmark.findOneAndDelete({ _id: bookmarkId, userId });
    if (!deletedBookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }
    res.status(200).json(deletedBookmark);
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove bookmark' });
  }
});

router.get('/all-bookmarks', jwtAuthMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const bookmarks = await Bookmark.find({ userId }).sort({ savedAt: -1 });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bookmarks' });
  }
});

module.exports = router;
