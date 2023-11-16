<?php

namespace App\Http\Controllers;
use App\Models\User; 
use Illuminate\Http\Request;

class DeleteController extends Controller
{
  
    public function deleteUser(Request $request)
    {
        $user = User::where("email", $request->email);
    
        if ($user) {
            $user->update(['is_deleted' => 1]);

            return response()->json(['message' => 'User deleted successfully']);
        } else {
            return response()->json(['message' => 'No user found with this email'], 404);
        }
    }
    
}

