<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="shortcut icon" href="/logo-white.png" type="image/x-icon" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        <title>{{ config('app.name', 'Mercado Fácil') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/ts/app.tsx'])
        @inertiaHead
    </head>
    <body class="min-h-screen font-sans antialiased">
      <div id="modal-root"></div>
        @inertia
    </body>
</html>
