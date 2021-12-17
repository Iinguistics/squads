<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\SquadController;



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
    // User / auth
    Route::get('current_user', [UserAuthController::class, 'current_user']);
    Route::get('logout', [UserAuthController::class, 'logout']);
    Route::put('account_destroy', [UserAuthController::class, 'account_destroy']);
    Route::put('update_current_user_account', [UserAuthController::class, 'update_current_user_account']);
    Route::put('update_current_user_account_password', [UserAuthController::class, 'update_current_user_account_password']);


    // Profile
    Route::get('profile/{id}', [ProfileController::class, 'show']);
    Route::get('show_current_user_profile', [ProfileController::class, 'show_current_user_profile']);
    Route::put('update_current_user_profile', [ProfileController::class, 'update_current_user_profile']);
    Route::post('update_current_user_profile_photo', [ProfileController::class, 'update_current_user_profile_photo']);
    Route::put('update_profile_privacy_messaging', [ProfileController::class, 'update_profile_privacy_messaging']);
    Route::post('search_player_profile', [ProfileController::class, 'search_player_profile']);



    // Image
    Route::post('upload_current_user_image', [ImageController::class, 'upload_current_user_image']);
    Route::get('get_image_comments/{id}', [ImageController::class, 'get_image_comments']);
    Route::post('send_image_comment', [ImageController::class, 'send_image_comment']);
    Route::put('update_image_description', [ImageController::class, 'update_image_description']);
    Route::post('destroy_image', [ImageController::class, 'destroy_image']);

    // Message
    Route::get('get_user_messages', [MessageController::class, 'get_user_messages']);
    Route::get('get_user_unread_messages', [MessageController::class, 'get_user_unread_messages']);
    Route::post('send_user_message', [MessageController::class, 'send_user_message']);
    Route::get('get_converstaion_messages/{id}', [MessageController::class, 'get_converstaion_messages']);


    // Squads
    Route::get('fetch_my_squads', [SquadController::class, 'fetch_my_squads']);
    Route::get('fetch_squad/{id}', [SquadController::class, 'fetch_squad']);
    Route::post('create_squad', [SquadController::class, 'create_squad']);
    Route::get('check_squad_teammate/{id}', [SquadController::class, 'check_squad_teammate']);
    Route::post('create_squad_invite', [SquadController::class, 'create_squad_invite']);
    Route::get('fetch_squad_invites', [SquadController::class, 'fetch_squad_invites']);
    Route::post('reject_squad_invite', [SquadController::class, 'reject_squad_invite']);
    Route::post('accept_squad_invite', [SquadController::class, 'accept_squad_invite']);
    Route::post('create_squad_request', [SquadController::class, 'create_squad_request']);
    Route::get('fetch_squad_requests/{id}', [SquadController::class, 'fetch_squad_requests']);

    Route::get('check_is_admin/{id}', [SquadController::class, 'check_is_admin']);
    Route::put('update_banner_font/{id}', [SquadController::class, 'update_banner_font']);
});
