module.exports = function(sequelize, DataTypes) {
  var Pet = sequelize.define("Pet", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Pet name cannot be blank."
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You must select a pet type."
        }
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:
            "Pet age cannot be blank and must be a number. Enter '0' for animals less than one year old."
        }
      }
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Breed cannot be blank."
        }
      }
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You must select a gender."
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description cannot be blank."
        }
      }
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
