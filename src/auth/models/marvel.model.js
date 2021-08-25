"use strict";

const marvelModel = (sequelize, DataTypes) => {
  const model = sequelize.define("marvelMovies", {
    favMovie: { type: DataTypes.STRING },
    favHero: { type: DataTypes.STRING },
    favQuote: { type: DataTypes.STRING },
    releaseDate:{type: DataTypes.INTEGER},
   
  });
  return model;
};


module.exports=marvelModel;