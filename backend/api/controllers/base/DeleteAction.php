<?php

namespace api\controllers\base;

use common\components\ActiveRecordExt;

class DeleteAction extends \yii\rest\DeleteAction {

	public $objectDeleter;

	public function run( $id ) {
		$model           = $this->findModel( $id );
		$model->scenario = ActiveRecordExt::SCENARIO_DELETE;
		$model           = call_user_func( $this->objectDeleter, $model );

		if ( $this->checkAccess ) {
			call_user_func( $this->checkAccess, $this->id, $model );
		}

		if ( $model->delete() === false ) {
			\Yii::$app->getResponse()->setStatusCode( 400 );

			return $model->getErrors();
		};

		\Yii::$app->getResponse()->setStatusCode( 204 );
	}

}