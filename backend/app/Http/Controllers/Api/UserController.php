<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    //
    public function me()
    {
        $user = Auth::user();
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'phone' => $user->profile->phone,
            'bio' => $user->profile->bio,
            'photo' => $user->profile->photo
        ];
        return response()->json($data);
    }
    public function update(Request $request, $id)
    {
        $data = array();

        $data['name'] = $request->name;
        $data['email'] = $request->email;
        if ($request->password) {
            $data['password'] = Hash::make($request->password);
        }
        $user = User::where('id', $id)->update($data);

        $detailData = array();
        $detailData['phone'] = $request->phone;
        $detailData['bio'] = $request->bio;
        $user = User::whereId($id)->first();
        if ($request->newPhoto) {
            $image = $request->newPhoto;
            $position = strpos($image, ';');
            $sub = substr($image, 0, $position);
            $ext = explode('/', $sub)[1];
            $name = time() . "." . $ext;
            $img = Image::make($image)->resize(240, 240);
            $upload_path = 'img/profile/';
            $image_url =  $upload_path . $name;
            $success = $img->save($image_url);
            if ($success) {
                $detailData['photo'] = $image_url;

                $img = $user->profile->photo;
                if ($img) {
                    $done = unlink($img);
                }
                $user->profile()->update($detailData);
            }
            return response()->json(['message' => 'Update Successfully']);
        } else {
            if ($user->profile->photo !== null) {
                $detailData['photo'] = $user->profile->photo;
            }
            $user->profile->update($detailData);
            return response()->json(['message' => 'Update Successfully']);
        }
    }
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        if ($request->everywhere) {
            foreach ($request->user()->tokens()->whereRevoked(0)->get() as $token) {
                $token->revoke();
            }
        }

        return response()->json(['message' => 'success']);
    }
}
