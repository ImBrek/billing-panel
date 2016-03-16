<?php
namespace api\controllers\orders;

use api\controllers\base\BaseController;
use common\models\order\Order;
use common\models\User;
use yii\web\ForbiddenHttpException;

class OrdersController extends BaseController {
	public $modelClass = 'common\models\order\Order';

	public function actions() {
		$actions = parent::actions();
		unset( $actions['update'] );

		return $actions;
	}

	public function objectCreator() {
		$params = \Yii::$app->getRequest()->getBodyParams();

		/** @var Order $model */
		$model                  = parent::objectCreator();
		$model->orderedServices = $params['ordered_services'];
		$model->client_id       = \Yii::$app->user->identity->client_id;

		return $model;
	}

	/**
	 * @inheritDoc
	 */
	public function queryBuilder() {
		$activeQuery = parent::queryBuilder();
		/** @var User $user */
		$user = \Yii::$app->user->identity;
		if ( ! $user->is_admin && $this->action->id == 'index') {
			$activeQuery->andWhere( [ 'client_id' => $user->client_id ] );
		}

		return $activeQuery;
	}

	/**
	 * @inheritDoc
	 */
	public function checkAccess( $action, $model = null, $params = [ ] ) {
		if (\Yii::$app->user->identity->is_admin || !$model) {
			return;
		}

		if ( in_array( $action, [ 'index', 'create' ] ) ) {
			return;
		}

		if ($action == 'view' &&  $model->client_id == \Yii::$app->user->identity->client_id){
			return;
		}

		throw new ForbiddenHttpException();


	}

}