$(document).ready(function() {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get("param1");
    console.log(myParam);
    var userid;
    $.ajax({
        url: "api/edit",
        data: {
            user_id: myParam,
        },
        method: "POST",
        success: function(data) {
            var cityData = data.cities;
            var user = data.userDetails;
            var country = data.countries;
            var stateData = data.states;
            userid = user.id;
            console.log(userid)
            document.getElementById("name").value = user.name;
            document.getElementById("email").value = user.email;
            document.getElementById("address").value = user.address;
            document.getElementById("dob").value = user.dob;

            var countries = document.getElementById("country-dropdown");
            $("#country-dropdown").val(user.country_name);

            var states = document.getElementById("state-dropdown");
            var cities = document.getElementById("city-dropdown");


            function setValue(selectElement, value) {
                var exists = false;
                for (var i = 0; i < selectElement.options.length; i++) {
                    if (selectElement.options[i].value == value) {
                        exists = true;
                    }
                }
                if (!exists) {
                    var option = new Option(value, value);
                    selectElement.options.add(option);
                }
                selectElement.value = value;
            }

            setValue(countries, user.country_name);
            setValue(states, user.state_name);
            setValue(cities, user.city_name);


            countries.innerHTML = "";
            country.forEach(function(country) {
                const option = new Option(country.name, country.id);
                countries.appendChild(option);
            });


            countries.addEventListener('change', function() {
                var selectedCountryId = this.value;


                var filteredStates = stateData.filter(function(state) {
                    return state.country_id == selectedCountryId;
                });

                states.innerHTML = "";
                filteredStates.forEach(function(state) {
                    const option = new Option(state.name, state.id);
                    states.appendChild(option);
                });


                states.dispatchEvent(new Event('change'));
            });


            states.addEventListener('change', function() {
                var selectedStateId = this.value;

                // Filter cities based on selected state
                var filteredCities = cityData.filter(function(city) {
                    return city.state_id == selectedStateId;
                });


                cities.innerHTML = "";
                filteredCities.forEach(function(city) {
                    const option = new Option(city.name, city.id);
                    cities.appendChild(option);
                });
            });
            $("#email").prop("readonly", true);

            countries.dispatchEvent(new Event('change'));
            $("#update").click(function() {
                console.log("user clicked on it");

                var formData = new FormData(document.getElementById('register_form'));
                formData.append('id', userid);
                console.log(userid)
                $.ajax({
                    url: 'api/update',
                    method: 'POST',
                    processData: false,
                    contentType: false,
                    async: false,
                    dataType: "json",
                    cache: false,
                    data: formData,

                    success: function(response) {
                        console.log(response);
                        if (response.message) {

                            $("#register_form").trigger("reset");
                            countries.innerHTML = "";
                            states.innerHTML = "";
                            cities.innerHTML = "";

                            $("#success").html("User details are updated successfully!").slideDown();
                            $("#success").show().delay(4000).fadeOut();

                        }
                    },

                    error: function(xhr, status, error) {
                        // Handle error response here
                        // console.log(xhr.responseText);

                        // Display error message or perform any other action

                    }
                });
            })



        },
    });

    function validateEmail(email) {
        // console.log(email);
        const regex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }
    var email;

    function validate(current_form) {
        var isvalid = true;
        var password, confirmPassword;
        current_form.find("input, select").each(function() {
            var fieldName = $(this).attr("name");
            var errorMessage;

            if (fieldName === "name") {
                errorMessage = "Please enter your name.";
            } else if (fieldName === "email") {
                email = document.getElementById("email").value;
                if (email === "") {
                    errorMessage = "Please enter your email.";
                }
            } else if (fieldName === "password") {
                password = $(this).val();
                console.log(password);
                errorMessage = "Please enter your password.";

            } else if (fieldName === "city") {
                errorMessage = "Please enter your city.";
            } else if (fieldName === "address") {
                errorMessage = "Please enter your address.";
            } else if (fieldName === "country") {
                errorMessage = "Please select your country.";
            } else if (fieldName === "state") {
                errorMessage = "Please select your state.";
            } else {
                errorMessage = "Please fill out this field.";
            }

            if (
                ($(this).is("input") && $(this).val() == "") ||
                ($(this).is("select") && $(this).prop("selectedIndex") == 0)
            ) {
                if (
                    $(this).next("p").length == 0 ||
                    $(this).next("p").text() != errorMessage
                ) {
                    $(this).next("p").remove();
                    $(this).after("<p>" + errorMessage + "</p>");
                }
                isvalid = false;
            } else {
                // Check if password and conf
                $(this).next("p").remove();
            }

        });
        return isvalid;
    }
    var form_count = 1,
        previous_form,
        next_form,
        total_forms;
    total_forms = $("fieldset").length;
    $(".next-form").click(function() {
        var pass = $("#password").val();
        var cpass = $("#password_confirmation").val();
        console.log(cpass);
        console.log(pass);
        var isvalid = true; // Set isvalid to true by default
        if (pass != "" || cpass != "") {
            if (pass.length < 8 || cpass.length < 8) {
                $("#confirm").html("Password must be at least 8 characters long");
                console.log("Password must be at least 8 characters long");
                isvalid = false;
            } else if (cpass == "") {
                $("#confirm").html("Please insert your confirm password");
                console.log("Cannot leave confirm password empty");
                isvalid = false;
            } else if (pass != cpass) {
                $("#confirm-1").html("Password and confirm password must be same");
                console.log("Passwords do not match");
                isvalid = false;
            } else {
                isvalid = true;
                $("#confirm").remove();
            }

        }
        // if (pass == cpass) {
        //     return isvalid = true;
        // }


        if ($(this).parent().find("input[name='password']").val() !== "" &&
            $(this).parent().find("input[name='password_confirmation']").val() !== "" &&
            $(this).parent().find("input[name='country']").val() == "" &&
            $(this).parent().find("input[name='state']").val() == "" &&
            $(this).parent().find("input[name='city']").val() == "") {
            // Only validate if password, confirm password, country, state, and city fields are not empty
            isvalid = validate($(this).parent());
        }

        if (isvalid) {
            $("#email_status").remove();
            $("email_error").remove();
            previous_form = $(this).parent();
            next_form = $(this).parent().next();
            next_form.show();
            previous_form.hide();
        }
    });


    $(".previous-form").click(function() {
        previous_form = $(this).parent();
        pre = $(this).parent().prev();
        pre.show();
        previous_form.hide();
    });
    $(document).ready(function() {
        var maxDate = new Date("2023-12-12");
        var currentDate = new Date();
        var currentmonth = new Date();

        $("#dob").attr("max", "2010-12-31");
    });
});