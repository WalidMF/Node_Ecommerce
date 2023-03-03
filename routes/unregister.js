const express=require('express');
const router = express.Router();
const {getAllProducts}=require('../controllers/unregister');


// get All products -> home page
router.get("/", (req, res, next)=>{
    getAllProducts().then(([rows])=>{
        res.status(200).json(rows);
    }).catch((err)=>{
        res.status(500).json({massage: err.massage});
    });
});

module.exports = router;
