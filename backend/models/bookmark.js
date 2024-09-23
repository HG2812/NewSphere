const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  articleId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
});

const Bookmark = mongoose.model("Bookmark", bookmarkSchema, "Bookmarks");

module.exports = Bookmark;
