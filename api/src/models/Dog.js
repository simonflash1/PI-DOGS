const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height_min: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height_max: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight_min: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    weight_max: {
      type: DataTypes.STRING,

    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created: {
      type: DataTypes.BOOLEAN,
      default: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
};