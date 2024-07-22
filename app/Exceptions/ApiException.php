<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class ApiException extends Exception
{
    private $apiResponse = [];

    public function __construct($message = "", $apiResponse = [], $code = 422, ?Throwable $previous = null ){
        $this->apiResponse = $apiResponse;
        parent::__construct($message, $code, $previous);
    }

    public function render()
    {
        return response()->json(['error' => $this->getMessage()], 422);
    }

    public function context()
    {
        return ['response' => $this->apiResponse];
    }

    public function getApiResponse()
    {
        return $this->apiResponse;
    }
}
