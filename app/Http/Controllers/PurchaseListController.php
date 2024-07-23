<?php

namespace App\Http\Controllers;

use App\Models\PurchaseList;
use App\Models\PurchaseListItem;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        return PurchaseList::with(['items'])->where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->paginate(10);
    }

    public function show($id)
    {
        return PurchaseList::with(['items'])->where('user_id', auth()->user()->id)->where('id', $id)->first();
    }

    public function store(Request $request)
    {
        $request->validate([
            'marketplace' => 'required',
        ], [
            'marketplace.required' => 'O campo Mercado é obrigatório.',
        ]);

        try {
            DB::beginTransaction();

            $data = $request->all();

            $list = PurchaseList::find($request->id);
            if (!$list) {
                $data['user_id'] = auth()->user()->id;
                $list = new PurchaseList();
            }

            $list->fill($data);
            $list->save();

            foreach ($request->items as $item) {
                $listItem = PurchaseListItem::find($item['id']);
                if (!$listItem) {
                    $listItem = new PurchaseListItem();
                }
                $listItem->fill($item);
                $listItem->purchase_list_id = $list->id;
                if (strlen(strval($listItem->quantity ?? '')) === 0) {
                    $listItem->quantity = 0;
                }
                $listItem->save();
            }

            DB::commit();
            return back()->with('flash', [
                'list' => $list,
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            error_log($e->getMessage());

            return back()->with('flash', [
                'banner' => "Erro: " . $e->getMessage(),
                'bannerStyle' => 'danger',
            ]);
        }
    }
}
