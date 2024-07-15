const Blog = require('../models/Blog');

exports.addBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      user: req.user.id,
    });

    const blog = await newBlog.save();
    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content } = req.body;

  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ msg: 'Blog not found' });

    if (blog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: { title, content } },
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
