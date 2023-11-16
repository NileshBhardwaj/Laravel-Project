$(document).ready(function() {

    admin();

    $("#dashboard").hide();
    // $("#hide").remove();

    // $("#admin").fadeOut(5000);
    // console.log("you are data");
    var role_id = $("#role_id").val();
    // console.log(role_id);
    // input: tex

    function admin() {
        var paginationLimit = $('#paginationLimit').val();
        var query = $("#myInput").val();
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/api/admin',
            data: {
                role_id: role_id,
                limit: paginationLimit,
                search: query,
                _token: "{{csrf_token()}}",
            },
            type: 'GET',
            success: function(response) {
                var data = response.data;
                var links = response.links
                var current = response.current_page;
                // console.log(data);
                if (data) {
                    // var data = data[0];
                    // console.log(data);
                    var table = "<table class='mytable'>";
                    table += "<tr><th>Sr.No</th><th>Username</th><th>Emails</th><th>Date of Birth</th><th>Address</th><th>Country</th><th>State</th><th>City</th><th>Actions</th></tr>";
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
                        table += '<button class="delete-button" id="delete">Delete</button>';

                        table += "</tr>";
                        srNo++;
                    })
                    table += "</table>";
                    var link = response.prev_page_url;
                    // console.log(link);
                    // if (!link) {

                    // console.log("fhigfaigf");
                    // }
                    var pagination = "<div class='pagination'>";

                    $.each(links, function(index, link) {
                        if (link.url) {
                            pagination += '<a href="' + link.url + '">' + link.label + '</a>';
                        }
                        if (!link) {
                            pagination += '<span>' + link.label + '</span>';
                        }
                    });
                    pagination += "</div>";
                    $('#pagination1').html(pagination);
                    $('#responseContainer').html(table);
                    $("#myInput").on('keyup', function() {

                        // console.log("come here");
                        //  converting search value  to lowercase
                        var value = $(this).val().toLowerCase();

                        // Filter the table
                        $('.mytable tr').filter(function() {
                            // give the text content of row value
                            var rowText = $(this).text().toLowerCase();

                            // Hiding  table row if it does not match the searched value
                            $(this).toggle(rowText.indexOf(value) > -1);
                        });
                    });
                    // $('#responseContainer').html(table);
                    $('.delete-button').on('click', function() {
                        var row = $(this).closest('tr');
                        var email = row.find('td:eq(2)').text();
                        var username = row.find('td:eq(1)').text();
                        $("#myModal").modal('show');
                        $('.modal-body p').text('Are you sure to remove user ' + username + '?');
                        // console.log(username);
                        // console.log(email);
                        // console.log(row);

                        $("#okay").on('click', function() {
                            // console.log("clicking");
                            $.ajax({
                                url: '/api/delete',
                                data: { email: email },
                                type: 'POST',
                                success: function(data) {
                                    admin();
                                    $("#delete_user").text("User is removed successfully.");
                                    $("#delete_user").fadeOut(5000);
                                },
                                error: function(jqXHR, textStatus, errorThrown) {

                                }
                            });
                        })


                    });

                    $('.view-button').on('click', function() {
                        var row = $(this).closest('tr');
                        var email = row.find('td:eq(2)').text();
                        var username = row.find('td:eq(1)').text();
                        var id = row.find('td:eq(8)').text();
                        var param1 = id;
                        // var param2 = "param2Value";
                        window.location.href = "/view?param1=" + param1;
                        // console.log(id);

                    })
                    $('.edit-button').on('click', function() {
                        var row = $(this).closest('tr');
                        var id = row.find('td:eq(8)').text();
                        // console.log(id);
                        var param1 = id;
                        window.location.href = "/edit?param1=" + param1;

                    })

                }
            }
        })
    }
    $(document).on('click', '.pagination a', function(e) {
        e.preventDefault();
        var paginationLimit = $('#paginationLimit').val();
        var url = $(this).attr('href');
        var query = $("#myInput").val();
        $("#myInput").on('keyup', function() {
            admin();

        })
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: url,
            data: { role_id: role_id, limit: paginationLimit, search: query },
            type: 'GET',
            success: function(response) {
                var data = response.data;
                var links = response.links;
                var table = "<table class='my'>";
                table += "<tr><th>Sr.No</th><th>Username</th><th>Emails</th><th>Date of Birth</th><th>Address</th><th>Country</th><th>State</th><th>City</th><th>Actions</th></tr>";
                var srNo = response.from;
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
                    // var value = $(this).val().toLowerCase();

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
                    table += '<button class="delete-button" id="delete">Delete</button>';

                    table += "</tr>";
                    srNo++;
                });

                table += "</table>";
                applyFilter();
                var pagination = "<div class='pagination'>";
                $.each(links, function(index, link) {
                    if (link.url) {
                        pagination += '<a href="' + link.url + '">' + link.label + '</a>';
                    }
                    if (!link) {
                        pagination += '<span>' + link.label + '</span>';
                    }
                });
                $('.delete-button').on('click', function() {
                    var row = $(this).closest('tr');
                    var email = row.find('td:eq(2)').text();
                    var username = row.find('td:eq(1)').text();
                    $("#myModal").modal('show');
                    $('.modal-body p').text('Are you sure to remove user ' + username + '?');
                    // console.log(username);
                    // console.log(email);
                    // console.log(row);

                    $("#okay").on('click', function() {
                        // console.log("clicking");
                        $.ajax({
                            url: '/api/delete',
                            data: { email: email },
                            type: 'POST',
                            success: function(data) {
                                admin();
                                $("#delete_user").text("User is removed successfully.");
                                $("#delete_user").fadeOut(5000);
                            },
                            error: function(jqXHR, textStatus, errorThrown) {

                            }
                        });
                    })


                });

                $('.view-button').on('click', function() {
                    var row = $(this).closest('tr');
                    var email = row.find('td:eq(2)').text();
                    var username = row.find('td:eq(1)').texapi / analyzet();
                    var id = row.find('td:eq(8)').text();
                    var param1 = id;
                    // var param2 = "param2Value";
                    window.location.href = "/view?param1=" + param1;
                    // console.log(id);

                })
                $('.edit-button').on('click', function() {
                    var row = $(this).closest('tr');
                    var id = row.find('td:eq(8)').text();
                    // console.log(id);
                    var param1 = id;
                    window.location.href = "/edit?param1=" + param1;

                })
                pagination += "</div>";

                $('#pagination1').html(pagination);
                $('#responseContainer').html(table);
            }
        });
    });
    $("#myInput").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });


    $('#paginationLimit').change(function() {
        admin(); // Reload the data when the selected limit changes
    });
    $("#myInput").keypress(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    });

    function applyFilter() {
        $("#myInput").on('keyup', function() {
            // console.log("come here");
            //  converting search value  to lowercase
            var value = $(this).val().toLowerCase();

            // Filter the table
            $('.mytable tr').filter(function() {
                // give the text content of row value
                var rowText = $(this).text().toLowerCase();

                // Hiding  table row if it does not match the searched value
                $(this).toggle(rowText.indexOf(value) > -1);
            });
        });
    }
    $(document).ready(function() {
        $('#analyze').click(function() {
            console.log("user");
            window.location.href = "/result";

            // $.ajax({
            //     url: '/analyze', // replace with your endpoint
            //     type: 'POST',
            //     data: {
            //         url: $('#url').val(),
            //         _token: '{{ csrf_token() }}' // Laravel CSRF Token
            //     },
            //     success: function(response) {
            //         $("#MyModal").modal('show');
            //         console.log(response);
            //         var abc = response.loadingExperience;
            //         console.log(abc);


            //         var data = abc.metrics;
            //         console.log(data);




            //         // handle your response here
            //     },
            //     error: function(response) {
            //         console.log(response);
            //         // handle error here
            //     }
            // });
        });
    });
    $(document).ajaxStart(function() {
        $("#loading").show();
    });

    $(document).ajaxComplete(function() {
        $("#loading").hide();
    });

});