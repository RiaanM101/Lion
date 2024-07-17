const Product = require('../models/Product');

exports.addProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      user: req.user.id,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    let product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });

    if (product.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: { name, description, price } },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
