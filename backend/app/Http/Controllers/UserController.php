<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $result = $this->userService->login($request->username, $request->password);

        if ($result) {
            return response()->json($result);
        }

        return response()->json(['message' => 'Sai username hoặc mật khẩu'], 401);
    }
}
