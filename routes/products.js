const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager();


router.get('/', (req, res) => {
    const products = productManager.getAllProducts();
    res.json(products);
});


router.get('/:pid', (req, res) => {
    const product = productManager.getProductById(req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


router.post('/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = productManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
});


router.put('/:pid', (req, res) => {
    const updatedProduct = productManager.updateProduct(req.params.pid, req.body);
    if (updatedProduct) {
        res.json(updatedProduct);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});


