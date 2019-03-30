var db = require("../models");

module.exports = function(app) {
  // Get all pets
  app.get("/api/pets", function(req, res) {
    db.Pet.findAll({}).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Create a new pet
  app.post("/api/pets", function(req, res) {
    db.Pet.create(req.body).then(function(dbPet) {
      res.json(dbPet);
    });
  });

  // Delete a pet by id
  app.delete("/api/pets:id", function(req, res) {
    db.Pet.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPet) {
      res.json(dbPet);
    });
  });
};
