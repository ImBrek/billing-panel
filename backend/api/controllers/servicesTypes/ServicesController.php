<?php
namespace api\controllers\servicesTypes;

use api\controllers\base\BaseController;
use common\models\servicesTypes\Option;
use common\models\servicesTypes\Service;
use yii\web\HttpException;

class ServicesController extends BaseController {
	public $modelClass = 'common\models\servicesTypes\Service';

	public function objectCreator() {
		$params = \Yii::$app->getRequest()->getBodyParams();

		/** @var Service $parent */
		$parent = parent::objectCreator();

		if ( ! empty( $params['options'] ) ) {
			foreach ( (array) $params['options'] as $row ) {
				$option             = new Option( [ 'scenario' => Option::SCENARIO_CREATE ] );
				$option->attributes = $row;

				$parent->on( Service::EVENT_AFTER_INSERT, function ( $event ) use ( $option, &$hasErrors ) {
					/** @var Service $service */
					$service            = $event->sender;
					$option->service_id = $service->id;
					if ( ! $option->save() ) {
						$service->addError( 'options[]', $option->getErrors() );
					}
				} );
			}
		}

		return $parent;
	}

	/**
	 * @param \yii\db\ActiveRecord $model
	 *
	 * @return \yii\db\ActiveRecord
	 * @throws \Exception
	 * @throws \yii\base\InvalidConfigException
	 */

	public function objectUpdater( $model ) {
		$model  = parent::objectUpdater( $model );
		$params = \Yii::$app->getRequest()->getBodyParams();

		if ( ! empty( $params['options'] ) ) {
			$model->on(Service::EVENT_AFTER_UPDATE,function($event) use ($params){
				/** @var Service $service */
				$service = $event->sender;

				foreach ( (array) $params['options'] as $row ) {
					if ( $row['id'] ) {
						$option = Option::findOne( $row['id'] );
						if ( !empty($row['is_deleted']) && $row['is_deleted'] ) {
							$option->delete();
						} else {
							$option->attributes = $row;
							if (!$option->save()){
								$service->addError("options[{$option->id}]",$option->getErrors());
							}
						}
					} else {
						$option = new Option();
						$option->scenario = Option::SCENARIO_CREATE;
						$option->attributes = $row;
						$option->service_id = $service->id;
						if (!$option->save()){
							$service->addError("options[]",$option->getErrors());
						}
					}
				}
			});
		}

		return $model;
	}

}