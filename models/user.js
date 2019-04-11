module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be blank."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Please enter a valid email address."
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Phone number cannot be blank."
        }
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "City cannot be blank."
        }
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "You must choose a state."
        }
      }
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: /^\d{5}$/,
          msg: "Zip code cannot be blank and must contain 5 digits."
        }
      }
    }
  });

  // Associating User with Pets
  // When a User is deleted, also delete any associated Pets
  User.associate = function(models) {
    User.hasMany(models.Pet, {
      onDelete: "cascade"
    });
  };

  return User;
};
