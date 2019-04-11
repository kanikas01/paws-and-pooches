// Wait until page is loaded
$(document).ready(function() {
  // Get references to page elements
  var $userName = $("#username");
  var $userEmail = $("#email");
  var $userPhone = $("#phone");
  var $userCity = $("#city");
  var $userState = $("#state");
  var $userZip = $("#zip");
  var $submitBtn = $("#submit");
  var $userList = $("#user-list");
  var $modal = $("#input-modal");
  var $modalPara = $(".modal-content > p");

  // The API object contains methods for each kind of request we'll make
  var API = {
    saveUser: function(user) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/users",
        data: JSON.stringify(user)
      });
    },
    getUsers: function() {
      return $.ajax({
        url: "api/users",
        type: "GET"
      });
    },
    deleteUser: function(id) {
      return $.ajax({
        url: "/api/users/" + id,
        type: "DELETE"
      });
    }
  };

  // handleFormSubmit is called whenever we submit a new user
  // Save the new user to the db then load all-users page
  var handleFormSubmit = function(event) {
    event.preventDefault();

    var user = {
      name: $userName.val(),
      email: $userEmail.val(),
      phone: $userPhone.val(),
      city: $userCity.val(),
      state: $userState.val(),
      zip: $userZip.val()
    };

    // Replace null values with empty strings before running trim
    for (var val in user) {
      if (user[val] === null) {
        user[val] = "";
      }
      user[val] = user[val].trim();
    }

    API.saveUser(user).then(function(response) {
      // Back end returns error message if any field fails validation
      if (response.errors) {
        $modalPara.text(response.errors[0].message);
        $modal.modal("open");
      } else {
        alert("User saved!");
        location.assign("/all-users");
      }
    });
  };

  // handleDeleteBtnClick is called when a user's delete button is clicked
  // Remove the user from the db and refresh the list
  var handleDeleteBtnClick = function() {
    if (confirm("Are you sure you want to delete this user?")) {
      var idToDelete = $(this)
        .parent()
        .attr("data-id");
      API.deleteUser(idToDelete).then(function() {
        location.reload();
      });
    }
  };

  // Add event listeners to the submit and delete buttons
  $submitBtn.on("click", handleFormSubmit);
  $userList.on("click", ".delete", handleDeleteBtnClick);
});
