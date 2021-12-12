<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class SquadRequest extends Model
{

    protected $table = "squads_requests";
    protected $primaryKey = 'squad_request_id';

    protected $fillable = [
        'squad_id', 'id', 'note', 'created_at', 'updated_at'
    ];

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'id');
    }

    public function squad()
    {
        return $this->hasOne('App\Squad', 'squad_id', 'squad_id');
    }
}
