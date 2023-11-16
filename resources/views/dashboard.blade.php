<x-app-layout>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/css/bootstrap-grid.min.css"
        integrity="sha512-ZuRTqfQ3jNAKvJskDAU/hxbX1w25g41bANOVd1Co6GahIe2XjM6uVZ9dh0Nt3KFCOA061amfF2VeL60aJXdwwQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <x-slot name="header">
        <h2 id="dashboard"class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            {{ __('Dashboard') }}

        </h2>
        <h2 id="admin-msg"class="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">

            Welcome Admin
        </h2>
        <form method="POST" action="/logout"></form>
        <form method="POST" action="logout">
            <input type="hidden" name="_token" value="PrAVoKn9sRBe3CEdwLjR9MHxLtmeia0lbk3WcHO2" autocomplete="off">
            <a id="logout"class="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 focus:outline-none focus:text-gray-800 dark:focus:text-gray-200 focus:bg-gray-50 dark:focus:bg-gray-700 focus:border-gray-300 dark:focus:border-gray-600 transition duration-150 ease-in-out"
                href="http://127.0.0.1:8000/logout"
                onclick="event.preventDefault();
                                        this.closest('form').submit();">
                Log Out
            </a>
    </x-slot>
    <!--
    <div class="py-12" id="hide">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900 dark:text-gray-100"> -->

    @if (Auth::user()->role_id == 1)
        <!-- <span id="admin">You are logged in as super admin</span> -->
        <span id="delete_user"></span>
        <div class="form-group">


            <!-- <input type="text" id="url" name="url" placeholder="Enter URL" style="border-radius: 15px;font-size: 17px;margin-right: 2px;font-size: 17px;">                 -->
            <button type="button" id="analyze" class="btn btn-warning" style="margin-right: 39%;">Analyze</button>



            <input type="text"id="myInput" class="topnav" placeholder="Search..">
            <label for="limit">Select Limit</label>
            <select id="paginationLimit" class="">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="100">100</option>
            </select>
        </div>
        <div class="main-container">

            <div id="container">
                <div id="responseContainer"></div>
                <div id="pagination1">

                </div>
            </div>
        </div>




        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

        <!-- Add this line to your form -->
        <input type="hidden" id="role_id" value="{{ Auth::user()->role_id }}">


        <script src="{{ asset('js/admin.js') }}"></script>
        <div class="modal" id="myModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Delete User</h5>
                        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p></p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal"id="okay">Save
                            changes</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- </div>
            </div>
        </div>
    </div> -->
        <!-- <div class="modal" id="MyModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Analytics of the Webpage</h5>
        <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="PZeSbe"><div class="XErri tmOOye"></div>
      <span class="h1llh">Largest Contentful Paint (LCP)</span>
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-dismiss="modal"id="okay">Save changes</button>
      </div>
    </div>
  </div>
</div> -->
    @endif


</x-app-layout>
<style>
    div#pagination1 {
        width: 38%;
    }

    .topnav {
        margin-right: 1%;
        width: 500px;
        height: 40px;
        border-radius: 15px;
        font-size: 20px;
    }

    .topnav [type=text] {
        float: right;
        padding: 6px;
        border: none;
        margin-top: 8px;
        margin-right: 16px;
        font-size: 17px;
    }

    #paginationLimit {
        margin-right: 39px;
        border-radius: 8px;
    }

    .form-group {
        margin-bottom: 15px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: -4px;
        font-size: 22px;
        margin-right: 13px;
    }

    .pagination {
        display: flex;
        padding-left: 0;
        margin: 20px 0;
        border-radius: 4px;
        align-items: center;
        flex-direction: row;
        justify-content: space-around;
        font-size: 23px;
        background-color: #8080802e;
    }

    #logout {
        font-size: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-left: 307px;
    }

    #admin-msg {
        font-size: 30px;
    }

    #container {
        background-color: #fff;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 96%;
        border: 2px solid;
        margin-bottom: 50px;

        /* margin-left: 152px; */
    }

    .main-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    body {
        font-family: Arial, sans-serif;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-size: 20px;
    }

    th {
        background-color: #f2f2f2;
    }

    .button-container {
        display: flex;
        justify-content: space-between;
    }

    .button-container button {
        padding: 6px 12px;
        margin-right: 5px;
        cursor: pointer;
    }

    .edit-button {
        background-color: #4CAF50;
        color: white;
        border-radius: 4px;
        border: none;
    }

    .view-button {
        background-color: #2196F3;
        color: white;
        border-radius: 4px;
        border: none;
    }

    .delete-button {
        background-color: #f44336;
        color: white;
        border-radius: 4px;
        border: none;
    }

    a.btn.btn-primary {
        margin-left: 93%;
        margin-bottom: 10px;
    }

    #admin {
        /* display: none; */
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #dff0d8;
        color: #30892f;
        padding: 13px;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 21px;
        /* margin-left: 590px; */
        flex-direction: row;
    }

    #delete_user {
        display: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #dff0d8;
        color: #30892f;
        padding: 13px;
        margin-bottom: 10px;
        border-radius: 4px;
        font-size: 21px;
        /* margin-left: 590px; */
        flex-direction: row;
    }
</style>
