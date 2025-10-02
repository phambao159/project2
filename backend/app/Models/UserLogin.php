<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class UserLogin extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $table = 'user_logins';
    protected $primaryKey = "username";
    protected $fillable = ["username", "password"];

    public $incrementing = false;
    public $keyType = "string";

    public function getJWTIdentifier()
    {
        return $this->username;
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
