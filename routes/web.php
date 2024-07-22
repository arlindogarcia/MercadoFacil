<?php

use App\Helpers\HelperContact;
use App\Helpers\HelperFormat;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\ContractsController;
use App\Http\Controllers\DFeController;
use App\Http\Controllers\DFeCTeController;
use App\Http\Controllers\DFeNFeController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InitialController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseListController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\SystemController;
use App\Http\Controllers\TermsOfUseController;
use App\Models\Contract;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/home');
});

Route::group(['middleware' => 'auth'], function () {
    Route::get('/logout', [AuthController::class, 'logout']);
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/profile', [ProfileController::class, 'index'])->name('profile');
    Route::delete('/profileDelete', [ProfileController::class, 'deleteProfile'])->name('profileDelete');

    Route::get('/purchase-lists', [PurchaseListController::class, 'index']);
    Route::get('/purchase-lists/{id}', [PurchaseListController::class, 'edit']);
});
