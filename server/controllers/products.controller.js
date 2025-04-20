const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const validateProductInput = ({ name, price, imageUrl }) => {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return 'Invalid or missing product name';
  }
  if (price === undefined || typeof price !== 'number' || price <= 0) {
    return 'Invalid or missing product price';
  }
  if (!imageUrl || typeof imageUrl !== 'string') {
    return 'Invalid or missing product image URL';
  }
  return null;
};


exports.addProducts = async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const validationError = validateProductInput({ name, price, imageUrl });
    if (validationError) return res.status(400).json({ error: validationError });
    const product = await prisma.product.create({
      data: { name, price, imageUrl },
    });

    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    console.error('Add Product Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getProducts = async (_req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    console.error('Get Products Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, imageUrl } = req.body;

    if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'Invalid product ID' });

    const validationError = validateProductInput({ name, price, imageUrl });
    if (validationError) return res.status(400).json({ error: validationError });

    const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ error: 'Product not found' });

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price, imageUrl },
    });

    res.status(200).json({ message: 'Product updated', product: updated });
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteProducts = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) return res.status(400).json({ error: 'Invalid product ID' });

    const existing = await prisma.product.findUnique({ where: { id: Number(id) } });
    if (!existing) return res.status(404).json({ error: 'Product not found' });

    await prisma.product.delete({ where: { id: Number(id) } });

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete Product Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
