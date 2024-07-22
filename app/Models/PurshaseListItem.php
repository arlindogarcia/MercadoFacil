<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseListItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'purchase_list_id',
        'checked',
        'quantity',
        'product',
        'unitary_value',
    ];
}
