<?php

namespace App\Services;

use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use App\Interfaces\MemberRepositoryInterface;

class MemberService
{
    protected $memberRepository;

    public function __construct(MemberRepositoryInterface $memberRepository)
    {
        $this->memberRepository = $memberRepository;
    }

    /**
     * Lấy danh sách thành viên
     */
    public function getAll(array $filters = [])
    {
        return $this->memberRepository->getAll($filters);
    }

    /**
     * Lấy thông tin chi tiết thành viên
     */
    public function getById($id)
    {
        return $this->memberRepository->getById($id);
    }

    /**
     * Validate + Tạo thành viên mới
     */
    public function create(array $data)
    {
        $validator = Validator::make($data, [
            'member_id' => 'required|string|unique:members,member_id',
            'name'      => 'required|string|max:255',
            'email'     => 'required|email|unique:members,email',
            'gender' => 'required|boolean',
            'role' => 'required|boolean',
            'dob' => 'required|string'
        ]);

        if ($validator->fails()) {
            return ['errors' => $validator->errors()];
        }

        return $this->memberRepository->create($data);
    }

    /**
     * Validate + Cập nhật thành viên
     */
    public function update($id, array $data)
    {
        $validator = Validator::make($data, [
            'member_id' => [
                'required',
                'string',
                Rule::unique('members', 'member_id')->ignore($id, 'member_id'),
            ],
            'name' => 'required|string|max:255',
            'email' => [
                'required',
                'email',
                Rule::unique('members', 'email')->ignore($id, 'member_id'),
            ],
            'gender' => 'required|boolean',
            'role' => 'required|boolean',
            'dob' => 'required|string',
        ]);

        if ($validator->fails()) {
            return ['errors' => $validator->errors()];
        }

        return $this->memberRepository->update($id, $data);
    }


    /**
     * Xóa thành viên
     */
    public function delete($id)
    {
        return $this->memberRepository->delete($id);
    }
}
