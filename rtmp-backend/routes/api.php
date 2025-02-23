<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\MessageController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// API Auth routes
Route::controller(AuthController::class)->group(function () {
    Route::post('/login', 'authenticate');
    Route::post('/register', 'register');
    Route::post('/logout', 'logout');
});

// Meesages API routes
Route::controller(MessageController::class)->group(function () {
    Route::post('/message/store', 'store');
    Route::get('/message/pending-messages', 'getUserPendingMessagesIds');
});