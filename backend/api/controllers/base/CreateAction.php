<?php

namespace api\controllers\base;

use common\components\ActiveRecordExt;
use yii\base\Exception;
use yii\helpers\Url;
use yii\web\ForbiddenHttpException;
use yii\web\ServerErrorHttpException;

class CreateAction extends \yii\rest\CreateAction {
	public $scenario = ActiveRecordExt::SCENARIO_CREATE;
	public $objectCreator;
	protected $transaction;

	public function run() {
		$this->transaction = \Yii::$app->db->beginTransaction();

		$model = call_user_func( $this->objectCreator, $this );

		if ( $this->checkAccess ) {
			call_user_func( $this->checkAccess, $this->id, $model );
		}

		try {
			if ( $model->save() ) {
				$response = \Yii::$app->getResponse();
				$response->setStatusCode( 201 );
				$id = implode( ',', array_values( $model->getPrimaryKey( true ) ) );
				$response->getHeaders()->set( 'Location', Url::toRoute( [ $this->viewAction, 'id' => $id ], true ) );
			} elseif ( ! $model->hasErrors() ) {
				throw new ServerErrorHttpException( 'Failed to create the object for unknown reason.' );
			}
		} catch ( \Exception $e ) {
			$this->transaction->rollBack();
			throw $e;
		}

		if ( $model->hasErrors() ) {
			$this->transaction->rollBack();
		} else {
			$this->transaction->commit();
		}

		return $model;
	}
}