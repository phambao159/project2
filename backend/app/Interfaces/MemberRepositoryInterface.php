<?php

namespace App\Interfaces;

interface MemberRepositoryInterface extends BaseRepositoryInterface
{
    public function getAll(array $filter = []);
}
