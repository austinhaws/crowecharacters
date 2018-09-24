<?php

use Illuminate\Http\Request;


require_once('CrudData.php');
require_once('WebResponse.php');

/**
 * Class Crud
 * CRUDs a table. table must have an id, a guid field, and a data filed that is TEXT JSON
 */
class CrudRoute
{
	public const OPTION_NEW = 'new';
	public const OPTION_GET = 'get';
	public const OPTION_ALL = 'all';
	public const OPTION_SAVE = 'save';
	public const OPTION_DELETE = 'delete';

	public $crudData;

	/**
	 * Crud constructor.
	 * @param $router object the router
	 * @param $table string table name for the data
	 * @param $routePrefix string start of the route
	 * @param $options array key/value which routes to create: new, get, all, save, delete
	 */
	public function __construct($router, $table, $routePrefix, $options)
	{
		$this->crudData = new CrudData($table);

		// how to pass this in to use? just make a temporary variable to obfuscate my stupidity.
		$crudData = $this->crudData;
		$router->group(['prefix' => $routePrefix], function () use ($router, $crudData, $options) {

			if ($options[CrudRoute::OPTION_NEW]) {
				$router->post('new', function () use ($crudData) {
					return webResponse($crudData->create());
				});
			}

			if ($options[CrudRoute::OPTION_GET]) {
				$router->get('get/{guid}', function ($guid) use ($crudData) {
					return webResponse($crudData->read($guid));
				});
			}

			if ($options[CrudRoute::OPTION_ALL]) {
				$router->get('all', function () use ($crudData) {
					return webResponse($crudData->readAll());
				});
			}

			if ($options[CrudRoute::OPTION_SAVE]) {
				$router->post('save/{guid}', function ($guid, Request $request) use ($crudData) {
					$crudData->update($guid, $request->input('data'));
					return messageSuccess();
				});
			}

			if ($options[CrudRoute::OPTION_DELETE]) {
				$router->delete('delete/{guid}', function ($guid) use ($crudData) {
					$crudData->delete($guid);
					return messageSuccess();
				});
			}
		});

	}

	/**
	 * helper for getting all routes as being turned on
	 *
	 * @param $notRoutes array list of routes to not include
	 * @return array option route names
	 */
	public static function optionsAllRoutes($notRoutes = []) {
		$options = [CrudRoute::OPTION_NEW, CrudRoute::OPTION_DELETE, CrudRoute::OPTION_GET, CrudRoute::OPTION_ALL, CrudRoute::OPTION_SAVE];
		return array_reduce($options, function ($carry, $item) use ($notRoutes){
			$carry[$item] = false === array_search($item, $notRoutes);
			return $carry;
		}, []);
	}
}

/**
 * simple success message
 *
 * @return \Illuminate\Http\JsonResponse
 */
function messageSuccess() {
	return webResponse(['result' => 'success']);
}
