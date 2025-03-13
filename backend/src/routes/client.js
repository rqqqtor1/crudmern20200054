import express from "express";
import clientesController from "../controllers/clientController.js";

const router = express.Router();

// Ruta para obtener todos los clientes y crear un nuevo cliente
router.route("/")
  .get(clientesController.getClientes)       // Obtener todos los clientes
  .post(clientesController.insertCliente);  // Crear un nuevo cliente

// Ruta para actualizar y eliminar un cliente por ID
router.route("/:id")
  .put(clientesController.updateCliente)    // Actualizar un cliente
  .delete(clientesController.deleteCliente); // Eliminar un cliente

export default router;