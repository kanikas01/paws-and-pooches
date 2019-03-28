module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Pet.associate = function(models) {
    // An advertised Pet must be associated with an existing user
    // A Pet can't be created without a user due to the foreign key constraint
    Pet.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pet;
};
