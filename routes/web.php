<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DropdownController;
use App\Http\Controllers\DeleteController;
use App\Http\Controllers\EmailCheck;
use App\Http\Controllers\Admin;
use App\Http\Controllers\ViewController;
use App\Http\Controllers\UpdateImageController;
use App\Http\Controllers\EditUserController;
use App\Http\Controllers\PaginationController;
use App\Http\Controllers\PageSpeedController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
// Route::get('admin/users',function(){
//     return view('users');
// });
Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::post('api/email', [EmailCheck::class, 'verifyEmail']);

Route::get('api/index', [DropdownController::class, 'index']);

Route::post('api/fetch-states', [DropdownController::class, 'fetchState']);

Route::post('api/fetch-cities', [DropdownController::class, 'fetchCity']);

Route::post('api/update',[EditUserController::class,'update']);

Route::post('api/update_image',[UpdateImageController::class,'updateImage']);

Route::post('api/edit',[EditUserController::class,'editUser']);

Route::get('api/admin',[Admin::class,'fetchuser']);

Route::post('api/view',[ViewController::class,'getUser']);

Route::get('pagination/fetch_data',[PaginationController::class,'fetch_data']);

Route::post('/analyze', [PageSpeedController::class,'analyze'])->name('analyze');


Route::get('/view',function (){
    return view('view');
});
Route::get('/edit',function(){
    return view('edit');
});

Route::get('/result',function (){
    return view('results');
});

Route::post('api/delete',[DeleteController::class,'deleteUser']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
