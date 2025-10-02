<?php

namespace App\Services;

use App\Interfaces\LoginRepositoryInterface;

class UserService
{
    protected $loginRepository;

    public function __construct(LoginRepositoryInterface $loginRepository)
    {
        $this->loginRepository = $loginRepository;
    }

    public function login(string $username, string $password)
    {
        return $this->loginRepository->login($username, $password);
    }
}
