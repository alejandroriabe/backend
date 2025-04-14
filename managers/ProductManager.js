const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/products.json');
        this.products = this.loadProducts();
    }

    loadProducts() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    saveProducts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.products, null, 2));
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(pid) {
        return this.products.find(product => product.id === pid);
    }

    addProduct(product) {
        const newId = Date.now().toString(); // Generar ID único
        const newProduct = { id: newId, ...product };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(pid, updatedFields) {
        const index = this.products.findIndex(product => product.id === pid);
        if (index === -1) return null;

        this.products[index] = { ...this.products[index], ...updatedFields };
        this.saveProducts();
        return this.products[index];
    }

    deleteProduct(pid) {
        const index = this.products.findIndex(product => product.id === pid);
        if (index === -1) return null;

        const deletedProduct = this.products.splice(index, 1);
        this.saveProducts();
        return deletedProduct;
    }
}

module.exports = ProductManager;
