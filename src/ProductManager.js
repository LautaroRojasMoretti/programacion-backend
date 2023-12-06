class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async getLength() {
        const products = await this.getProducts();
        return products.length;
    }
    static id = 0;
    async addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            return console.error("Todos los campos son obligatorios.");
        }
        ProductManager.id++;
        const products = await this.getProducts();
        const newProduct = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            id: (await this.getLength()) + 1
        }
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products), 'utf-8')
        console.log("Producto agregado correctamente.");
    }
    async getProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            console.error(error);
            return [];
        }
    }
    async getProductById(id) {
        const products = await this.getProducts();
        const product = products.find(p => p.id === id)
        if (!product) {
            console.error("Producto no encontrado.");
        }
    }
    async updateProduct(id, productToUpdate) {
        const products = await this.getProducts();
        const updatedProduct = products.map(product => {
            if (product.id === id) {
                return {
                    ...product,
                    ...productToUpdate,
                    id
                }
            }
            return product;
        });
        await fs.promises.writeFile(this.path, JSON.stringify(updatedProduct), 'utf-8')
    }
    async deleteProduct(id) {
        const products = await this.getProducts();
        const productsDeleted = products.filter(product => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(productsDeleted), 'utf-8')
    }
}

export default ProductManager;

const test = async () => {
    const productManager = new ProductManager('./products.json');
    // await productManager.addProduct({
    //     title: 'Teclado trust gtx',
    //     description: 'Teclado semimecanico',
    //     price: 25000,
    //     thumbnail: './Trust.jpg',
    //     code: 1111,
    //     stock: 5,
    // })
        // await productManager.addProduct({
        //     title: 'Teclado VSG 2.0',
        //     description: 'Teclado semimecanico',
        //     price: 22000,
        //     thumbnail: './VSG.jpg',
        //     code: 1155,
        //     stock: 5,
        // });
        //     await productManager.addProduct({
        //         title: 'Mouse trust gtx',
        //         description: 'Mouse gamer 6 botones',
        //         price: 10000,
        //         thumbnail: './Mouse.jpg',
        //         code: 1122,
        //         stock: 10,
        //     });
        //     await productManager.addProduct({
        //         title: 'Mousepad trust gtx',
        //         description: 'Mousepad 20x80cm',
        //         price: 8500,
        //         thumbnail: './Pad.jpg',
        //         code: 1133,
        //         stock: 10,
        //     })
        // 
        const product2 = await productManager.getProductById(2);
        console.log(product2);
        await productManager.updateProduct(3, {
            price: 34000
        })
    await productManager.deleteProduct(1);
    }
test();