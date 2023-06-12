const mongoose = require("mongoose"); // import mongoose for schema creationconst mongoose = require("mongoose"); // import mongoose for schema creation

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // mandatory to create a post
      unique: true, // differentiate posts
      maxlength: 200,
    },
    author: {
      type: String,
      maxlength: 200,
    },
    category: {
      type: String,
      maxlength: 50,
    },
    content: {
      type: String,
      maxlength: 20000,
    },
  },
  { timestamps: true } // create timestamp automatically for each post
);

module.exports = mongoose.model("post", postSchema); // create "posts" collection