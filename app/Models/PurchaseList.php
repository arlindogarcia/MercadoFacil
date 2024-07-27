<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseList extends Model
{
    use HasFactory;

    public $appends = ['marked', 'balance'];

    protected $fillable = [
        'marketplace',
        'budget',
        'user_id',
    ];

    public function getMarkedAttribute()
    {
        $marked = 0;
        foreach ($this->items as $item) {
            if ($item->checked == 0) {
                continue;
            }

            $marked += ($item->quantity ?? 0) * ($item->unitary_value ?? 0);
        }
        return $marked;
    }

    public function getBalanceAttribute()
    {
        return $this->budget - $this->marked;
    }

    public function items()
    {
        return $this->hasMany(PurchaseListItem::class);
    }

    public function delete()
    {
        $this->items && $this->items->delete();
        return parent::delete();
    }
}
