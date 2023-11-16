<?php
namespace App\Http\Controllers;

use App\Models\User; 
use Illuminate\Http\Request;

class Admin extends Controller
{
    public function fetchuser(Request $request)
{
    $limit = $request->input('limit', 10); 
    $search = $request->input('search', ''); 
    $role_id = $request->input('role_id', 0); 

    $users = User::select('users.*', 'countries.name as country_name', 'states.name as state_name', 'cities.name as city_name')
        ->join('countries', 'users.country', '=', 'countries.id')
        ->join('states', 'users.state', '=', 'states.id')
        ->join('cities', 'users.city', '=', 'cities.id')
        ->where('users.role_id', 0) 
        ->where('users.is_deleted',0);
       
        if ($search) {
            $users = $users->where(function ($query) use ($search) {
                $query->where('users.name', 'like', "%{$search}%")
                    ->orWhere('users.email', 'like', "%{$search}%")
                    ->orWhere('users.dob', 'like', "%{$search}%")
                    ->orWhere('users.address','like',"%{$search}%")
                    ->orWhere('countries.name','like',"%{$search}%")
                    ->orWhere('states.name','like',"%{$search}%")
                    ->orWhere('cities.name','like',"%{$search}%");
            });
        }
    $users = $users->paginate($limit); 

    return response()->json($users); 
}


    
}

