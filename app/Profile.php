<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{

    protected $table = "profiles";
    protected $primaryKey = 'profile_id';

    protected $fillable = [
        'id', 'first_name', 'last_name', 'display_name', 'location', 'bio', 'carrier', 'ping', 'download_speed', 'upload_speed', 'twitch', 'twitter', 'instagram', 'youtube', 'font_color', 'profile_color', 'created_at', 'updated_at'
    ];

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'id');
    }
}
