<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens as SanctumHasApiTokens;

class User extends Authenticatable
{
    use HasFactory, SanctumHasApiTokens, Notifiable;

    protected $table = "users";
    protected $primaryKey = 'id';

    protected $fillable = [
        'email', 'username', 'platform', 'gamertag', 'activision_username', 'password', 'active', 'created_at', 'updated_at'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
