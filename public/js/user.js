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
  // Save the new user to the db and refresh the list
  var handleFormSubmit = function(event) {
    event.preventDefault();

    // User name validation
    if (!$userName.val()) {
      $modalPara.text("User name cannot be blank.");
      $modal.modal("open");
      return;
    }

    // User email validation
    if (
      !$userEmail.val() ||
      !$userEmail
        .val()
        .match(
          /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
        )
    ) {
      $modalPara.text("Please enter a valid email address.");
      $modal.modal("open");
      return;
    }

    // User phone validation
    if (!$userPhone.val()) {
      $modalPara.text("Phone number cannot be blank.");
      $modal.modal("open");
      return;
    }

    // User city validation
    if (!$userCity.val()) {
      $modalPara.text("City cannot be blank.");
      $modal.modal("open");
      return;
    }

    // User state validation
    if (!$userState.val()) {
      $modalPara.text("You must choose a state.");
      $modal.modal("open");
      return;
    }

    // User zip code validation
    if (!$userZip.val() || !$userZip.val().match(/^\d{5}$/)) {
      $modalPara.text("Zip code cannot be blank and must contain 5 digits.");
      $modal.modal("open");
      return;
    }

    var user = {
      name: $userName.val().trim(),
      email: $userEmail.val().trim(),
      phone: $userPhone.val().trim(),
      city: $userCity.val().trim(),
      state: $userState.val().trim(),
      zip: $userZip.val().trim()
    };

    API.saveUser(user).then(function() {
      alert("User saved!");
      location.assign("/all-users");
    });

    $userName.val("");
    $userEmail.val("");
    $userPhone.val("");
    $userCity.val("");
    $userState.val("");
    $userZip.val("");
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
