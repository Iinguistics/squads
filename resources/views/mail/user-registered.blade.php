@extends('mail.template')

@section('title', 'Squads - Registered')

@section('content')
    <p><b>Hello {{$data['gamertag']}},</b></p>

    <p>Welcome to Squads!</p>

    <p>Remember to go to your profile & update it with a bio or your preferred role so other players can get to know you & squad up.</p> 

    {{-- <p><a href="https://uprisefiber.com/account">Click Here to Access Your Account</a></p> --}}

    <p>Sincerely,<br />The Squads Team</p>
@endsection