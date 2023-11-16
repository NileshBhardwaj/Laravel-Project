$(document).ready(function() {
    admin();
    $("#dashboard").hide();
    // $("#hide").remove();

    // $("#admin").fadeOut(5000);
    console.log("you are data");
    var role_id = $("#role_id").val();
    console.log(role_id);

    function admin() {
        var paginationLimit = $("#paginationLimit").val();
        $.ajax({
            url: "/api/admin",
            data: { role_id: role_id, limit: paginationLimit },
            type: "GET",
            success: function(response) {
                var data = response.data;
                var links = response.links;
                console.log(data);
                if (data) {
                    // var data = data[0];
                    // console.log(data);
                    var table = "<table class='mytable'>";
                    table +=
                        "<tr><th>Sr.No</th><th>Username</th><th>Emails</th><th>Date of Birth</th><th>Address</th><th>Country</th><th>State</th><th>City</th><th>Actions</th></tr>";
                    var srNo = 1;
                    var id;
                    $.each(data, function(index, data) {
                        var id = data.id;
                        var username = data.name;
                        var address = data.address;
                        var email = data.email;
                        var dob = data.dob;
                        var country = data.country_name;
                        var state = data.state_name;
                        var city = data.city_name;

                        table += "<tr>";

                        table += "<td>" + srNo + "</td>";
                        table += "<td>" + username + "</td>";

                        table += "<td>" + email + "</td>";
                        table += "<td>" + dob + "</td>";
                        table += "<td>" + address + "</td>";
                        table += "<td>" + country + "</td>";
                        table += "<td>" + state + "</td>";
                        table += "<td>" + city + "</td>";
                        table += "<td style='display: none;'>" + id + "</td>";
                        table += '<td class="button-container">';
                        table += '<button class="view-button">View</button>';
                        table += '<button class="edit-button">Edit</button>';
                        table +=
                            '<button class="delete-button" id="delete">Delete</button>';

                        table += "</tr>";
                        srNo++;
                    });
                    table += "</table>";
                    var current = response.current_page;
                    console.log(current);
                    if (current == 1) {
                        // Hide the previous button if the current page is 1
                        $("#previous").hide();
                    }

                    var pagination = "<div class='pagination'>";
                    $.each(links, function(index, link) {
                        if (link.url) {
                            pagination +=
                                '<a href="' +
                                link.url +
                                '">' +
                                link.label +
                                "</a>";
                        } else {
                            pagination +=
                                '<span id="previous">' + link.label + "</span>";
                        }
                    });

                    pagination += "</div>";
                    $("#responseContainer").html(table + pagination);
                    $("#myInput").on("keyup", function() {
                        console.log("come here");
                        //  converting search value  to lowercase
                        var value = $(this).val().toLowerCase();

                        // Filter the table
                        $(".mytable tr").filter(function() {
                            // give the text content of row value
                            var rowText = $(this).text().toLowerCase();

                            // Hiding  table row if it does not match the searched value
                            $(this).toggle(rowText.indexOf(value) > -1);
                        });
                    });
                    // $('#responseContainer').html(table);
                    $(".delete-button").on("click", function() {
                        var row = $(this).closest("tr");
                        var email = row.find("td:eq(2)").text();
                        var username = row.find("td:eq(1)").text();
                        $("#myModal").modal("show");
                        $(".modal-body p").text(
                            "Are you sure to remove user " + username + "?"
                        );
                        console.log(username);
                        console.log(email);
                        console.log(row);

                        $("#okay").on("click", function() {
                            console.log("clicking");
                            $.ajax({
                                url: "/api/delete",
                                data: { email: email },
                                type: "POST",
                                success: function(data) {
                                    admin();
                                    $("#delete_user").text(
                                        "User is removed successfully."
                                    );
                                    $("#delete_user").fadeOut(5000);
                                },
                                error: function(
                                    jqXHR,
                                    textStatus,
                                    errorThrown
                                ) {},
                            });
                        });
                    });

                    $(".view-button").on("click", function() {
                        var row = $(this).closest("tr");
                        var email = row.find("td:eq(2)").text();
                        var username = row.find("td:eq(1)").text();
                        var id = row.find("td:eq(8)").text();
                        var param1 = id;
                        // var param2 = "param2Value";
                        window.location.href = "/view?param1=" + param1;
                        console.log(id);
                    });
                    $(".edit-button").on("click", function() {
                        var row = $(this).closest("tr");
                        var id = row.find("td:eq(8)").text();
                        console.log(id);
                        var param1 = id;
                        window.location.href = "/edit?param1=" + param1;
                    });
                }
            },
        });
    }
    $(document).on("click", ".pagination a", function(e) {
        e.preventDefault();
        var paginationLimit = $("#paginationLimit").val();
        var url = $(this).attr("href");
        var get = $("#myInput").val();
        console.log(get);
        $.ajax({
            url: url,
            data: { role_id: role_id, limit: paginationLimit, search: get },
            type: "GET",
            success: function(response) {
                var data = response.data;
                var links = response.links;
                var table = "<table class='mytable'>";

                var table = "<table class='my'>";
                table +=
                    "<tr><th>Sr.No</th><th>Username</th><th>Emails</th><th>Date of Birth</th><th>Address</th><th>Country</th><th>State</th><th>City</th><th>Actions</th></tr>";
                // var srNo = 1;
                var id;
                var srNo = response.from;
                $.each(data, function(index, data) {
                    var id = data.id;
                    var username = data.name;
                    var address = data.address;
                    var email = data.email;
                    var dob = data.dob;
                    e;
                    var country = data.country_name;
                    var state = data.state_name;
                    var city = data.city_name;

                    table += "<tr>";

                    table += "<td>" + srNo + "</td>";
                    table += "<td>" + username + "</td>";

                    table += "<td>" + email + "</td>";
                    table += "<td>" + dob + "</td>";
                    table += "<td>" + address + "</td>";
                    table += "<td>" + country + "</td>";

                    table += "<td>" + state + "</td>";
                    table += "<td>" + city + "</td>";
                    table += "<td style='display: none;'>" + id + "</td>";
                    table += '<td class="button-container">';
                    table += '<button class="view-button">View</button>';
                    table += '<button class="edit-button">Edit</button>';
                    table +=
                        '<button class="delete-button" id="delete">Delete</button>';

                    table += "</tr>";
                    srNo++;
                });

                table += "</table>";

                var pagination = "<div class='pagination'>";
                $.each(links, function(index, link) {
                    if (link.url) {
                        if (value === "") {
                            $(".my tr").show();
                        }
                        pagination +=
                            '<a href="' + link.url + '">' + link.label + "</a>";
                    } else {
                        pagination += "<span>" + link.label + "</span>";
                    }
                });
                pagination += "</div>";

                $("#responseContainer").html(table + pagination);
                if (get != "") {
                    var value = $("#myInput").val().toLowerCase();

                    // Filter the table
                    $(".my tr").filter(function() {
                        // give the text content of row value
                        var rowText = $(this).text().toLowerCase();

                        // Hiding  table row if it does not match the searched value
                        $(this).toggle(rowText.indexOf(value) > -1);
                    });
                }

                // else if ($("#myInput").on('keyup', function() {
                //         console.log("come here");
                //         //  converting search value  to lowercase
                //         var value = $(this).val().toLowerCase();

                //         // Filter the table
                //         $('.my tr').filter(function() {
                //             // give the text content of row value
                //             var rowText = $(this).text().toLowerCase();

                //             // Hiding  table row if it does not match the searched value
                //             $(this).toggle(rowText.indexOf(value) > -1);
                //         });
                //     })) {
                //     // If search box is empty, show all rows
                //     $('.my tr').show();
                // }
                else {
                    $("#myInput").on("keyup", function() {
                        console.log("come here");
                        //  converting search value  to lowercase
                        var value = $(this).val().toLowerCase();

                        // Filter the table
                        $(".my tr").filter(function() {
                            // give the text content of row value
                            var rowText = $(this).text().toLowerCase();

                            // Hiding  table row if it does not match the searched value
                            $(this).toggle(rowText.indexOf(value) > -1);
                        });
                    });
                }
            },
        });
    });
    $("#paginationLimit").change(function() {
        // Reload the data when the selected limit changes

        admin();
        applyFilter();
    });

    function applyFilter() {
        console.log("function called");
        var get = $("#myInput").val();
        console.log(get);

        if (get != "") {
            var value = $("#myInput").val().toLowerCase();

            // Filter the table
            $(".mytable tr").filter(function() {
                // give the text content of row value
                var rowText = $(this).text().toLowerCase();

                // Hiding table row if it does not match the searched value
                $(this).toggle(rowText.indexOf(value) > -1);
            });

            admin();
        }
        // Reload the data when the selected limit changes
    }
});