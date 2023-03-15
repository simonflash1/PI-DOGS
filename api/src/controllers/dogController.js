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
      temperament: dog.temperament,
      life_span: dog.life_span,
      created: false
    }
  })
  return response;
}



// FUNCION PARA TRAER TODOS LOS PERROS ------- DB Y API

const getAllDogs = async () => {
  const apiInfo = (await axios.get("https://api.thedogapi.com/v1/breeds")).data
  const infoCleaned = cleanInfo(apiInfo)
  const dbInfo = await Dog.findAll({
    include: Temperaments,
  })
  dbInfoCleaned = dbInfo.map((el) => {
    const height = [el.height_min, el.height_max].sort((a, b) => a - b);
  const weight = [el.weight_min, el.weight_max].sort((a, b) => a - b);
    return {
      id: el.id,
      name: el.name,
      height_min: el.height_min,
      height_max: el.height_max,
      height: height,
      weight: weight,
      weight_min: el.weight_min,
      weight_max: el.weight_max,
      life_span: el.life_span,
      image: el.image,
      created: true,
      temperament: el.temperaments.map((i) => {
        return i.name;
      }).join(", "),
    };
  });

  return [...dbInfoCleaned, ...infoCleaned]
}


//  FUNCION QUE TRAE UN PERRO POR QUERY (name) ------------

const getDogByName = async (name) => {
  let resultado = [];
  infoDBFiltered = await Dog.findAll({ where: { name: name }, include: [Temperaments] })

  if (infoDBFiltered.length > 0) {
    resultado = infoDBFiltered;
  } else {
    const apiInfoByName = (await axios.get(`https://api.thedogapi.com/v1/breeds`)).data
    const infoCleaned = cleanInfo(apiInfoByName)
    const infoFiltered = infoCleaned.filter(dog => dog.name === name)
    if (infoFiltered.length === 0) {
      throw new Error(`No se encontraron resultados para la búsqueda "${name}"`);
    }
    resultado = infoFiltered;
  }
  return resultado;
}


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
      resultado = infoDB[0].dataValues;
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


const createDogDB = async ({ name, image, height_min, height_max, weight_min, weight_max, temperaments, life_span }) => {
  await getTemperaments()
  try {
    if (!name || !height_min || !height_max || !weight_min || !weight_max || !life_span || !temperaments) {
      throw new Error('Faltan datos requeridos para crear la raza.');
    }

    const dog = await Dog.create({ name, image, height_min, height_max, weight_min, weight_max, temperaments, life_span });


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