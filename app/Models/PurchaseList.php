<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseList extends Model
{
    use HasFactory;

    protected $fillable = [
        'marketplace',
        'budget',
        'user_id',
    ];

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
