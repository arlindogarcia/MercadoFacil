<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('purchase_list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('purchase_list_id')->constrained();
            $table->boolean('checked')->default(0);
            $table->integer('quantity')->default(0);
            $table->string('product')->nullable();
            $table->decimal('unitary_value', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_list_items');
    }
};
