<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserAuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->group(function () {

//     // Users
//     Route::get('logout', [UserAuthController::class, 'logout']);
// });



// Users
Route::post('register', [UserAuthController::class, 'register']);
Route::post('login', [UserAuthController::class, 'login']);
Route::post('password_reset_request', [UserAuthController::class, 'password_reset_request']);
Route::post('password_reset_verify_pin', [UserAuthController::class, 'password_reset_verify_pin']);
Route::post('password_reset_update', [UserAuthController::class, 'password_reset_update']);

Route::middleware('auth:sanctum')->group(function () {
    // Users
    Route::get('current_user', [UserAuthController::class, 'current_user']);
    Route::get('logout', [UserAuthController::class, 'logout']);
});
