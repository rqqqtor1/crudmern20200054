import CustomerModel from "../models/Client.js";
import EmployeeModel from "../models/Employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const loginController = {};

loginController.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let userFound;
        let userType;

        
        userFound = await CustomerModel.findOne({ email: email });
        if (userFound) {
            userType = "customer"; 
        } else {
            
            userFound = await EmployeeModel.findOne({ email: email });
            if (userFound) {
                
                if (userFound.role === "admin") {
                    userType = "admin";
                } else {
                    userType = "employee"; 
                }
            }
        }

        if (!userFound) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const isPasswordValid = await bcryptjs.compare(password, userFound.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jsonwebtoken.sign(
            { id: userFound._id, email: userFound.email, userType: userType },
            'secret123', 
            { expiresIn: '1h' }   
            );

           return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token: token,
            user: {
                id: userFound._id,
                email: userFound.email,
                userType: userType,  
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
};

export default loginController;