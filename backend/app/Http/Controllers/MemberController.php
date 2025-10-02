<?php

namespace App\Http\Controllers;

use App\Services\MemberService;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    protected $memberService;

    public function __construct(MemberService $memberService)
    {
        $this->memberService = $memberService;
    }

    public function index(Request $request)
    {
        $filters = [
            'search'    => $request->get('search'),
            'searchBy'  => $request->get('searchBy'),
            'role'    => $request->get('role'),
            'gender'    => $request->get('gender'),
            'sortBy'    => $request->get('sortBy', 'created_at'),
            'sortDir'   => $request->get('sortDir', 'desc'),
            'paginate'  => $request->get('paginate', true),
            'perpage'  => $request->get('perpage', 10),
        ];

        $members = $this->memberService->getAll($filters);

        return response()->json([
            'success' => true,
            'message' => $members
        ]);
    }

    public function show($id)
    {
        $member = $this->memberService->getById($id);

        if (!$member) {
            return response()->json(['success' => false, 'message' => 'Member not found'], 404);
        }

        return response()->json(['success' => true, 'data' => $member]);
    }

    public function store(Request $request)
    {
        $result = $this->memberService->create($request->all());

        if (isset($result['errors'])) {
            return response()->json(['success' => false, 'errors' => $result['errors']], 422);
        }

        return response()->json(['success' => true, 'message' => 'Member created', 'data' => $result], 201);
    }

    public function update(Request $request, $id)
    {
        $result = $this->memberService->update($id, $request->all());

        if (isset($result['errors'])) {
            return response()->json(['success' => false, 'errors' => $result['errors']], 422);
        }

        return response()->json(['success' => true, 'message' => 'Member updated', 'data' => $result]);
    }

    public function destroy($id)
    {
        $deleted = $this->memberService->delete($id);

        if (!$deleted) {
            return response()->json(['success' => false, 'message' => 'Member not found'], 404);
        }

        return response()->json(['success' => true, 'message' => 'Member deleted']);
    }
}
