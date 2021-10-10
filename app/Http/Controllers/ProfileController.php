<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Profile;

use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;



class ProfileController extends Controller
{

    public function index()
    {
    }

    public function show_current_user_profile()
    {
        $user = Auth::user();

        $profile = Profile::where('id', $user->id)->get();

        $response = array(
            'success' => $profile ? true : false,
            'data' => $profile,
            'error' => $profile ? false : "failed to retrieve profile"
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

    public function update_current_user_profile(Request $request)
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

    public function update_current_user_profile_photo(Request $request)
    {
        $user = Auth::user();

        $results = null;

        // if ($request->hasFile('photo')) {
        //     $file = $request->file('photo');
        //     $filename = $file->getClientOriginalName();
        //     $file->storeAs('photo/' . $user->id, $filename, 's3');

        //     $results = Profile::where('id', $user->id)
        //         ->update([
        //             'photo' => $filename
        //         ]);
        // }

        $response = array(
            'success' => $results ? true : false,
            'data' => $request->hasFile('photo'),
            'error' => $results ? false : 'failed to upload photo'
        );

        return response()->json($response, 200);
    }

    public function get_current_user_profile_photo(Request $request)
    {
        $user = Auth::user();

        $profile = Profile::where('id', $user->id)->get()->first();

        if ($profile->photo) {
            return Storage::disk('s3')->response('photo/' . $user->id . '/' . $profile->photo);
        } else {
            $response = array(
                'success' => false
            );
            return response()->json($response, 200);
        }
        // return $profile->photo;
    }
}
