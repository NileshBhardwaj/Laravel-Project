<?php

namespace App\Http\Controllers;
use App\Models\User; 
use App\Models\Country;
use App\Models\State;
use App\Models\City;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EditUserController extends Controller
{
    
    public function editUser(Request $request)
    {
        $user = User::find($request->user_id); 
    
        if ($user) {
            $userDetails = User::where('users.id', $request->user_id)
                ->join('countries', 'users.country', '=', 'countries.id')
                ->join('states', 'users.state', '=', 'states.id')
                ->join('cities', 'users.city', '=', 'cities.id')
                ->select('users.*', 'countries.name as country_name', 'states.name as state_name', 'cities.name as city_name')
                ->first();
    
            $data['userDetails'] = $userDetails;
            $data['countries'] = Country::get(["name", "id"]);
            $data['states'] = State::get(["name", "id","country_id"]);
            $data['cities'] = City::get(["name", "id","state_id"]);
    
            return response()->json($data);
        }
    }
    public function update(Request $request)
    {
        $user = User::find($request->id);
    //    dd($user);

        if (!empty($request->password)) {
      
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->address = $request->address;
        $user->country = $request->country;
        $user->state = $request->state;
        $user->city = $request->city;
        $user->dob = $request->dob;
        } else {
       
        $user->name = $request->name;
        $user->email = $request->email;
        
        $user->address = $request->address;
        $user->country = $request->country;
        $user->state = $request->state;
        $user->city = $request->city;
        $user->dob = $request->dob;
        }
    
    $user->save();
    return response()->json(['message' => 'User image  updated successfully']);
        }
    }
