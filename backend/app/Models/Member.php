<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Member extends Model
{
    use HasFactory;
    protected $primaryKey = 'member_id';
    public $incrementing = false;
    public $keyType = 'string';
    protected $fillable = ['member_id', 'name', 'email', 'gender', 'role', 'dob'];
    protected $casts = [
        'gender' => 'boolean',
        'role' => 'boolean',
    ];
}
