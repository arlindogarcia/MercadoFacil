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
        return Inertia::render('Market/Index');
    }

    public function get()
    {

    }
}
