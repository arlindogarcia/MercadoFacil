<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PurchaseList;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProfileController extends Controller
{
    public function index()
    {
        return Inertia::render('Profile/index');
    }

    public function deleteProfile(Request $request)
    {
        try {
            DB::beginTransaction();

            $user = User::with(['purchaseLists'])->find(Auth::user()->id);

            foreach ($user->purchaseLists as $purchaseList) {
                PurchaseList::where('id', $purchaseList->id)->delete();
            }

            User::where('id', $user->id)->delete();

            DB::commit();

            Auth::logout();

            return redirect()->route('home');
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->with('flash', [
                'banner' => "Erro ao excluir cadastro: " . $e->getMessage(),
                'bannerStyle' => "danger",
            ]);
        }
    }
}
