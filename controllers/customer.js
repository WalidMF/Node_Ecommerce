const bcryptjs=require('bcryptjs');
const db = require('../utils/db');
const jwt = require('jsonwebtoken');
const { json } = require('express');

// get all Products -> home page
function getAllProducts(){
    return db.execute("SELECT * FROM products");
}

// add new user -> register
function addUser(user){
    var salt = bcryptjs.genSaltSync(10);
    var hashedPassword = bcryptjs.hashSync(user.password, salt);
    return db.execute('INSERT INTO users (name, email, password, type) VALUES (?, ?, ?, "customer")', [user.name, user.email, hashedPassword]);
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

// get Product by id -> search product by name
function getDataByName(name){
    return db.execute("SELECT * FROM products WHERE name LIKE ?", ["%"+name+"%"]);
}

// get Products by seller -> search product by seller name
function getDataBySeller(seller){
    return db.execute("SELECT * FROM products WHERE seller=?", [seller]);
}

// add new Order function -> make order
function addOrder(order){
    return db.execute("INSERT INTO orders (created_date, product_id, user_id) VALUE (?, ?, ?)", [order.created_date, order.product_id, order.user_id]);
}

// get all orders function -> view orders
function getAllOrders(user_id){
    return db.execute("SELECT * FROM orders WHERE user_id=?", [user_id]);
}

// get order by id function -> search order
function getOrderById(id, user_id){
    return db.execute("SELECT * FROM orders WHERE id=? AND user_id=?", [id, user_id]);
}
 
// delete order function ->remove order
function deleteOrder(id, user_id){
    return db.execute("DELETE FROM orders WHERE id=? AND user_id=?", [id, user_id]);
}

module.exports = {
    getAllProducts, 
    addUser, 
    getUser, 
    getUserById, 
    updateUser, 
    deleteUser, 
    getDataByName,
    getDataBySeller,
    addOrder,
    getAllOrders,
    getOrderById,
    deleteOrder
};