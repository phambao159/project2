<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class JwtMiddleware
{
    public function handle($request, Closure $next)
    {
        $statusCode = 200;
        $response = null;

        try {
            JWTAuth::parseToken()->authenticate();
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            $response = ['status' => 'error', 'message' => 'Token expired'];
            $statusCode = 401;
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            $response = ['status' => 'error', 'message' => 'Token invalid'];
            $statusCode = 401;
        } catch (\Exception $e) {
            $response = ['status' => 'error', 'message' => 'Token not provided'];
            $statusCode = 401;
        }

        if ($response !== null) {
            return response()->json($response, $statusCode);
        }
        return $next($request);
    }
}
