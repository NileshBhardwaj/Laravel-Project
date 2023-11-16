<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; 

class ViewController extends Controller
{
    public function getUser(Request $request)
    {
        $user = User::find($request->user_id); 
    
        if ($user) {
            $userDetails = User::where('users.id', $request->user_id)
                ->join('countries', 'users.country', '=', 'countries.id')
                ->join('states', 'users.state', '=', 'states.id')
                ->join('cities', 'users.city', '=', 'cities.id')
                ->select('users.*', 'countries.name as country_name', 'states.name as state_name', 'cities.name as city_name')
                ->first();
    
            return response()->json($userDetails);
        }
    }
    
}
