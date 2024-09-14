<?php

use App\Http\Controllers\AuthController;
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

use App\Http\Controllers\LeadController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\InteractionController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();

});

Route::apiResource('leads', LeadController::class);
    
Route::get('contacts', [ContactController::class, 'index']);
Route::post('contacts', [ContactController::class, 'store']);
Route::get('contacts/{id}', [ContactController::class, 'show']);
Route::put('contacts/{id}', [ContactController::class, 'update']);
Route::delete('contacts/{id}', [ContactController::class, 'destroy']);

Route::get('interactions', [InteractionController::class, 'index']);
Route::post('interactions', [InteractionController::class, 'store']);
Route::get('interactions/{id}', [InteractionController::class, 'show']);
Route::put('interactions/{id}', [InteractionController::class, 'update']);
Route::delete('interactions/{id}', [InteractionController::class, 'destroy']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/user', [AuthController::class, 'user'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->patch('/user/password', [AuthController::class, 'updatePassword']);


Route::middleware('auth:sanctum')->group(function () {
  //  Route::apiResource('leads', LeadController::class);
});