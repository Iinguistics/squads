<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use App\User;
use App\Profile;

use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;



class ProfileController extends Controller
{

    public function index()
    {
    }

    public function show_current_user()
    {
        $user = Auth::user();

        $profile = Profile::where('id', $user->id)->get();

        $response = array(
            'success' => $profile ? true : false,
            'data' => $profile,
        );

        return response()->json($response, 200);
    }

    public function show($id)
    {
        $profile = Profile::find($id);

        $response = array(
            'success' => $profile ? true : false,
            'data' => $profile,
        );

        return response()->json($response, 200);
    }

    public function update_current_user(Request $request)
    {
        $user = Auth::user();

        $input = $request->all();

        $results = Profile::where('id', $user->id)
            ->update($input);


        $response = array(
            'success' => $results ? true : false,
            'data' => $results,
        );

        return response()->json($response, 200);
    }
}
