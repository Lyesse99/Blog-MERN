// imports
const router = require("express").Router();
const postController = require("../controllers/post.controller.js"); // import api functions

// general api
router.get("/", postController.allposts); // read all posts
router.post("/", postController.addpost); // add one new post

// specific api
router.get("/:id", postController.onepost); // read one post
router.get("/search/:query", postController.searchpost); // search a post

// export
module.exports = router;