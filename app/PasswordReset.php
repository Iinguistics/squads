<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{

    protected $table = "password_reset";
    protected $primaryKey = 'pasword_reset_id';

    protected $fillable = [
        'email', 'pin', 'created_at', 'updated_at'
    ];
}
