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
        else
          deactivate = "<a href=\"#\" onclick=\"activateUser('"+user.email+"');return false;\">Activate</a>";

        var team = "";
        if (user.team == "engineering")
          team = "Engineering";
        else if (user.team == "business")
          team = "Business Development";
        else if (user.team == "ops")
          team = "Operations";
        else if (user.team == "policy")
          team = "Policy";

        var row = "<tr><td>"+user.first_name+"</td><td>"+user.last_name+"</td><td>"+user.email+"</td><td>"+team+"</td><td>"+deactivate+"</td></tr>"
        $(".content").append(row);
      });

    }

  });
}

function deactivateUser(email) {
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

  showAllUsers();
}

function activateUser(email) {
  var stuff = "{\"method\":\"activate_user\", \"params\": [\""+email+"\"] }";

  $.ajax({
    url: "http://localhost:9615",
    type: 'POST',
    data: stuff,
    error: function(payload) {
    },
    success: function(payload) {
    }

  });

  showAllUsers();
}

function showCurrentWeek() {
  var stuff = "{\"method\":\"show_current_week_pairing\", \"params\": [] }";

  $.ajax({
    url: "http://localhost:9615",
    type: 'POST',
    data: stuff,
    error: function(payload) {
      console.log(payload);
      // $(".users").html(payload);
    },
    success: function(payload) {
      var obj = jQuery.parseJSON(payload);
      console.log(obj);
      $(".content").empty();

      obj.forEach(function(pair){
        var photo = "";
        if (pair.photo.length != 0) {
          photo = "<a href=\""+pair.photo+"\" target=\"_blank\">link</a>";
          change_text = "Change Photo";
        }
        else
          change_text = "Upload Photo";

        var change = "<a href=\"./change_photo.html\">"+change_text+"</a>";
        var row = "<tr><td>"+pair.email1+"</td><td>"+pair.email2+"</td><td>"+pair.event_type+"</td><td>"+photo+"</td><td>"+change+"</td></tr>"
        $(".content").append(row);
      });
    }

  });
}

function showAllWeeks() {
  var stuff = "{\"method\":\"show_all_weeks_pairings\", \"params\": [] }";

  $.ajax({
    url: "http://localhost:9615",
    type: 'POST',
    data: stuff,
    error: function(payload) {
      console.log(payload);
      // $(".users").html(payload);
    },
    success: function(payload) {
      var obj = jQuery.parseJSON(payload);
      console.log(obj);
      $(".content").empty();

      obj.forEach(function(pair){
        var photo = "";
        if (pair.photo.length != 0) {
          photo = "<a href=\""+pair.photo+"\" target=\"_blank\">link</a>";
          change_text = "Change Photo";
        }
        else
          change_text = "Upload Photo";

        var date = pair.date.substring(4,6) + "/" + pair.date.substring(6,8) + "/" + pair.date.substring(0,4);
        var change = "<a href=\"./change_photo.html\">"+change_text+"</a>";
        var row = "<tr><td>"+date+"</td><td>"+pair.email1+"</td><td>"+pair.email2+"</td><td>"+pair.event_type+"</td><td>"+photo+"</td><td>"+change+"</td></tr>"
        $(".content").append(row);
      });
    }

  });
}
