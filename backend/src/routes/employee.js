import express from "express";
import empleadosController from "../controllers/employeeController.js"; 

const router = express.Router();

// Ruta para obtener todos los empleados y crear un nuevo empleado
router.route("/")
  .get(empleadosController.getEmpleados)       // Obtener todos los empleados
  .post(empleadosController.insertEmpleado);  // Crear un nuevo empleado

// Ruta para actualizar y eliminar un empleado por ID
router.route("/:id")
  .put(empleadosController.updateEmpleado)    // Actualizar un empleado
  .delete(empleadosController.deleteEmpleado); // Eliminar un empleado

export default router;