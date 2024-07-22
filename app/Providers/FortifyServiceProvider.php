<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Actions\Fortify\UpdateUserPassword;
use App\Actions\Fortify\UpdateUserProfileInformation;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Laravel\Fortify\Fortify;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse;
use Laravel\Fortify\Contracts\RegisterResponse;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fortify::createUsersUsing(CreateNewUser::class);
        Fortify::updateUserProfileInformationUsing(UpdateUserProfileInformation::class);
        Fortify::updateUserPasswordsUsing(UpdateUserPassword::class);
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);

        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by($request->email.$request->ip());
        });

        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        Fortify::loginView(function ($request) {
            return Inertia::render('auth/Login')->toResponse($request);
        });
        Fortify::registerView(function () {
            return Inertia::render('auth/Register');
        });
        Fortify::requestPasswordResetLinkView(function () {
            return Inertia::render('auth/ForgotPassword');
        });
        Fortify::resetPasswordView(function (Request $request) {
            return Inertia::render('auth/ResetPassword', [
                'token' => $request->route('token'),
                'email' => $request->get('email'),
            ]);
        });
        Fortify::verifyEmailView(function () {
            return Inertia::render('auth/VerifyEmail');
        });
        Fortify::confirmPasswordView(function () {
            return Inertia::render('auth/ConfirmPassword');
        });

        $this->app->instance(LoginResponse::class, new class () implements LoginResponse {
            public function toResponse($request)
            {
                return redirect('/home');
            }
        });
    }
}
