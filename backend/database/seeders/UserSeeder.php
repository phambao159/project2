<?php

namespace Database\Seeders;

use App\Models\UserLogin;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        UserLogin::insert([
            'username' => 'phambao159',
            'password' => Hash::make('giabao150920'),
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}
