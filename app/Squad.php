<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class Squad extends Model
{

    protected $table = "squads";
    protected $primaryKey = 'squad_id';

    protected $fillable = [
        'squad_name', 'game', 'founder', 'recruiting', 'photo', 'created_at', 'updated_at'
    ];
}