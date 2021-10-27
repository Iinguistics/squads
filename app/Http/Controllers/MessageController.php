<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Profile;
use App\Message;



class MessageController extends Controller
{

    public function send_user_message(Request $request)
    {
        $user = Auth::user();

        $input = $request->all();

        $results = Message::create([
            "id" => $input['id'],
            "body" => $input['body'],
            "sent_from_id" => $user->id
        ]);

        $response = array(
            'success' => $results ? true : false,
            'error' => $results ? false : 'failed to send message'
        );
        return response()->json($response, 200);
    }
}
