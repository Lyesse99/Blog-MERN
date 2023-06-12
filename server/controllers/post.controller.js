// imports
const postModel = require("../models/post.model"); // database collection containing all posts
const ObjectID = require("mongoose").Types.ObjectId; // verify ID is a true MongoDB ID

// fetch every post
module.exports.allposts = (req, res) => {
  postModel
    .find()
    .sort({ createdAt: -1 }) // sort by created time
    .then((docs) => {
      return res.status(200).send(docs); // return JSON with all posts found
    })
    .catch((err) => {
      return res.status(400).send("Error to get data : " + err); // no post could be fetched
    });
};

// fetch one specific post
module.exports.onepost = async (req, res) => {
  // check id is valid
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id); // id in url params is not valid

  try {
    const post = await postModel.findById(req.params.id); // return JSON with the post matching the id
    if (!post) throw Error('No post with this id found');
    return res.status(200).json(post);
  } catch (err) {
    return res.status(400).send("Error to get data : " + err); // no matching post
  }
};


// search a post
module.exports.searchpost = async (req, res) => {
  try {
    const docs = await postModel.find({
      title: { $regex: req.params.query, $options: "i" }
    });

    // If the query was successful, return the posts found
    res.status(200).send(docs);
  } catch (err) {
    // If an error occurred during the query, send back an error message
    res.status(404).send("Error to get data : " + err);
  }
};



// add one post to db
module.exports.addpost = async (req, res) => {
  const newpost = new postModel({
    // create a new post with schema fields
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    content: req.body.content,
  });

  try {
    const post = await newpost.save(); // add the new post to the database
    return res.status(201).json(post); // return the created post
  } catch (err) {
    return res.status(400).json(err); // post could not be created
  }
};
