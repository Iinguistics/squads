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
use App\SquadRequest;
use stdClass;
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

    public function fetch_squad($id)
    {
        $squad = Squad::where('squad_id', $id)
            ->with(['members.user', 'requests.user.profile'])
            ->get()->first();

        $response = array(
            'success' => $squad ? true : false,
            'data' => $squad,
            'error' => $squad ? false : "failed to retrieve squad"
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
                "bio" => $input['bio'],
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

        $check_already_invited = SquadInvite::where('squad_id', $input['squad_id'])
            ->where('id', $input['sent_to_id'])
            ->where('pending', 1)
            ->get()->first();

        if ($check_already_invited) {
            $response = array(
                'success' => false,
                'error' => "This user already has a pending invite to join this squad."
            );

            return response()->json($response, 200);
        }

        $check_already_member = SquadMember::where('squad_id', $input['squad_id'])
            ->where('id', $input['sent_to_id'])
            ->get()->first();

        if ($check_already_member) {
            $response = array(
                'success' => false,
                'error' => "This user is already a member of this squad."
            );

            return response()->json($response, 200);
        }

        $is_admin = SquadMember::where('squad_id', $input['squad_id'])
            ->where('id', $user->id)->get()->first();
        if ($is_admin->squad_admin === 0) {
            $response = array(
                'success' => false,
                'error' => "Only squad admin's can send out invites."
            );
            return response()->json($response, 200);
        }


        $squad_invite = SquadInvite::create([
            "squad_id" => $input['squad_id'],
            "id" => $input['sent_to_id'],
            "sent_from_user_id" => $user->id,
            "note" => $input['note']
        ]);

        $response = array(
            'success' => $squad_invite ? true : false,
            'data' => $squad_invite,
            'error' => $squad_invite ? false : "failed to create invite"
        );

        return response()->json($response, 200);
    }

    public function create_squad_request(Request $request)
    {
        $user = Auth::user();
        $input = $request->all();

        $check_already_requested = SquadRequest::where('squad_id', $input['squad_id'])
            ->where('id', $user->id)
            ->first();

        if ($check_already_requested) {
            $response = array(
                'success' => false,
                'error' => "A request to join this squad has already been sent."
            );
            return response()->json($response, 200);
        }

        $check_already_member = SquadMember::where('squad_id', $input['squad_id'])
            ->where('id', $user->id)
            ->get()->first();

        if ($check_already_member) {
            $response = array(
                'success' => false,
                'error' => "You are already a member of this squad."
            );
            return response()->json($response, 200);
        }

        $squad_request = SquadRequest::create([
            "squad_id" => $input['squad_id'],
            "id" => $user->id,
            "note" => $input['note']
        ]);

        $response = array(
            'success' => $squad_request ? true : false,
            'data' => $squad_request,
            'error' => $squad_request ? false : "failed to create request"
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

        $squad_id_store = new stdClass();
        for ($i = 0; $i < $current_user_length; $i++) {
            $squad_id_store->{$current_user[$i]->squad_id} = true;
        }

        for ($i = 0; $i < $potential_teammate_length; $i++) {
            if (property_exists($squad_id_store, $potential_teammate[$i]->squad_id)) {
                $match = true;
                break;
            }
        }

        $response = array(
            'data' => $match,
        );
        return response()->json($response, 200);
    }

    public function fetch_squad_invites()
    {
        $user = Auth::user();

        $invites = SquadInvite::where('id', $user->id)
            ->with(['squad'])
            ->get();

        $response = array(
            'success' => $invites ? true : false,
            'data' => $invites,
            'error' => $invites ? false : "failed to retrieve squad invites"
        );

        return response()->json($response, 200);
    }

    public function reject_squad_invite(Request $request)
    {
        $input = $request->all();

        $destroyed_invite = SquadInvite::find($input['squad_invite_id']);
        $destroyed_invite->delete();

        $response = array(
            'success' => $destroyed_invite ? true : false,
            'error' => $destroyed_invite ? false : "failed to delete invite"
        );

        return response()->json($response, 200);
    }

    public function accept_squad_invite(Request $request)
    {
        $input = $request->all();
        $user = Auth::user();

        $member = SquadMember::create([
            "squad_id" => $input['squad_id'],
            "id" => $user->id,
            "squad_admin" => 0,
        ]);

        $destroyed_invite = SquadInvite::find($input['squad_invite_id']);
        $destroyed_invite->delete();

        $response = array(
            'success' => $member ? true : false,
            'error' => $member ? false : "failed to accept invite"
        );

        return response()->json($response, 200);
    }

    public function fetch_squad_requests($id)
    {
        $user = Auth::user();

        $requests = SquadRequest::where('squad_id', $id)
            ->with(['user'])
            ->get();

        $response = array(
            'success' => $requests ? true : false,
            'data' => $requests,
            'error' => $requests ? false : "failed to retrieve squad requests"
        );

        return response()->json($response, 200);
    }

    public function reject_squad_request(Request $request)
    {
        $input = $request->all();

        $destroyed_request = SquadRequest::find($input['squad_request_id']);
        $destroyed_request->delete();

        $response = array(
            'success' => $destroyed_request ? true : false,
            'error' => $destroyed_request ? false : "failed to delete request"
        );

        return response()->json($response, 200);
    }


    public function check_is_admin($id)
    {
        $user = Auth::user();

        $check_user = SquadMember::where('squad_id', $id)
            ->where('id', $user->id)->get()->first();

        $is_admin = false;

        if ($check_user->squad_admin == 1) {
            $is_admin = true;
        }

        $response = array(
            'data' => $is_admin,
        );
        return response()->json($response, 200);
    }

    public function update_banner_font(Request $request, $id)
    {
        $input = $request->all();

        $results = Squad::where('squad_id', $id)
            ->update($input);

        $response = array(
            'success' => $results ? true : false,
            'data' => $results,
        );

        return response()->json($response, 200);
    }
}
