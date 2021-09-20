<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\User;

use App\Mail\UserRegistered;


class UserAuthController extends Controller
{

    public function register(Request $request)
    {
        $input = $request->all();

        $input['password'] = bcrypt($input['password']);

        $emails = app('App\Http\Controllers\UserController')->fetchAllUsersEmail();
        if (in_array($input['email'], $emails)) {
            $response = array(
                'data' => null,
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

        if ($user) {
            Mail::to($user->email)->send(new UserRegistered($user));
        }

        $response = array(
            'success' => $user ? true : false,
            'data' => $user ? $user : null,
            'error' => $user ? null : 'failed to register user'
        );
        return response()->json($response, 200);
    }
}
