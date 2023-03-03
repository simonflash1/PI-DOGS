const { Dog, Temperaments } = require('../db')
const axios = require('axios')
const getTemperaments = require('./temperamentsController')


// FUNCION PARA LIMPIAR LA DATA QUE NO SE NECESITA DE LA API

const cleanInfo = function (data) {
  const response = data.map(dog => {
    return {
      id: dog.id,
      image: dog.image.url,
      name: dog.name,
      height: dog.height.metric?.split(' - '),
      weight: dog.weight.metric?.split(' - '),
      temperament: dog.temperament?.split(', '),
      life_span: dog.life_span,
      created: dog.created
    }
  })
  return response;
}


// FUNCION PARA TRAER TODOS LOS PERROS ------- DB Y API

const getAllDogs = async () => {
  const apiInfo = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
  const infoCleaned = cleanInfo(apiInfo)
  const dbInfo = await Dog.findAll()
  return [...dbInfo, ...infoCleaned]
}

//  FUNCION QUE TRAE UN PERRO POR QUERY (name) ------------

const getDogByName = async (name) => {
  let resultado = [];
  infoDBFiltered = await Dog.findAll({ where: { name: name }, include: [Temperaments] })

  if (infoDBFiltered.length > 0) {
    resultado = infoDBFiltered;
  } else {
    const apiInfoByName = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data
    const infoFiltered = apiInfoByName.filter(dog => dog.name === name)
    if (infoFiltered.length === 0) {
      throw new Error(`No se encontraron resultados para la búsqueda "${name}"`);
    }
    resultado = infoFiltered;
  }
  return resultado;
}
//console.log(getDogByName("Affenpinscher"))

//  FUNCION QUE TRAE LA INFORMACION DE UN PERRO POR ID -----------

const getDogById = async (id) => {
  let resultado = [];

  if (id.length > 6) {
    const infoDB = await Dog.findAll({
      where: {
        id: id
      },
      include: [Temperaments]
    })
    if (infoDB.length > 0) {
      resultado = infoDB;
    }
  } else {
    const apiInfo = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
    if (apiInfo.length === 0) {
      throw new Error(`No se encontraron resultados para la búsqueda con ID "${id}"`);
    }
    resultado = apiInfo;
  }
  return resultado;
}

//  FUNCION PARA CREAR UNA RAZA DE PERROS EN LA BASE DE DATOS --------


const createDogDB = async ({ name, image, height, weight, temperaments, life_span }) => {
  await getTemperaments()
  try {
    if (!name || !height || !weight || !life_span || !temperaments) {
      throw new Error('Faltan datos requeridos para crear la raza.');
    }

    const dog = await Dog.create({ name, image, height, weight, life_span });


    for (let temperament of temperaments) {
      let temperamentDB = await Temperaments.findOne({ where: { name: temperament } });

      if (!temperamentDB) {
        throw new Error(`El temperamento '${temperament}' no existe en la base de datos.`);
      }

      await dog.addTemperament(temperamentDB);
    }

  } catch (error) {
    throw new Error(`Ocurrió un error al crear la raza: ${error}`);
  }
};



module.exports = {
  getAllDogs,
  getDogByName,
  getDogById,
  createDogDB
}