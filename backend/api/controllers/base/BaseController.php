<?php
namespace api\controllers\base;

use common\components\ActiveRecordExt;
use yii\base\Exception;
use yii\db\ActiveRecord;
use yii\rest\ActiveController;
use yii\filters\auth\QueryParamAuth;
use api\components\CompositeAuth;
use yii\filters\auth\HttpBearerAuth;
use Yii;

class BaseController extends ActiveController {

	private $_view;
	public $serializer = 'api\components\Serializer';
	public $createScenario = ActiveRecordExt::SCENARIO_CREATE;
	public $updateScenario = ActiveRecordExt::SCENARIO_UPDATE;

	public function actions() {
		$actions           = parent::actions();
		$actions['index']  = [
			'class'        => 'api\controllers\base\IndexAction',
			'modelClass'   => $this->modelClass,
			'checkAccess'  => [ $this, 'checkAccess' ],
			'queryBuilder' => [ $this, 'queryBuilder' ]
		];
		$actions['view']   = [
			'class'        => 'api\controllers\base\ViewAction',
			'modelClass'   => $this->modelClass,
			'checkAccess'  => [ $this, 'checkAccess' ],
			'queryBuilder' => [ $this, 'queryBuilder' ]
		];
		$actions['create'] = [
			'class'         => 'api\controllers\base\CreateAction',
			'modelClass'    => $this->modelClass,
			'checkAccess'   => [ $this, 'checkAccess' ],
			'objectCreator' => [ $this, 'objectCreator' ],
		];
		$actions['update'] = [
			'class'       => 'api\controllers\base\UpdateAction',
			'modelClass'  => $this->modelClass,
			'checkAccess' => [ $this, 'checkAccess' ],
			'objectUpdater' => [ $this, 'objectUpdater' ],
		];
		$actions['delete'] = [
			'class'         => 'api\controllers\base\DeleteAction',
			'modelClass'    => $this->modelClass,
			'checkAccess'   => [ $this, 'checkAccess' ],
			'objectDeleter' => [ $this, 'objectDeleter' ]
		];

		return $actions;
	}

	/**
	 * @inheritDoc
	 */
	public function checkAccess( $action, $model = null, $params = [ ] ) {
	}

	public function behaviors() {
		$result                   = parent::behaviors();
		$result['corsFilter']     = [
			'class' => \yii\filters\Cors::className(),
			'cors'  => [
				'Origin'                         => [ '*' ],
				'Access-Control-Request-Method'  => [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ],
				'Access-Control-Request-Headers' => [ '*' ],
			],

		];
//		$result['_authenticator'] = [
//			'class'       => CompositeAuth::className(),
//			'authMethods' => [
//				HttpBearerAuth::className(),
//				QueryParamAuth::className()
//			]
//		];

		return $result;
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function queryBuilder() {
		$modelClass = $this->modelClass;

		return $modelClass::find();
	}

	public function objectCreator() {
		$params = \Yii::$app->getRequest()->getBodyParams();

		$model = new $this->modelClass( [
			'scenario' => $this->createScenario,
		] );
		$model->load( $params, '' );

		return $model;
	}

	/**
	 * Возвращает модель которую необходимо удалить
	 *
	 * @param $model
	 *
	 * @return mixed
	 */
	public function objectDeleter( $model ) {
		return $model;
	}

	/**
	 * @param ActiveRecord $model
	 *
	 * @return ActiveRecord
	 * @throws \yii\base\InvalidConfigException
	 */
	public function objectUpdater($model){
		$model->scenario = $this->updateScenario;
		$model->load( \Yii::$app->getRequest()->getBodyParams(), '' );
		return $model;
	}

}