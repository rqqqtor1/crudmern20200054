import express from "express";
import "./database.js"
import clientesRoutes from "./src/routes/client.js";
import empleadosRoutes from "./src/routes/employee.js";
import sucursalesRoutes from "./src/routes/branch.js";
import reviewsRoutes from "./src/routes/reviews.js";
import registerEmployeeRoutes from "./src/routes/registerEmployee.js";
import loginRoutes from "./src/routes/login.js";
import logoutRoute from "./src/routes/logout.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import registerclientRoute from "./src/routes/registerClient.js"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    // Permitir envío de cookies y credenciales
    credentials: true
  })
);

// Middleware para parsear JSON
app.use(express.json());

app.use(cookieParser())


// Rutas
app.use("/api/clientes", clientesRoutes);
app.use("/api/empleados", empleadosRoutes);
app.use("/api/sucursales", sucursalesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/registerClients", registerclientRoute);
app.use("/api/registerEmployee",registerEmployeeRoutes );
app.use("/api/login", loginRoutes);
app.use("/api/logout", logoutRoute);
export default app;