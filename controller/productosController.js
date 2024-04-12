const fs = require('fs');
const path = require('path');
const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));

const productosController = {
    list: (req,res) => {
        res.render('home',{productos})
    },

    create: (req,res) => {
        res.render('productos/creacionProd');
    },

    stock: (req,res) => {
        const {marca,modelo,precio} = req.body;
        const nuevoProduct = {
            id: productos.length + 1,
            marca,
            modelo,
            precio
        }
        productos.push(nuevoProduct);
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
        res.redirect('/');
    }, 

    editProd: (req, res) => {
		let id = req.params.id
		let editProductos = productos.find(producto => producto.id == id)
		res.render("productos/edicionProd", { editProductos })
    },

    update: (req, res) => {
        let id = req.params.id; // Obtener el ID del producto de los parámetros de la solicitud
        let editProductos = productos.find(producto => producto.id == id); // Encontrar el producto que se va a editar
    
        // Crear un objeto editado con los datos del formulario de edición
        let editProducto = {
            id: editProductos.id,
            marca: req.body.marca || editProductos.marca,
            modelo: req.body.modelo || editProductos.modelo,
            precio: req.body.precio || editProductos.precio,
        };
    
        // Mapear los productos existentes y reemplazar el producto editado
        let nuevoProducto = productos.map(producto => {
            if (producto.id === editProducto.id) {
                return { ...editProducto }; // Utilizar el objeto editProducto en lugar de editProductos
            }
            return producto;
        });
    
        // Escribir la lista actualizada de productos en el archivo JSON
        fs.writeFileSync(productosFilePath, JSON.stringify(nuevoProducto, null, ' '));
    
        // Redireccionar al usuario a la página de detalles del producto actualizado
        res.redirect("/productos/" + editProductos.id);
    }, 

    destroy: (req, res) => {
		let id = req.params.id  // Lo mismo que en todas los otros metodos lo primero que capturamos aca es el id
		let finalProductos = productos.filter(producto => producto.id != id) // Aqui lo que hacemos es filtrar los productos que no sean el id que nosotros queremos eliminar

  		fs.writeFileSync(productosFilePath, JSON.stringify(finalProductos, null, ' ')); // Aqui lo que hacemos es escribir el archivo de nuevo con los productos que no sean el id que nosotros queremos eliminar
		res.redirect('/products'); 
	}

}

module.exports = productosController;