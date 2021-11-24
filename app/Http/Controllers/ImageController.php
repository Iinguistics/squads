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

    public function get_image_comments($id)
    {
        $comments = ImageComment::where('image_id', $id)->with('user.profile')->get();

        $response = array(
            'success' => $comments ? true : false,
            'data' => $comments
        );

        return response()->json($response, 200);
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

    public function send_image_comment(Request $request)
    {
        $user = Auth::user();

        $input = $request->all();

        $results = ImageComment::create([
            "image_id" => $input['image_id'],
            "id" => $user->id,
            "body" => $input['body'],
        ]);

        $response = array(
            'success' => $results ? true : false,
            'error' => $results ? false : 'failed to send comment'
        );
        return response()->json($response, 200);
    }

    public function update_image_description(Request $request)
    {
        $input = $request->all();

        $updatedImage = Image::find($input['image_id'])->update(['description' => $input['description']]);

        $response = array(
            'success' => $updatedImage ? true : false,
            'error' => $updatedImage ? false : 'failed to update image'
        );
        return response()->json($response, 200);
    }
}
