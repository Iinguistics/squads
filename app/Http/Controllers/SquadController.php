<?php

namespace App\Http\Controllers;

use Config;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

use App\User;
use App\Profile;
use App\Squad;
use App\SquadMember;

use Symfony\Component\HttpFoundation\Response as HttpFoundationResponse;



class SquadController extends Controller
{

    public function fetch_my_squads()
    {
        $user = Auth::user();

        $squads = SquadMember::where('id', $user->id)
            ->with(['squad'])
            ->get();

        $response = array(
            'success' => $squads ? true : false,
            'data' => $squads,
            'error' => $squads ? false : "failed to retrieve squads"
        );

        return response()->json($response, 200);
    }

    public function create_squad(Request $request)
    {
        $user = Auth::user();
        $input = $request->all();

        $existing_name = Squad::where('squad_name', $input['squad_name'])->get()->first();

        if ($existing_name) {
            $response = array(
                'success' => false,
                'error' => "squad name already in use."
            );
            return response()->json($response, 200);
        } else {
            $squad = Squad::create([
                "squad_name" => $input['squad_name'],
                "game" => $input['game'],
                "founder" => $user->username,
                "recruiting" => $input['recruiting']
            ]);

            $member = SquadMember::create([
                "squad_id" => $squad->squad_id,
                "id" => $user->id,
                "squad_admin" => 1,
            ]);

            $response = array(
                'success' => $member ? true : false,
                'data' => $member,
                'error' => $member ? false : "failed to create squad"
            );

            return response()->json($response, 200);
        }
    }
}
