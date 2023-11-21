class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return;
        }

        // No se repite el campo "code"...
        const codeExists = this.products.some(product => product.code === code);
        if (codeExists) {
            console.log("El código del producto ya existe.");
            return;
        }

        // Nuevo producto
        const newProduct = {
            id: this.products.length + 1, // Se suma autom el id
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.products.push(newProduct);
        console.log("Producto agregado correctamente.");
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado.");
        }
    }
}

//Uso
const manager = new ProductManager();
manager.addProduct({
    title: "Producto 1",
    description: "Descripción 1",
    price: 20,
    thumbnail: "imagen1.jpg",
    code: "P001",
    stock: 50
});
manager.addProduct({
    title: "Producto 2",
    description: "Descripción 2",
    price: 30,
    thumbnail: "imagen2.jpg",
    code: "P002",
    stock: 30
});

console.log(manager.getProducts()); // Todos los productos
console.log(manager.getProductById(2)); // Obtiene via id
console.log(manager.getProductById(5)); // Prodcuto no encontrado
