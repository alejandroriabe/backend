const fs = require('fs');
const path = require('path');

class CartManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/carts.json');
        this.carts = this.loadCarts();
    }

    loadCarts() {
        if (fs.existsSync(this.filePath)) {
            const data = fs.readFileSync(this.filePath, 'utf-8');
            return JSON.parse(data);
        }
        return [];
    }

    saveCarts() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.carts, null, 2));
    }

    createCart() {
        const newId = Date.now().toString(); // Generar ID único
        const newCart = { id: newId, products: [] };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(cid) {
        return this.carts.find(cart => cart.id === cid);
    }

    addProductToCart(cid, productId) {
        const cart = this.getCartById(cid);
        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1; // Incrementar cantidad
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }
        this.saveCarts();
        return cart;
    }
}

module.exports = CartManager;