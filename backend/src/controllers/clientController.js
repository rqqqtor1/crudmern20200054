import Client from "../models/Client.js";

// Funciones del controlador
const getClientes = async (req, res) => {
  try {
    const clientes = await Client.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const insertCliente = async (req, res) => {
  try {
    const cliente = new Client(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateCliente = async (req, res) => {
  try {
    const cliente = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteCliente = async (req, res) => {
  try {
    const cliente = await Client.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    res.json({ message: "Cliente eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exportación por defecto
export default {
  getClientes,
  insertCliente,
  updateCliente,
  deleteCliente,
};