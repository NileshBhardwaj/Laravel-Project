<?php

namespace App\Http\Controllers;
use App\Models\User; 
use Illuminate\Http\Request;

class UpdateImageController extends Controller
{
    public function updateImage(Request $request) {
        if($request->hasFile('addprofile')) {
            $file = $request->file('addprofile');
            $extension = $file->getClientOriginalExtension();
            $fileName = time().'.'.$extension;
            $path = public_path().'/images';
            $file->move($path, $fileName);
    
          
            $id = $request->input('id');
    
           
            User::where('id', $id)->update(['image_name' => $fileName]);
            User::where('id', $id)->update(['image_url' => asset('public/images/'.$fileName)]);

            return response()->json(['message' => 'User image  updated successfully']);
        }
    }
}    
