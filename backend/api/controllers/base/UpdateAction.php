<?php
namespace api\controllers\base;

use common\components\ActiveRecordExt;
use common\models\ObjectModel;
use yii\web\ServerErrorHttpException;

class UpdateAction extends \yii\rest\UpdateAction {
	public $scenario = ActiveRecordExt::SCENARIO_UPDATE;
	public $objectUpdater;
	protected $transaction;

	/**
	 * @inheritDoc
	 */
	public function run( $id ) {
		$this->transaction = \Yii::$app->db->beginTransaction();
		try {
			/* @var $model ActiveRecord */
			$model = $this->findModel( $id );

			if ( $this->checkAccess ) {
				call_user_func( $this->checkAccess, $this->id, $model );
			}


			$model = call_user_func( $this->objectUpdater,  $model);

			if ( $model->save() === false && ! $model->hasErrors() ) {
				throw new ServerErrorHttpException( 'Failed to update the object for unknown reason.' );
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