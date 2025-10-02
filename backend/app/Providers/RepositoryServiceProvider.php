<?php

namespace App\Providers;

use App\Interfaces\LoginRepositoryInterface;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\MemberRepositoryInterface;
use App\Repositories\LoginRepository;
use App\Repositories\MemberRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(MemberRepositoryInterface::class, MemberRepository::class);
        // Bind Login
        $this->app->bind(LoginRepositoryInterface::class, LoginRepository::class);
    }

    public function boot()
    {
        //
    }
}
