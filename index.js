const express = require('express');
const app = express();

app.use(express.json());

// Datos simulados de clientes y productos
let clientes = [
    { id: 1, nombre: 'Cliente 1', edad: 30 },
    { id: 2, nombre: 'Cliente 2', edad: 25 },
    { id: 3, nombre: 'Cliente 3', edad: 35 }
];

let productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
];

// Ruta para la página principal
app.get('/', (req, res) => {
    res.send('Bienvenido a la página principal');
});

// Ruta para mostrar 3 clientes
app.get('/clientes', (req, res) => {
    res.json(clientes.slice(0, 3)); // Mostrar solo los primeros 3 clientes
});

// Ruta para mostrar 3 productos
app.get('/productos', (req, res) => {
    res.json(productos.slice(0, 3)); // Mostrar solo los primeros 3 productos
});

// Ruta para agregar un nuevo cliente
app.post('/clientes', (req, res) => {
    const nuevoCliente = req.body;
    clientes.push(nuevoCliente);
    res.status(201).json(nuevoCliente);
});

// Ruta para actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const clienteActualizado = req.body;
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        clientes[index] = { ...clientes[index], ...clienteActualizado };
        res.json(clientes[index]);
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
});

// Ruta para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = clientes.findIndex(cliente => cliente.id === id);
    if (index !== -1) {
        clientes.splice(index, 1);
        res.json({ mensaje: 'Cliente eliminado exitosamente' });
    } else {
        res.status(404).json({ mensaje: 'Cliente no encontrado' });
    }
});

// Ruta para agregar un nuevo producto
app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});

// Ruta para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoActualizado = req.body;
    const index = productos.findIndex(producto => producto.id === id);
    if (index !== -1) {
        productos[index] = { ...productos[index], ...productoActualizado };
        res.json(productos[index]);
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

// Ruta para eliminar un producto
app.delete('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = productos.findIndex(producto => producto.id === id);
    if (index !== -1) {
        productos.splice(index, 1);
        res.json({ mensaje: 'Producto eliminado exitosamente' });
    } else {
        res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
