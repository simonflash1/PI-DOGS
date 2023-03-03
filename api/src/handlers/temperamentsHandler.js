const getTemperaments = require("../controllers/temperamentsController")

// FUNCION QUE MANEJA LOS TEMPERAMENTS DE LA API


const getTemperamentsHandler = async (req, res) => {
    try {
        const response = await getTemperaments();
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = getTemperamentsHandler;