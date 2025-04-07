const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager();

// Obtener todos los productos
router.get('/', (req, res) => {
    const products = productManager.getAllProducts();
    res.json(products);
});

// Obtener producto por ID
router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Crear nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = productManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
});

// Actualizar producto
router.put('/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(req.params.pid, req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

// Eliminar producto
router.delete('/:pid', (req, res) => 
    const deletedProduct = productManager.deleteProduct(req.params.pid);
    if (deletedProduct) {
        res.json({ message: 'Producto eliminado' });
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    });

    module.exports = router;