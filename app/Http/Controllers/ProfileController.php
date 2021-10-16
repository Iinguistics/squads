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

        // if ($request->hasFile('photo')) {
        //     $file = $request->file('photo');
        //     $filename = $file->getClientOriginalName();
        //     $file->storeAs('photo/' . $user->id, $filename, 's3');

        //     $results = Profile::where('id', $user->id)
        //         ->update([
        //             'photo' => $filename
        //         ]);
        // }

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = $file->getClientOriginalName();
            $path = $file->storeAs('photo/' . $user->id, $filename, 's3');
            Storage::disk('s3')->setVisibility($path, 'public');

            $results = Profile::where('id', $user->id)
                ->update([
                    'photo' => Storage::disk('s3')->url($path)
                ]);
        }

        $response = array(
            'success' => $results ? true : false,
            'error' => $results ? false : 'failed to upload photo'
        );

        return response()->json($response, 200);
    }

    public function update_profile_privacy_messaging(Request $request)
    {
        $user = Auth::user();

        $profile = Profile::where('id', $user->id)->get()->first();

        if ($profile->photo) {
            $response = array(
                'success' => true,
                'data' => $profile->photo
            );
            return response()->json($response, 200);
        } else {
            $response = array(
                'success' => false
            );
            return response()->json($response, 200);
        }
    }

    public function search_player_profile(Request $request)
    {
        $input = $request->all();

        $profile = User::where('platform', $input['platform'])
            ->where('gamertag', $input['gamertag'])
            ->get()->first();

        if ($profile) {
            $response = array(
                'success' => true,
                'id' => $profile->id
            );
            return response()->json($response, 200);
        } else {
            $response = array(
                'success' => false,
                'message' => 'profile not found'
            );
            return response()->json($response, 200);
        }
    }
}
