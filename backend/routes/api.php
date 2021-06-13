<?php

use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\UserController;

use App\Http\Controllers\OAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware'=>'auth:api'],function(){
    Route::get('/me',[UserController::class,'me'])->name('api.me');
    Route::post('profile/{id}/update',[UserController::class,'update']);
    Route::post('logout',[UserController::class,'logout']);
});

Route::post('register', [AuthController::class, 'register']);

Route::post('login', [AuthController::class, 'login']);

Route::get('/authorize/{provider}/redirect', [OAuthController::class,'redirectToProvider'])->name('api.social.redirect');
Route::get('/authorize/{provider}/callback', [OAuthController::class,'handleProviderCallback'])->name('oauth.callback');
