<?php

namespace App\Classes\NFe;

use NFePHP\NFe\Common\Standardize as CommonStandardize;

class Standardize extends CommonStandardize
{
    /**
     * Constructor
     */
    public function __construct(?string $xml = null)
    {
        if (!empty($xml)) {
            $this->xml = $xml;
        }
        $this->toStd($xml);
    } 
}
