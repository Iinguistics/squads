<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="Squads">

        <title>Squads</title>

        <!-- Fonts -->
        {{-- <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"> --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Manrope&family=Roboto+Mono&display=swap" rel="stylesheet">

        @if (config('app.env') == 'local')
        <link rel="stylesheet" href="{{asset('css/app.css')}}">
        @else
        <link rel="stylesheet" href="{{asset(mix('css/app.css'), true)}}">
        @endif
    </head>
    <body class="antialiased">
        <div id="app"></div>

        {{-- <script src="{{ asset('js/app.js') }}"></script> --}}

        @if (config('app.env') == 'local')
        <script src="{{asset('js/app.js')}}"></script>
        @else
        <script src="{{asset(mix('js/app.js'), true)}}"></script>
        @endif
    </body>
</html>
