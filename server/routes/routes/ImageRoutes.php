<?php

namespace App\Routes\Routes;

use App\Service\ImageService;
use Illuminate\Http\Request;

class ImageRoutes extends BaseRoutes
{
	public function setupRoutes(\Laravel\Lumen\Routing\Router $router)
	{
		$router->group(['prefix' => 'image'], function () use ($router) {
			// upload a new body image
			$router->post('upload/{accountGuid}', function (Request $request) {
				return ImageService()::getInstance()->uploadImage($request);
			});
		});
	}
}
