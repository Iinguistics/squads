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

    public function get_user_messages()
    {
        $user = Auth::user();

        $results = Message::where('id', $user->id)->get();

        $response = array(
            'success' => $results ? true : false,
            'data' => $results ? $results : null
        );
        return response()->json($response, 200);
    }

    public function get_converstaion_messages($id)
    {
        $user = Auth::user();

        $results = array();

        //sent to
        $sent_to = Message::where('id', $user->id)
            ->where('sent_from_id', $id)
            ->get();

        //sent from
        $sent_from = Message::where('id', $id)
            ->where('sent_from_id', $user->id)
            ->get();

        array_push($results, $sent_to, $sent_from);

        $response = array(
            'success' => $results ? true : false,
            'data' => $results ? $results : null,
            'sent_from' => $id
        );
        return response()->json($response, 200);
    }

    public function get_user_unread_messages()
    {
        $user = Auth::user();

        $results = Message::where('id', $user->id)->where('message_read', 0)->get();

        $response = array(
            'success' => $results ? true : false,
            'data' => $results ? $results : null
        );
        return response()->json($response, 200);
    }


    public function send_user_message(Request $request)
    {
        $user = Auth::user();

        $input = $request->all();

        $results = Message::create([
            "id" => $input['id'],
            "body" => $input['body'],
            "sent_from_id" => $user->id,
            "sent_from_username" => $user->username,
        ]);

        $response = array(
            'success' => $results ? true : false,
            'error' => $results ? false : 'failed to send message'
        );
        return response()->json($response, 200);
    }
}
