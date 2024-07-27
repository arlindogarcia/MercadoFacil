<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="shortcut icon" href="/logo-white.png" type="image/x-icon" />
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />

        <title>{{ config('app.name', 'Mercado Fácil') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <style>
            input[type="text"]:focus {
                transform: scale(1);
            }
        </style>
        <script>
            document.querySelectorAll('input[type="text"]').forEach(input => {
                input.addEventListener('focus', () => {
                    document.body.style.zoom = "1";
                });

                input.addEventListener('blur', () => {
                    document.body.style.zoom = "1";
                });
            });
        <script>
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
