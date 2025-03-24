import Employee from "../models/Employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) =>{
    const{name, lastName, birthday, email, address, password, hireDate, telephone, dui, isssNumber, isVerified} = req.body;

    try{
        const existEmployee = await Employee.findOne({email});
        if(existEmployee){
            return res.json({message: "Employee alredy exist"})
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newEmployee = new Employee ({
            name,
            birthday,
            email,
            address,
            pasword:passwordHash,
            hireDate,
            telephone, 
            dui,
            isVerified,
            isssNumber,
            lastName

        });

        await newEmployee.save();
        
        jsonwebtoken.sign(

            { id: newEmployee._id },  
    'secret123',      
    { expiresIn: '1h' },
    (error, token)=> {
        if(error) console.log(error);
        res.cookie("authToken", token)
    }    
        );
    }catch(error){
        console.log(error);
        res.json({message: "Error al registrar el empleado"})
    }
};
export default registerEmployeeController;


