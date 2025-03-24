import express from "express";
import "./database.js"
import clientesRoutes from "./src/routes/client.js";
import empleadosRoutes from "./src/routes/employee.js";
import sucursalesRoutes from "./src/routes/branch.js";
import reviewsRoutes from "./src/routes/reviews.js";
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import loginRoutes from "./src/routes/login.js"
import cookieParser from "cookie-parser";
const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.use(cookieParser())


// Rutas
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/sucursales", sucursalesRoutes);
app.use("/api/reviews", reviewsRoutes);

app.use("/api/registerEmployee",registerEmployeeRoutes  );
app.use("/api/login", loginRoutes);
export default app;