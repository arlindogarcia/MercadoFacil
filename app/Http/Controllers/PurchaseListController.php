<?php

namespace App\Http\Controllers;

use App\Models\PurchaseList;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PurchaseListController extends Controller
{
    public function index()
    {
        return Inertia::render('Market/Index');
    }

    public function edit($id)
    {
        return Inertia::render('Market/Edit', compact('id'));
    }

    public function get(Request $request)
    {
        return PurchaseList::with(['items'])->where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->paginate(1);
    }

    public function show($id)
    {
        return PurchaseList::with(['items'])->where('user_id', auth()->user()->id)->where('id', $id)->first();
    }
}
