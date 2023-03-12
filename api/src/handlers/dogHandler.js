const { getAllDogs, createDogDB, getDogByName, getDogById } = require('../controllers/dogController')

// MANEJADOR QUE EN CASO DE RECIBIR NOMBRE POR QUERY LO BUSCA, SINO TRAE TODOS LOS PERROS---

const getDogs = async (req, res) => {
    const { name } = req.query
    try {
        if (name) {
            try {
                const dogByName = await getDogByName(name);
                res.status(200).send(dogByName)
            } catch (error) {
                res.status(404).json({ message: error.message });
            }
        } else {
            const response = await getAllDogs();
            res.status(200).json(response);
        }
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

//MANEJADOR QUE TRAE UNA RAZA PASANDOLE EL ID ----------------------

const getDogID = async (req, res) => {
    const { id } = req.params
    try {
        const response = await getDogById(id)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}



//MANEJADOR QUE SIRVE PARA CREAR UNA RAZA -------------

const createDog = (req, res) => {

    const { name, image, height_min, height_max, weight_min, weight_max, temperaments, life_span } = req.body
    try {
        const response = createDogDB({ name, image, height_min, height_max, weight_min, weight_max, temperaments, life_span })
        res.status(200).json(response + "Creado con exito")
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = {
    getDogs,
    getDogID,
    createDog
}