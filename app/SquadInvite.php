<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class SquadInvite extends Model
{

    protected $table = "squad_invites";
    protected $primaryKey = 'squad_invite_id';

    protected $fillable = [
        'squad_id', 'id', 'sent_from_user_id', 'note', 'pending', 'created_at', 'updated_at'
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
