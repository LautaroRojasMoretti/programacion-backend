import express from 'express';
import  ProductManager  from './ProductManager.js';

const productManager =  new ProductManager('../products.json');
const PORT = 8080;
const app = express();

app.get('/products', async (req, res) => {
    const products = await productManager.getProducts();
    res.send(products);
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const products = await productManager.getProductById(id);
    req.send(products);
})
app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);

});