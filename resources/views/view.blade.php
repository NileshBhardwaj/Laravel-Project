<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
    <title>Document</title>
</head>
<style>
    #container {
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 350px;
        border: 2px solid;
    }

    div {
        display: flex;

        align-content: center;
        /* align-content: stretch; */
        /* justify-content: center; */
        align-items: center;
        /* align-content: space-between; */
        flex-direction: column;
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-size: 20px;
    }

    #seprator {
        width: 100%;
        height: 2px;
        background: black;
        margin-bottom: -8px;
    }

    .circle {
        width: 170px;
        height: 170px;
        border-radius: 50%;
        /* background-color: #000; */
        border: 2px solid black;
        box-shadow: 2px black;
        margin-bottom: 20px;
    }

    label {
        font-size: 20px;
        font-style: italic;
    }

    .user-info {
        font-size: 20px;
    }

    .h2,
    h2 {
        font-size: 2rem;
    }

    #modalImage {
        width: 170px;
        height: 170px;
        border-radius: 50%;
        background-color: #000;
        border: 2px solid black;
        box-shadow: 2px black;
        align-content: center;
        /* margin-left: 148px; */
    }

    #addproErr {
        color: red;
    }

    .circle {
        width: 170px;
        height: 170px;
        border-radius: 50%;
        background-color: #000;
        border: 2px solid black;
        box-shadow: 2px black;
    }

    #editButton {
        background-color: #4CAF50;
        /* Green */
        border: none;
        color: white;
        padding: 3px 18px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
    }

    /* img:hover {
    webkit-filter: blur(4px);
    filter: blur(4px);
} */
</style>

<body>
    <div>
        <div id="container">
            <div class="profile-img">
                <div id="image-container" style="position: relative;">
                    <img id="image" src="" alt="User Image" class="circle" data-toggle="modal"
                        data-target="#imageModal">
                    <button id="editButton"
                        style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); display: none;">Edit</button>
                </div>
            </div>






            <div id="seprator"></div>
            <p id="name"></p>
            <div id="seprator"></div>
            <p id="email"></p>
            <div id="seprator"></div>
            <p id="dob"></p>
            <div id="seprator"></div>
            <p id="address"></p>
            <div id="seprator"></div>

            <p id="country"></p>
            <div id="seprator"></div>

            <p id="state"></p>
            <div id="seprator"></div>

            <p id="city"></p>
            <div id="seprator"></div>

        </div>

        <div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-labelledby="imageModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="imageModalLabel">User Image</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img id="modalImage" src="" alt="User Image" class="img-fluid">
                    </div>
                    <div>
                        <span id="addproErr"></span>
                    </div>
                    <div class="modal-footer">
                        <input type="file" name="updateImage" id="updateImage" class="btn btn-secondary">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            id="updateButton">Update</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal"
                            id="cancelButton">Close</button>

                    </div>
                </div>
            </div>
        </div>
    </div>



    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>


    <script>
        var baseUrl = "{{ url('/') }}";
    </script>
    <script src="{{ asset('js/view.js') }}"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>


</body>

</html>
