import Sucursal from "../models/Sucursales.js";

// Funciones del controlador
const getSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find(); // Busca todas las sucursales en la base de datos
    res.json(sucursales); // Devuelve las sucursales en formato JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Manejo de errores
  }
};

// Crear una nueva sucursal
const insertSucursal = async (req, res) => {
  try {
    const sucursal = new Sucursal(req.body); // Crea una nueva instancia de Sucursal con los datos del body
    await sucursal.save(); // Guarda la sucursal en la base de datos
    res.status(201).json(sucursal); // Devuelve la sucursal creada con código 201 (Created)
  } catch (err) {
    res.status(400).json({ error: err.message }); // Manejo de errores
  }
};

// Actualizar una sucursal por ID
const updateSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findByIdAndUpdate(
      req.params.id, // ID de la sucursal a actualizar
      req.body, // Nuevos datos para actualizar
      { new: true } // Devuelve la sucursal actualizada
    );

    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no encontrada" }); // Si no se encuentra la sucursal, devuelve un error 404
    }

    res.json(sucursal); // Devuelve la sucursal actualizada
  } catch (err) {
    res.status(400).json({ error: err.message }); // Manejo de errores
  }
};

// Eliminar una sucursal por ID
const deleteSucursal = async (req, res) => {
  try {
    const sucursal = await Sucursal.findByIdAndDelete(req.params.id); // Busca y elimina la sucursal por ID

    if (!sucursal) {
      return res.status(404).json({ error: "Sucursal no encontrada" }); // Si no se encuentra la sucursal, devuelve un error 404
    }

    res.json({ message: "Sucursal eliminada correctamente" }); // Devuelve un mensaje de éxito
  } catch (err) {
    res.status(500).json({ error: err.message }); // Manejo de errores
  }
};

// Exportación por defecto
export default {
  getSucursales,
  insertSucursal,
  updateSucursal,
  deleteSucursal,
};