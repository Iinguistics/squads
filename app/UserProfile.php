<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{

    protected $table = "user_profiles";
    protected $primaryKey = 'user_profile_id';

    protected $fillable = [
        'id', 'first_name', 'last_name', 'display_name', 'location', 'bio', 'carrier', 'ping', 'download_speed', 'upload_speed', 'twitch', 'twitter', 'instagram', 'youtube', 'created_at', 'updated_at'
    ];

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'id');
    }
}
