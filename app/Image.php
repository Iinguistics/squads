<?php

//namespace App\Models;
namespace App;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{

    protected $table = "images";
    protected $primaryKey = 'image_id';

    protected $fillable = [
        'id', 'image', 'description', 'created_at', 'updated_at'
    ];

    public function user()
    {
        return $this->hasOne('App\User', 'id', 'id');
    }
}
