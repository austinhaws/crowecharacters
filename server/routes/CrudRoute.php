<?php

use Illuminate\Http\Request;


require_once('CrudData.php');

/**
 * Class Crud
 * CRUDs a table. table must have an id, a guid field, and a data filed that is TEXT JSON
 */
class CrudRoute
{
	/**
	 * Crud constructor.
	 * @param $router object the router
	 * @param $table string table name for the data
	 * @param $routePrefix string start of the route
	 */
	public function __construct($router, $table, $routePrefix)
	{
		$crudData = new CrudData($table);

		$router->group(['prefix' => $routePrefix], function () use ($router, $crudData) {

			$router->post('new', function () use ($crudData) {
				return response()->json($crudData->create());
			});

			$router->get('get/{guid}', function ($guid) use ($crudData) {
				return response()->json($crudData->read($guid));
			});

			$router->get('all', function () use ($crudData) {
				return response()->json($crudData->readAll());
			});

			$router->post('save/{guid}', function ($guid, Request $request) use($crudData) {
				$crudData->update($guid, $request->input('data'));
				return messageSuccess();
			});

			$router->delete('delete/{guid}', function ($guid) use($crudData) {
				$crudData->delete($guid);
				return messageSuccess();
			});
		});

	}

}

/**
 * simple success message
 *
 * @return \Illuminate\Http\JsonResponse
 */
function messageSuccess() {
	return response()->json(['result' => 'success']);
}
