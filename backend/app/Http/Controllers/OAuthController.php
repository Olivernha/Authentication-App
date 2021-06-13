<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Models\SocialAccount;
use App\Models\User;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    //
    public function redirectToProvider($provider){
       $url= Socialite::driver($provider)->stateless()->redirect()->getTargetUrl();
       return response()->json([
           'url'=>$url
       ]);
    }
    public function handleProviderCallback($provider){
        $user = Socialite::driver($provider)->stateless()->user();
        if(!$user->token){
            //return json
            return response()->json(['message'=>'Failed to login','success'=>false],401);
        }
        $appUser = User::whereEmail($user->email)->first();
        if(!$appUser){
            //create user and add the provider
            $appUser = User::create([
                'name' => $user->name,
                'email' => $user->email,
                'password' => Str::random(8),
            ]);
            $socialAccount= SocialAccount::create([
                'provider'=>$provider,
                'provider_user_id'=>$user->id,
                'user_id'=>$appUser->id
            ]);
            $profile=new Profile();
            $profile->photo =  $user->avatar;
            $appUser->profile()->save($profile);
            $passportToken=$appUser->createToken('login token')->accessToken;
            return response()->json([
                'access_token'=>$passportToken
            ]);

        }
        else{
            //means that we have already this user
            $socialAccount=$appUser->socialAccounts()->where('provider',$provider)->first();
            if(!$socialAccount){
                $socialAccount= SocialAccount::create([
                   'provider'=>$provider,
                   'provider_user_id'=>$user->id,
                    'user_id'=>$appUser->id
                ]);
            }
            //login wwith user and send the token
            $passportToken=$appUser->createToken('login token')->accessToken;
            return response()->json([
                'access_token'=>$passportToken
            ]);

        }

    }
}
