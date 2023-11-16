$(document).ready(function () {
    $('.ml-4').on('click',function(){
      var birth = $("#dob").val();
      if(birth == ""){
      $("#dob_error").html("Please select your date of birth.")
      }
    })
    var form_count = 1,
        previous_form,
        next_form,
        total_forms;
    total_forms = $("fieldset").length;
    $(".next-form").click(function () {
        var isvalid_s = false;
        var isvalid = validate($(this).parent());
        // console.log(isvalid);
        if (isvalid) {
            email = document.getElementById("email").value;
            if (email != "") {
                $.ajax({
                    async: false,
                    method: "POST",
                    url: "/api/email",
                    data: { email: email },

                    success: function (data) {
                        dataResponse = data;
                        // console.log(dataResponse);
                        if (data.message == true) {
                            isvalid_s = false;
                            $("#email_status").html("Email already exists");

                            // alert("Email already exists");
                            isvalid_s = false;
                            errorMessage = "Email already exists";
                            // Display the error message
                        } else if (data.message == false) {
                            // console.log("Email does not exist");
                            isvalid_s = true;
                        }
                        // if (isvalid_s == true) {
                        console.log(isvalid_s);
                        //     previous_form = $(this).parent();

                        //     next_form = $(this).parent().next();
                        console.log(next_form);
                        //     next_form.show();
                        //     previous_form.hide();
                        // }
                    },
                });
                // alert("Please enter your email");
            }
        }
        if (isvalid_s) {
            $("#email_status").remove();
            $("email_error").remove();
            previous_form = $(this).parent();
            // console.log(previous_form);
            next_form = $(this).parent().next();
            // console.log(next_form);
            next_form.show();
            previous_form.hide();
        }
    });
    $(".previous-form").click(function () {
        previous_form = $(this).parent();
        pre = $(this).parent().prev();
        pre.show();
        previous_form.hide();
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
        current_form.find("input, select").each(function () {
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

                errorMessage = "Please enter your password.";
            } else if (fieldName === "city") {
            } else if (fieldName === "password_confirmation") {
                confirmPassword = $(this).val();
                errorMessage = "Please enter your confirm password.";
            } else if (fieldName === "address") {
                errorMessage = "Please enter your address.";
            // } else if (fieldName === "dob") {
            //     errorMessage = "Please enter your date of birth.";
            // 
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
            if (fieldName === "city") {
                // isvalid = false;
                $(this).next("p").remove();
                console.log("city error");
                $("#city_error").html("Please Select your city.");
            }
            if (fieldName === "password") {
                if (password != "" && password.length < 8) {
                    isvalid = false;
                    errorMessage =
                        "Your password should contain minimum 8 character .";
                    current_form
                        .find("input[name='password']")
                        .next("p")
                        .remove();
                    current_form
                        .find("input[name='password']")
                        .after("<p>" + errorMessage + "</p>");
                }
            }
        });
        if (!validateEmail(email)) {
            // console.log("not valid");
            $("#email_status").remove();
            errorMessage = "Please enter a valid email."; // Changed message

            current_form.find("input[name='email']").next("p").remove();
            current_form
                .find("input[name='email']")
                .after("<p>" + errorMessage + "</p>");
            isvalid = false;
        }

        if (password !== confirmPassword) {
            isvalid = false;
            errorMessage = "Password and Confirm Password must be the same.";
            current_form
                .find("input[name='password_confirmation']")
                .next("p")
                .remove();
            current_form
                .find("input[name='password_confirmation']")
                .after("<p>" + errorMessage + "</p>");
        }

        return isvalid;
    }

    $(document).ready(function () {
        var maxDate = new Date("2023-12-12");
        var currentDate = new Date();
        var currentmonth = new Date();

        $("#dob").attr("max", "2010-12-31");
    });

    $("#country-dropdown").html("");
    $.ajax({
        url: "/api/index",
        type: "GET",
        data: {
            // Your data here
        },
        dataType: "json",
        success: function (result) {
            $("#country-dropdown").html(
                '<option value="">-- Select Country --</option>'
            );
            $.each(result.countries, function (key, value) {
                $("#country-dropdown").append(
                    '<option value="' +
                        value.id +
                        '">' +
                        value.name +
                        "</option>"
                );
            });
            $("#state-dropdown").html(
                '<option value="">-- Select State --</option>'
            );
            $("#city-dropdown").html(
                '<option value="">-- Select City --</option>'
            );
        },
    });

    $("#country-dropdown").on("change", function () {
        var idCountry = this.value;
        $("#state-dropdown").html("");

        $.ajax({
            url: "/api/fetch-states",
            type: "POST",
            data: {
                country_id: idCountry,
                _token: "{{csrf_token()}}",
            },
            dataType: "json",
            success: function (result) {
                $("#state-dropdown").html(
                    '<option value="">-- Select State --</option>'
                );
                $.each(result.states, function (key, value) {
                    $("#state-dropdown").append(
                        '<option value="' +
                            value.id +
                            '">' +
                            value.name +
                            "</option>"
                    );
                });
                $("#city-dropdown").html(
                    '<option value="">-- Select City --</option>'
                );
            },
        });
    });

    $("#state-dropdown").on("change", function () {
        var idState = this.value;
        $("#city-dropdown").html("");
        $.ajax({
            url: "api/fetch-cities",
            type: "POST",
            data: {
                state_id: idState,
                _token: "{{csrf_token()}}",
            },
            dataType: "json",
            success: function (res) {
                $("#city-dropdown").html(
                    '<option value="">-- Select City --</option>'
                );
                $.each(res.cities, function (key, value) {
                    $("#city-dropdown").append(
                        '<option value="' +
                            value.id +
                            '">' +
                            value.name +
                            "</option>"
                    );
                });
            },
        });
    });
});
