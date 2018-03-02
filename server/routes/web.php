<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

require_once('CrudRoute.php');

$crudRoutes = [
	'accounts' => new CrudRoute($router, 'accounts', 'account', CrudRoute::optionsAllRoutes([CrudRoute::OPTION_DELETE, CrudRoute::OPTION_ALL, CrudRoute::OPTION_NEW, CrudRoute::OPTION_GET])),
	'bodies' => new CrudRoute($router, 'bodies', 'body', CrudRoute::optionsAllRoutes([CrudRoute::OPTION_DELETE])),
	'characters' => new CrudRoute($router, 'characters', 'character', CrudRoute::optionsAllRoutes([CrudRoute::OPTION_ALL, CrudRoute::OPTION_NEW])),
	'files' => new CrudRoute($router, 'files', 'file', CrudRoute::optionsAllRoutes([CrudRoute::OPTION_DELETE])),
];
require_once('FileRoutes.php');
require_once('CharacterRoutes.php');
require_once('AccountRoutes.php');

$router->get('/', function () use ($router) {
    return $router->app->version();
});
