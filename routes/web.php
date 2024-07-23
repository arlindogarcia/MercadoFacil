<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PurchaseListController;
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

    Route::prefix('/api')->group(function () {
        Route::get('/purchase-lists', [PurchaseListController::class, 'get']);
        Route::get('/purchase-lists/{id}', [PurchaseListController::class, 'show']);
        Route::post('/purchase-lists', [PurchaseListController::class, 'store'])->name('api.purchase.store');
    });
});
