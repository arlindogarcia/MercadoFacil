<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <!-- PWA -->
        <meta name="theme-color" content="#3b82f6">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="default">
        <meta name="apple-mobile-web-app-title" content="Mercado Fácil">
        <link rel="manifest" href="/manifest.webmanifest">
        <link rel="apple-touch-icon" href="/logo-white.png">

        <link rel="shortcut icon" href="/logo-white.png" type="image/x-icon" />
        <title>{{ config('app.name', 'Mercado Fácil') }}</title>

        <!-- Fonts -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap">

        <style>
            input[type="text"]:focus {
                transform: scale(1);
            }
        </style>

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/ts/app.tsx'])
        @inertiaHead

        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                    navigator.serviceWorker.register('/sw.js');
                });
            }
        </script>
    </head>
    <body class="min-h-screen font-sans antialiased">
        <div id="modal-root"></div>
        @inertia
    </body>
</html>
