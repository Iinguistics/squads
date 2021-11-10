<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class ImageComment extends Model
{

    protected $table = "image_comments";
    protected $primaryKey = 'image_comment_id';

    protected $fillable = [
        'image_id', 'id', 'body', 'created_at', 'updated_at'
    ];

    public function user()
    {
        return $this->hasMany('App\User', 'id', 'id');
    }

    public function image()
    {
        return $this->hasOne('App\Image', 'image_id', 'image_id');
    }
}
