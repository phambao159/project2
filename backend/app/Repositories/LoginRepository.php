<?php

namespace App\Repositories;

use App\Interfaces\LoginRepositoryInterface;
use App\Models\UserLogin;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class LoginRepository implements LoginRepositoryInterface
{
    public function login(string $username, string $password)
    {
        $user = UserLogin::where('username', $username)->first();

        if ($user && Hash::check($password, $user->password)) {
            $token = JWTAuth::fromUser($user);

            return [
                'access_token' => $token,
                'token_type'   => 'bearer',
                'expires_in'   => JWTAuth::factory()->getTTL() * 60,
                'user'         => $user
            ];
        }

        return null;
    }
}
