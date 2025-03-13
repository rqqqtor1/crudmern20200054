import Employee from "../models/Employee.js";

// Funciones del controlador
const getEmpleados = async (req, res) => {
  try {
    const empleados = await Employee.find();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertEmpleado = async (req, res) => {
  try {
    const empleado = new Employee(req.body);
    await empleado.save();
    res.status(201).json(empleado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateEmpleado = async (req, res) => {
  try {
    const empleado = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.json(empleado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    const empleado = await Employee.findByIdAndDelete(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" });
    }
    res.json({ message: "Empleado eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exportación por defecto
export default {
  getEmpleados,
  insertEmpleado,
  updateEmpleado,
  deleteEmpleado,
};