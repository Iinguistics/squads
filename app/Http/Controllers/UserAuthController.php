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

use App\Mail\UserRegistered;
use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;

class UserAuthController extends Controller
{

    public function user()
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
        // if ($user) {
        //     Mail::to($user->email)->send(new UserRegistered($user));
        // }

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

        // $response = array(
        //     'success' => $user ? true : false,
        //     'data' => $user ? $user : null,
        //     'error' => $user ? null : 'failed to register user',
        // );
        // return response()->json($response, 200)->withCookie($cookie);

        // return response([
        //     'message' => $token
        // ])->withCookie($cookie);

        return response([
            'message' => 'still work??'
        ])->withCookie($cookie);
    }

    public function logout()
    {
        // if (Auth::check()) {
        //     Auth::logout();
        //     return response()->json(['success' => true], 200);
        // } else {
        //     $user = Auth::user();
        //     return response()->json(['success' => false, 'data' => $user], 500);
        // }

        $cookie = Cookie::forget('jwt');

        return response([
            'message' => 'Success'
        ])->withCookie($cookie);
    }
}
