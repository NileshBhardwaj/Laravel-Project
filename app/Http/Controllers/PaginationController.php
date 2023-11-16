<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Don't forget to import your User model at the top

class PaginationController extends Controller
{
    function fetch_data(Request $request)
    {
        if($request->ajax())
        {
            $data = User::paginate(10); // This will paginate the users data by 5 per page.
            dd($data); // 'ajax-pagination' should be your blade file for showing users data.
        }
    }
}
