<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class SquadMember extends Model
{

    protected $table = "squad_members";
    protected $primaryKey = 'squad_member_id';

    protected $fillable = [
        'squad_id', 'id', 'created_at', 'updated_at'
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
