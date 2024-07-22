<?php

namespace App\Http\Middleware;

use App\Helpers\HelperLimit;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckContractedPlan
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth()->user()->admin == 1) {
            return $next($request);
        }

        $isAuthorized = (new HelperLimit())->userAuthorized();
        if ($isAuthorized) {
            return $next($request);
        }

        return redirect('/settings/limits');
    }
}
