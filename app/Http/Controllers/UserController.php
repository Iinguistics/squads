<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

use App\User;


class UserController extends Controller
{

    public function fetchAllUsersEmail()
    {
        //$users = User::all();
        $users = User::where('active', 1)->get();
        $emails = array();
        foreach ($users as $user) {
            array_push($emails, $user->email);
        }
        return $emails;
    }
}
