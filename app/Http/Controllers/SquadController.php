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
use App\SquadInvite;

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

    public function create_squad_invite(Request $request)
    {
        $user = Auth::user();
        $input = $request->all();

        $squad_invite = SquadInvite::create([
            "squad_id" => $input['squad_id'],
            "id" => $$input['sent_to_id'],
            "sent_from_id" => $user->id,
            "note" => $input['note']
        ]);

        $response = array(
            'success' => $squad_invite ? true : false,
            'data' => $squad_invite,
            'error' => $squad_invite ? false : "failed to create invite"
        );

        return response()->json($response, 200);
    }


    public function check_squad_teammate($id)
    {
        $user = Auth::user();

        $current_user = SquadMember::where('id', $user->id)->get();
        $current_user_length = count($current_user);

        $potential_teammate = SquadMember::where('id', $id)->get();
        $potential_teammate_length = count($current_user);

        $match = false;

        for ($i = 0; $i < $current_user_length; $i++) {
            for ($j = 0; $j < $potential_teammate_length; $j++) {
                if ($current_user[$i]->squad_id == $potential_teammate[$j]->squad_id) {
                    $match = true;
                    break;
                }
            }
        }

        $response = array(
            //'success' => $squads ? true : false,
            'data' => $match,
            //'error' => $squads ? false : "failed to retrieve squads"
        );

        return response()->json($response, 200);
    }
}
