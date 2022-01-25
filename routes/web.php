<?php

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

Route::view('/{path?}', 'app')->name('web');
Route::view('/profile/{id?}', 'app')->name('web');
Route::view('/squad/preview/{id?}', 'app')->name('web');
Route::view('/squad/{id?}', 'app')->name('web');
Route::view('/squad/{id?}/admin', 'app')->name('web');
