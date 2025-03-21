import express from "express";
import "./database.js"
import clientesRoutes from "./src/routes/client.js";
import empleadosRoutes from "./src/routes/employee.js";
import sucursalesRoutes from "./src/routes/branch.js";
import reviewsRoutes from "./src/routes/reviews.js"

const app = express();

// Middleware para parsear JSON
app.use(express.json());


// Rutas
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/sucursales", sucursalesRoutes);
app.use("/api/reviews", reviewsRoutes);

export default app;