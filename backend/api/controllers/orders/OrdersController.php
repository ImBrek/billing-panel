<?php
namespace api\controllers\orders;

use api\controllers\base\BaseController;
use common\models\order\Order;

class OrdersController extends BaseController {
	public $modelClass = 'common\models\order\Order';

	public function actions() {
		$actions = parent::actions();
		unset($actions['update']);
		return $actions;
	}

	public function objectCreator() {
		$params = \Yii::$app->getRequest()->getBodyParams();

		/** @var Order $model */
		$model = parent::objectCreator();
		$model->orderedServices = $params['ordered_services'];

		return $model;
	}

}