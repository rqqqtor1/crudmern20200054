import express from "express";
import sucursalesController from "../controllers/branchController.js"; // Importación por defecto

const router = express.Router();

// Ruta para obtener todas las sucursales y crear una nueva sucursal
router.route("/")
  .get(sucursalesController.getSucursales)       // Obtener todas las sucursales
  .post(sucursalesController.insertSucursal);  // Crear una nueva sucursal

// Ruta para actualizar y eliminar una sucursal por ID
router.route("/:id")
  .put(sucursalesController.updateSucursal)    // Actualizar una sucursal
  .delete(sucursalesController.deleteSucursal); // Eliminar una sucursal

export default router;