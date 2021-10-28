<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{

    protected $table = "messages";
    protected $primaryKey = 'message_id';

    protected $fillable = [
        'id', 'body', 'message_read', 'sent_from_id', 'created_at, updated_at'
    ];

    public function user()
    {
        return $this->hasMany('App\User', 'id', 'id');
    }
}
