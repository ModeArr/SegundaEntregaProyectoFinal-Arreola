const { Router } = require("express")
const path = require("path");
const pathDB = path.join(`${__dirname}/../dao/products.json`)
const styles = path.join(`${__dirname}/../public/styles/styles.css`)
const DBProductManager = require("../dao/DBProductManager");
const products = new DBProductManager()
const DBMessagesManager = require("../dao/DBMessagesManager");
const messages = new DBMessagesManager()


const router = Router()

router.get('/', (req, res) => {

    const { page = 1, limit = 5, sort } = req.query;

    let query = {}

    if (req.query.status){
        query = { status: req.query.status }
    }

    if (req.query.category){
        query = { category: req.query.category.charAt(0).toUpperCase()
            + req.query.category.slice(1) }
    }

    products.getProducts(page, limit, sort, query).then(result => {
        console.log(result)
        res.render("index", {
            title: "Practica integracion proyecto final",
            products: result.payload,
            style: "styles.css"
        })
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
})

router.get('/realtimeproducts', (req, res) => {

    products.getProducts().then(result => {
        res.render("realtimeproducts", {
            title: "Practica integracion proyecto final - Productos en tiempo real",
            products: result
        })
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
})

router.get('/chat', (req, res) => {

    messages.getAllMessages().then(result => {
        res.render("chat", {
            title: "Practica integracion proyecto final - Chat en tiempo real",
            messages: result
        })
    }).catch(err => {
        console.log(err);
        res.status(400).json(err.message);
    });
})


module.exports = router