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
  var $modal = $("#input-modal");
  var $modalPara = $(".modal-content > p");

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
        url: "/api/pets/" + id,
        type: "DELETE"
      });
    }
  };

  // handleFormSubmit is called whenever we submit a new pet
  // Save the new pet to the db then load all-pets page
  var handleFormSubmit = function(event) {
    event.preventDefault();

    // User Id validation
    if (!$userID.val()) {
      $modalPara.text("You must select a user.");
      $modal.modal("open");
      return;
    }

    var pet = {
      UserId: $userID.val(),
      name: $petName.val(),
      type: $petType.val(),
      age: $petAge.val(),
      breed: $petBreed.val(),
      gender: $petGender.val(),
      description: $petDescription.val()
    };

    for (var val in pet) {
      if (pet[val] === null) {
        pet[val] = "";
      }
      pet[val] = pet[val].trim();
    }

    API.savePet(pet).then(function(response) {
      // Back end returns error message if any field fails validation
      if (response.errors) {
        $modalPara.text(response.errors[0].message);
        $modal.modal("open");
      } else {
        alert("Pet saved!");
        location.assign("/all-pets");
      }
    });
  };

  // handleDeleteBtnClick is called when a pet's delete button is clicked
  // Remove the pet from the db and refresh the list
  var handleDeleteBtnClick = function() {
    if (confirm("Are you sure you want to delete this pet?")) {
      console.log($(this));
      var idToDelete = $(this)
        .parent()
        .attr("data-id");
      API.deletePet(idToDelete).then(function() {
        location.reload();
      });
    }
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $petList.on("click", ".delete", handleDeleteBtnClick);
});
