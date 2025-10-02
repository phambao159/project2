<?php

namespace App\Repositories;

use App\Models\Member;
use App\Interfaces\MemberRepositoryInterface;

class MemberRepository extends BaseRepository implements MemberRepositoryInterface
{
    public function __construct(Member $model)
    {
        parent::__construct($model);
    }
    public function getAll(array $filters = [])
    {
        $query = $this->model->query();

        /**
         * SEARCH LINH HOẠT
         * - Nếu có searchBy thì chỉ tìm theo cột đó.
         * - Nếu không có searchBy thì tìm theo nhiều cột: name, email, member_id.
         */
        if (!empty($filters['search'])) {
            $searchBy = $filters['searchBy'] ?? null;
            $keyword = $filters['search'];

            if ($searchBy) {
                $query->where($searchBy, 'LIKE', "%$keyword%");
            } else {
                $query->where(function ($q) use ($keyword) {
                    $q->where('name', 'LIKE', "%$keyword%")
                        ->orWhere('email', 'LIKE', "%$keyword%")
                        ->orWhere('member_id', 'LIKE', "%$keyword%");
                });
            }
        }

        // FILTER STATUS
        if (isset($filters['role']) && $filters['role'] !== 'all') {
            $query->where('role', $filters['role']);
        }

        if (isset($filters['gender']) && $filters['gender'] !== 'all') {
            $query->where('gender', $filters['gender']);
        }

        /**
         * SORT LINH HOẠT
         */
        $sortBy = $filters['sortBy'] ?? 'created_at';
        $sortDir = $filters['sortDir'] ?? 'desc';
        $query->orderBy($sortBy, $sortDir);

        /**
         * PAGINATION
         */
        $perPage = $filters['perpage'] ?? 10;
        if (!empty($filters['paginate']) && $filters['paginate'] == true) {
            return $query->paginate($perPage);
        }

        return $query->get();
    }
}
