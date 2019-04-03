// Wait until page is loaded
$(document).ready(function() {
  // Get references to page elements
  var $userID = $("#user-id");
  var $petName = $("#name");
  var $petType = $("#type");
  var $petAge = $("#age");
  var $petBreed = $("#breed");
  var $petGender = $("#gender");
  var $petDescription = $("#description");
  var $submitBtn = $("#submit");
  var $petList = $("#pet-list");

  // The API object contains methods for each kind of request we'll make
  var API = {
    savePet: function(pet) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/pets",
        data: JSON.stringify(pet)
      });
    },
    getPet: function() {
      return $.ajax({
        url: "api/pets",
        type: "GET"
      });
    },
    deletePet: function(id) {
      return $.ajax({
        url: "api/pets/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshPets gets new pets from the db and repopulates the list
  var refreshPets = function() {
    API.getPet().then(function(data) {
      var $pets = data.map(function(pet) {
        var $a = $("<a>")
          .text(pet.description)
          .attr("href", "/pet/" + pet.id);

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": pet.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      $petList.empty();
      $petList.append($pets);
    });
  };

  // handleFormSubmit is called whenever we submit a new pet
  // Save the new pet to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var pet = {
      UserId: $userID.val().trim(),
      name: $petName.val().trim(),
      type: $petType.val().trim(),
      age: $petAge.val().trim(),
      breed: $petBreed.val().trim(),
      gender: $petGender.val().trim(),
      description: $petDescription.val().trim()
    };

    // TODO Validation
    if (!(pet.name && pet.type)) {
      alert("You must enter a pet name and type!");
      return;
    }

    API.savePet(pet).then(function() {
      alert("Pet saved!");
      refreshPets();
    });

    $userID.val("");
    $petName.val("");
    $petType.val("");
    $petAge.val("");
    $petBreed.val("");
    $petGender.val("");
    $petDescription.val("");
  };

  // handleDeleteBtnClick is called when a user's delete button is clicked
  // Remove the user from the db and refresh the list
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deletePet(idToDelete).then(function() {
      refreshPets();
    });
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $petList.on("click", ".delete", handleDeleteBtnClick);
});
