<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');
Route::middleware('auth')->group(function () {
    Route::get('/user', [UserController::class, 'index'])->name('user.index');
    Route::post('/user', [UserController::class, 'store'])->name('user.store');
    Route::patch('/user/{id}', [UserController::class, 'update'])->name('user.update');
    Route::delete('/user/{id}', [UserController::class, 'destroy'])->name('user.destroy');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/artist', [ArtistController::class, 'index'])->name('artist.index');
    Route::post('/artist', [ArtistController::class, 'store'])->name('artist.store');
    Route::patch('/artist/{id}', [ArtistController::class, 'update'])->name('artist.update');
    Route::delete('/artist/{id}', [ArtistController::class, 'destroy'])->name('artist.destroy');
    Route::get('/artist/export', [ArtistController::class, 'export'])->name('artist.export');
    Route::get('/artists/import', [ArtistController::class, 'import'])->name('artist.import');
});

require __DIR__ . '/auth.php';
