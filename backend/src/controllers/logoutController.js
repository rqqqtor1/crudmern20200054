const logoutController = {};

logoutController.logout = async (req, res) => {
    
    res.clearCookie("authToken", { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return res.json({ message: "Sesión cerrada con éxito" });
};

export default logoutController;