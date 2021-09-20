<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    protected $table = "users";
    protected $primaryKey = 'user_id';

    protected $fillable = [
        'email', 'platform', 'gamertag', 'activision_username', 'password', 'active', 'created_at', 'updated_at'
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
}
