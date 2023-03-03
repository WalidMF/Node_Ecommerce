const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {checkToken} = require("../auth/token_validation")
const router = express.Router();
const { getAllProducts, addUser, getUser, getUserById, updateUser, deleteUser, getDataByName, getDataBySeller, addOrder, getAllOrders, getOrderById, deleteOrder } = require('../controllers/customer');

// get All products -> home page
router.get("/", (req, res, next) => {
    getAllProducts().then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ error: err  });
    });
});

// add new user -> register
router.post("/register", (req, res, next) => {
    var user = req.body;
    addUser(user).then(([rows]) => {
        res.status(200).json({message: "Success register"});
    }).catch((err) => {
        res.status(422).json({ error: err });
    });
});

// get user -> login
router.post("/login", (req, res, next) => {

    const { email, password } = req.body;

    //Check if the user exists in the database
    getUser(email).then(result => {
        if (result[0].length === 0) {
            res.status(404).json({ message: 'User not found' });
        } else {
            const user = result[0][0];

            const isPasswordMatch = bcryptjs.compareSync(password, user.password);

            if(isPasswordMatch){
                const payload = {email: user.email };
                const token = jwt.sign(payload, 'secretkeyWMF', { expiresIn: '1h' });
                res.status(200).json({message: "Success login", token: token });
            } else {
                res.status(401).json({ message: 'Invalid email or password' });
            }
        }
    })
    .catch(err => {
        res.status(500).json({ error: err });
    });
});

// get user by id -> view profile
router.get("/profile/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    getUserById(id).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ error: err  });
    });
});

// update user by id -> edit profile info
router.put("/profile/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    var user = req.body;
    updateUser(id, user).then(([rows]) => {
        res.status(200).json({message: "Success Update"});
    }).catch((err) => {
        res.status(422).json({ massage: err.massage });
    });
});


// delete user by id -> remove account
router.delete("/profile/:id",checkToken, (req, res, next) => {
    var { id } = req.params;
    deleteUser(id).then(([rows]) => {
        res.status(200).json({message: "Success Delete"});
    }).catch((err) => {
        res.status(422).json({ massage: err.massage });
    });
});



// get products by name -> search product by name
router.get("/search/products/:name", checkToken, (req, res, next) => {
    var { name } = req.params;
    getDataByName(name).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});


// get products by seller -> search product by seller name
router.get("/search/sellers/:seller", checkToken, (req, res, next) => {
    var { seller } = req.params;
    getDataBySeller(seller).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});


// add new order -> make order
router.post("/order/", checkToken, (req, res, next) => {
    var order = req.body;
    addOrder(order).then(([rows]) => {
        res.status(200).json({message: "Success Create Order"});
    }).catch((err) => {
        res.status(422).json({ massage: err.massage });
    });
});


// get All orders -> view orders
router.get("/order/", checkToken, (req, res, next) => {
    var { user_id } = req.body;
    getAllOrders(user_id).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});


// get order by id -> view order details
router.get("/order/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    var { user_id } = req.body;
    getOrderById(id, user_id).then(([rows]) => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json({ massage: err.massage });
    });
});


// delete order -> remove order
router.delete("/order/:id", checkToken, (req, res, next) => {
    var { id } = req.params;
    var { user_id } = req.body;
    deleteOrder(id, user_id).then(([rows]) => {
        res.status(200).json({message: "Success Delete Order"});
    }).catch((err) => {
        res.status(422).json({ massage: err.massage });
    });
});


module.exports = router;