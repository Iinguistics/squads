<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Profile;
use App\Image;
use App\ImageComment;

use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;



class ImageController extends Controller
{

    public function index()
    {
    }

    public function upload_current_user_image(Request $request)
    {
        $user = Auth::user();
        $input = $request->all();

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = $file->getClientOriginalName();
            $path = $file->storeAs('profileImage/' . $user->id, $filename, 's3');
            Storage::disk('s3')->setVisibility($path, 'public');

            $results = Image::create([
                "id" => $user->id,
                "image" => Storage::disk('s3')->url($path),
                "description" => $input['description']
            ]);
        }

        $response = array(
            'success' => $results ? true : false,
            'error' => $results ? false : 'failed to upload image'
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
}
