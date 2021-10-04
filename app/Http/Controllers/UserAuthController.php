<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cookie;


use App\User;
use App\PasswordReset;
use App\Profile;

use App\Mail\UserRegistered;
use App\Mail\PasswordResetRequest;
use Mockery\Undefined;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class UserAuthController extends Controller
{

    public function current_user()
    {
        return Auth::user();
    }

    public function register(Request $request)
    {
        $input = $request->all();

        $input['password'] = bcrypt($input['password']);

        $emails = app('App\Http\Controllers\UserController')->fetchAllUsersEmail();
        if (in_array($input['email'], $emails)) {
            $response = array(
                'success' => false,
                'error' => "email already in use.",
            );
            return response()->json($response, 200);
        } else {
            $user = User::create(array(
                "email" => $input['email'],
                "platform" => $input['platform'],
                "gamertag" => $input['gamertag'],
                "activision_username" => $input['activision_username'] ? $input['activision_username'] : null,
                "password" => $input['password'],
            ));
        }

        // un-comment for prod
        if ($user) {
            //Mail::to($user->email)->send(new UserRegistered($user));
            $user_profile_init = Profile::create(array(
                "id" => $user->id
            ));
        }

        $response = array(
            'success' => $user ? true : false,
            //'data' => $user ? $user : null,
            'error' => $user ? null : 'failed to register user',
        );
        return response()->json($response, 200);
    }

    public function login(Request $request)
    {
        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password, 'active' => 1])) {
            return response([
                'message' => 'Invalid credentials'
            ], HttpFoundationResponse::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $token = $user->createToken('token')->plainTextToken;

        $cookie = cookie('jwt', $token, 21600); // in minutes 21600 = 15 days

        // return response([
        //     'success' => $user ? true : false,
        //     'data' => $user ? $user : null,
        //     'error' => $user ? null : 'failed to register user',

        // ])->withCookie($cookie);

        $response = array(
            'success' => $user ? true : false,
            'data' => $user ? $user : null,
            'error' => $user ? null : 'failed to register user',
        );

        return response()->json($response, 200)->withCookie($cookie);
    }

    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response([
            'success' => true
        ], 200)->withCookie($cookie);
    }

    public function password_reset_request(Request $request)
    {

        $input = $request->all();

        $emails = app('App\Http\Controllers\UserController')->fetchAllUsersEmail();
        if (!in_array($input['email'], $emails)) {
            $response = array(
                'success' => false,
                'error' => "Invalid email.",
            );
            return response()->json($response, 200);
        }

        $pool = '0123456789';
        $random_pin = substr(str_shuffle(str_repeat($pool, 3)), 0, 6);

        $pin_created = PasswordReset::create(array(
            "email" => $input['email'],
            "pin" => $random_pin,
        ));

        // un-comment for prod
        // if ($pin_created) {
        //     Mail::to($pin_created->email)->send(new PasswordResetRequest($pin_created));
        // }

        $response = array(
            'success' => $pin_created ? true : false,
            'error' => "failed to create verification reset",
        );
        return response()->json($response, 200);
    }

    public function password_reset_verify_pin(Request $request)
    {

        $input = $request->all();

        $reset_data = PasswordReset::where('email', $input['email'])
            ->where('pin', $input['pin'])
            ->latest()->first();

        if (!$reset_data) {
            $response = array(
                'success' => false,
                'error' => "Invalid credentials",
            );
            return response()->json($response, 200);
        }

        $created_at = $reset_data->created_at;
        $expire_time = date("Y-m-d H:i:s", strtotime("$created_at +2 hours"));
        $current_time = date("Y-m-d H:i:s");

        $pin_expired = $current_time > $expire_time;

        if ($pin_expired) {
            $response = array(
                'success' => false,
                'error' => "This pin # has expired",
            );
            return response()->json($response, 200);
        }

        $response = array(
            'success' => true,
            'error' => "pin verification failed",
        );
        return response()->json($response, 200);
    }

    public function password_reset_update(Request $request)
    {

        $input = $request->all();

        $input['password'] = bcrypt($input['password']);

        $update_user = User::where('email', $input['email']);

        $update_user->update(array('password' => $input['password']));

        $response = array(
            'success' => $update_user ? true : false,
            'error' => "failed to update password",
        );
        return response()->json($response, 200);
    }

    public function account_destroy(Request $request)
    {
        $user = Auth::user();

        if (!Auth::guard('web')->attempt(['email' => $user->email, 'password' => $request->password, 'active' => 1])) {
            return response([
                'error' => 'Invalid credentials'
            ], 200);
        }

        $destroyed_user = User::where('email', $user['email']);

        $destroyed_user->update(array('active' => 0));

        $response = array(
            'success' => $destroyed_user ? true : false,
            'error' => $destroyed_user ? null : "failed to delete account",
        );
        return response()->json($response, 200);
    }

    public function update_current_user_account(Request $request)
    {
        $user = Auth::user();

        $input = $request->all();

        $results = User::where('id', $user->id)
            ->update($input);


        $response = array(
            'success' => $results ? true : false,
            'data' => $results,
        );

        return response()->json($response, 200);
    }

    public function update_current_user_account_email(Request $request)
    {
        $user = Auth::user();

        $input = $request->all();

        $emails = app('App\Http\Controllers\UserController')->fetchAllUsersEmail();
        if (in_array($input['email'], $emails)) {
            $response = array(
                'success' => false,
                'error' => "email already in use.",
            );
            return response()->json($response, 200);
        }

        $results = User::where('id', $user->id)
            ->update($input);


        $response = array(
            'success' => $results ? true : false,
            'data' => $results,
        );

        return response()->json($response, 200);
    }
}
