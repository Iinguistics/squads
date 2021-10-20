@extends('mail.template')

@section('title', 'Squads - Registered')

@section('content')
    <p><b>Hello {{$data['gamertag']}},</b></p>

    <p>Welcome to Squads!</p>

    <p>Remember to go to your profile & update your bio so other players can get to know you & squad up.</p>

    {{-- <p><a href="https://">Click Here to Access Your Account</a></p> --}}

    <p>Sincerely,<br />The Squads Team</p>
@endsection
