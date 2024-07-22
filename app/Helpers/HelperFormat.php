<?php

namespace App\Helpers;

class HelperFormat
{
  public static function formatMoney($value)
    {
        return number_format($value, '2', ',', '.');
    }
}