const router = require("express").Router();
const productoController = require("../controller/productosController");

router.get('/',productoController.list);

router.get('/create',productoController.create);
router.post('/create',productoController.stock);

router.get('/productos/:id/edit', productoController.editProd)
router.patch('/productos/:id', productoController.update);

router.delete('/:id', productoController.destroy)

module.exports = router;