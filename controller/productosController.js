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
		let id = req.params.id //El id que nos requiere por la url el usuario
		let editProductos = productos.find(producto => producto.id == id) //El producto que se va a editar
        let editProducto = {
            id: editProductos.id,
            ...req.body,
            marca: req.body.marca || editProductos.marca,
            modelo: req.body.modelo || editProductos.modelo,
            precio: req.body.precio || editProductos.precio,
        }

		let nuevoProducto = productos.map(producto => {   // El metodo map nos devuelve un array modificado, lo que quiere decir esto es que 
													  //Nuestro array de productos se modifica completo con el nuevo producto editado
			if (producto.id === editProduct.id) {
				return producto = { ...editProductos };  // Metodo spread operator nos devuelve todo el objeto
			}
			    return producto;
		})
		fs.writeFileSync(productosFilePath, JSON.stringify(nuevoProducto, null, ' '));
		res.redirect("/" + editProductos.id)
	},

    destroy: (req, res) => {
		let id = req.params.id  // Lo mismo que en todas los otros metodos lo primero que capturamos aca es el id
		let finalProductos = productos.filter(producto => producto.id != id) // Aqui lo que hacemos es filtrar los productos que no sean el id que nosotros queremos eliminar

  		fs.writeFileSync(productosFilePath, JSON.stringify(finalProductos, null, ' ')); // Aqui lo que hacemos es escribir el archivo de nuevo con los productos que no sean el id que nosotros queremos eliminar
		res.redirect('/products'); 
	}

}

module.exports = productosController;