@extends('mail.template')

@section('title', 'Squads - Password Reset Request')

@section('content')

    <p>Your password reset request was successfully processed. Please use the below pin number to finish reseting your password.</p>

    <p>{{$data['pin']}}<br /><small>This pin will expire in two hours.</p>

    <p>If you did not make this request, please contact us at support.squads.com.</p>

    <p>Sincerely,<br />The Squads Support Team</p>

@endsection