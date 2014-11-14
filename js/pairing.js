function addUser() {
  var firstName = document.getElementById('firstName').value;
  var lastName  = document.getElementById('lastName').value;
  var email     = document.getElementById('email').value;
  var team      = document.getElementById('team').value;
  var stuff = "{\"method\":\"insert_user\", \"params\": [\""+firstName+"\",\""+lastName+"\",\""+email+"\",\""+team+"\"] }";

  $.ajax({
    url: "http://localhost:9615",
    type: 'POST',
    data: stuff,
    error: function(payload) {
    },
    success: function(payload) {
    }

  });

  document.getElementById('addForm').reset();
}

function removeUser() {
  var email     = document.getElementById('removeEmail').value;
  var stuff = "{\"method\":\"delete_User\", \"params\": [\""+email+"\"] }";

  $.ajax({
    url: "http://localhost:9615",
    type: 'POST',
    data: stuff,
    error: function(payload) {
    },
    success: function(payload) {
    }

  });

  document.getElementById('removeForm').reset();

}

function showAllUsers() {
  var stuff = "{\"method\":\"show_all_users\", \"params\": [] }";

  $.ajax({
    url: "http://localhost:9615",
    type: 'POST',
    data: stuff,
    error: function(payload) {
      console.log(payload);
      $(".users").html(payload);
    },
    success: function(payload) {
      var obj = jQuery.parseJSON(payload);
      console.log(obj);
      $(".content").empty();
      obj.forEach(function(user){
        var deactivate = "";
        if (user.active == "1")
          deactivate = "<a href=\"#\" onclick=\"deactivateUser('"+user.email+"');return false;\">Deactivate</a>";
        var row = "<tr><td>"+user.first_name+"</td><td>"+user.last_name+"</td><td>"+user.email+"</td><td>"+user.team+"</td><td>"+deactivate+"</td></tr>"
        $(".content").append(row);
      });

    }

  });
}

function deactivateUser(email) {
  console.log('here')
  var stuff = "{\"method\":\"deactivate_user\", \"params\": [\""+email+"\"] }";

  $.ajax({
    url: "http://localhost:9615",
    type: 'POST',
    data: stuff,
    error: function(payload) {
    },
    success: function(payload) {
    }

  });
}
