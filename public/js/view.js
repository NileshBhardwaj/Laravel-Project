$(document).ready(function() {
    fetchUser();
    $('#image-container').hover(
        function() {
            $(this).children('img').css('filter', 'blur(5px)');
            $(this).children('button').show();
        },
        function() {
            $(this).children('img').css('filter', 'none');
            $(this).children('button').hide();
        }
    );


    function fetchUser() {
        console.log("user");
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('param1');
        console.log(myParam);
        $.ajax({
            type: 'POST',
            url: '/api/view',
            data: {
                user_id: myParam
            },
            success: function(result) {
                console.log(result);
                if (result) {
                    var addprofile = result.image_name || 'download.png';
                    var imgPath = baseUrl + '/images/' + addprofile;
                    $('#modalImage').attr('src', imgPath);

                    $('#image').attr('src', imgPath);
                    var id = result.id;
                    console.log(id);
                    $('#name').text("Name: " + result.name);
                    $('#email').text("Email: " + result.email);
                    $('#dob').text("Date of birth: " + result.dob);
                    $('#address').text("Address: " + result.address);
                    $('#country').text("Country: " + result.country_name);
                    $('#state').text("State: " + result.state_name);
                    $('#city').text("City: " + result.city_name);

                }
                $('#editButton').click(function() {
                    var addprofile = result.addprofile || 'download.png';
                    var imgPath = baseUrl + '/images/' + addprofile;
                    $('#modalImage').attr('src', imgPath);
                    $('#imageModal').modal('show');
                    // document.getElementById('updateButton').style.display = 'block';

                    // Hide the update button
                    document.getElementById('updateButton').style.display = 'none';

                    document.getElementById('updateImage').addEventListener('click', function(event) {
                        event.preventDefault();

                        const filePicker = document.createElement('input');
                        filePicker.type = 'file';

                        filePicker.addEventListener('change', function(event) {
                            if (event.target.files.length === 0) {
                                // No file was selected
                                return;
                            }
                            const file = event.target.files[0];
                            console.log(file);
                            const allowedExtensions = ["jpg", "jpeg", "png"];
                            const fileName = file.name;

                            const fileExtension = fileName.split(".").pop().toLowerCase();
                            var isValid = true;
                            const addproElement = document.getElementById("addproErr");
                            if (!allowedExtensions.includes(fileExtension)) {
                                addproElement.innerHTML = "* Please select a valid image type (JPEG, JPG, PNG)";
                                isValid = false;


                                // Update the modal image with the new file.
                                document.getElementById('modalImage').src = URL.createObjectURL(file);
                                document.getElementById('cancelButton').style.display = 'none';
                                document.getElementById('updateButton').style.display = 'block';


                            } else {
                                addproElement.innerHTML = "";

                            }
                            if (isValid == true) {
                                document.getElementById('modalImage').src = URL.createObjectURL(file);
                                document.getElementById('cancelButton').style.display = 'none';
                                document.getElementById('updateButton').style.display = 'block';

                                $("#updateButton").click(function() {
                                    var formData = new FormData();
                                    console.log(formData);
                                    formData.append('addprofile', file); // Append the new image file
                                    formData.append('id', id);

                                    $.ajax({
                                        url: 'api/update_image', // Server-side script path
                                        type: 'POST',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        success: function(response) {
                                            // Handle success here
                                            if (response) {
                                                fetchUser();
                                                console.log(response)
                                            }
                                        },
                                        error: function(jqXHR, textStatus, errorMessage) {
                                            // Handle error here

                                        }
                                    });
                                });
                            }
                        });

                        filePicker.click();
                    });
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {



            }
        })
    }
});