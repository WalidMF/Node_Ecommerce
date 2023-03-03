const db = require('../utils/db');

// get all Products -> home page
function getAllProducts(){
    return db.execute("SELECT * FROM products");
}


module.exports = {getAllProducts};