const bcryptjs=require('bcryptjs');
const db = require('../utils/db');
const jsonwebtoken = require('jsonwebtoken');
const { json } = require('express');

// get all Products -> home page
function getAllProducts(){
    return db.execute("SELECT * FROM products");
}

// add new user -> register
function addUser(user){
    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(user.password, salt);
    return db.execute('INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, "seller")', [user.name, user.email, hashedPassword]);
}

// get user -> login
function getUser(email){
    return db.execute("SELECT * FROM users WHERE email = ?", [email]);
}

// get user by id -> view profile page
function getUserById(id){
    return db.execute("SELECT id, name, email, type FROM users WHERE id=?", [id]);
}

// update user by id -> edit profile info
function updateUser(id, user){
    return db.execute("UPDATE users SET name=?, email=? WHERE id=?", [user.name, user.email, id]);
}

// delete user by id -> remove account
function deleteUser(id){
    return db.execute("DELETE FROM users WHERE id=?", [id]);
}

// get Products by seller -> view products
function getDataBySeller(seller){
    return db.execute("SELECT * FROM products WHERE seller=?", [seller]);
}

// add new Product -> create new product
function addProduct(product){
    return db.execute("INSERT INTO products (name, description, photo, creation_date, seller) VALUE (?,?,?,?,?)", [product.name, product.description, product.photo, product.creation_date, product.seller]);
}

// get products by id -> view product details
function getProductById(id, seller){
    return db.execute("SELECT * FROM products WHERE id=? AND seller=?", [id, seller]);
}

// update product -> edit product
function updateProduct(id, product){
    return db.execute("UPDATE products SET name=?, description=?, photo=? WHERE id=? AND seller=?", [product.name, product.description, product.photo, id, product.seller]);
}

// delete product -> remove product
function deleteProduct(id, seller){
    return db.execute("DELETE FROM products WHERE id=? AND seller=?", [id, seller]);
}



module.exports = {
    getAllProducts, 
    addUser, 
    getUser, 
    getUserById, 
    updateUser, 
    deleteUser, 
    getDataBySeller,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
};