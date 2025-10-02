<?php

namespace App\Interfaces;

interface LoginRepositoryInterface
{
    public function login(string $username, string $password);
}
