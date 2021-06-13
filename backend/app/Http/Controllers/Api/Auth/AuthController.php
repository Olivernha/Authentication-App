<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Laravel\Passport\Client;

class AuthController extends Controller
{
    //

    public function register(RegisterRequest $request){
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
        $profile= new Profile();
        $user->profile()->save($profile);
        if (!$user) {
            return response()->json(["success" => false, "message" => 'Registration failed'], 500);
        }
        return $this->getToken($request);
    }
    public function login(LoginRequest $request){
        return $this->getToken($request);
    }
    public function getToken($request)
    {

        $data = [
            'grant_type' => 'password',
            'client_id' => env('client_id'),
            'client_secret' =>env('client_secret'),
            'username' => $request->email,
            'password' => $request->password,
            'scope' => '*',
        ];

        $tokenRequest = Request::create('/oauth/token', 'post', $data);
        return app()->handle($tokenRequest);
    }
}
