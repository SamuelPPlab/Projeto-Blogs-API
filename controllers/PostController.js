const { Router } = require('express');
const Post = require('../service/Post');
const { TokenValidation } = require('../auth/TokenValidation');

const router = Router();

router.post('/', TokenValidation, async (req, res) => {
  try {
    const { id } = req.tokenUser;
    const { title, content } = req.body;
    const response = await Post.createPost({ title, content, userId: id });
    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(201).json(response);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
