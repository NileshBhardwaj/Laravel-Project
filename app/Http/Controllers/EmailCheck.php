<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Email;
class EmailCheck extends Controller
{
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);
        
        $email = $request->input('email');

        if (User::where('email', $email)->exists()) {
            return response()->json([
                'message' => true,
            ]);
        }else{
        return response()->json([
            'message' => false,
        ]);
    }
    }
}
