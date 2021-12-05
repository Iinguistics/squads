<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class Squad extends Model
{

    protected $table = "squads";
    protected $primaryKey = 'squad_id';

    protected $fillable = [
        'squad_name', 'game', 'bio', 'founder', 'recruiting', 'photo', 'created_at', 'updated_at'
    ];

    public function invites()
    {
        return $this->hasMany('App\SquadInvite', 'squad_id', 'squad_id');
    }

    public function members()
    {
        return $this->hasMany('App\SquadMember', 'squad_id', 'squad_id');
    }
}
