<?php
namespace common\models\order;

use common\components\ActiveRecordExt;
use common\models\Client;
use Yii;

/**
 * Order model
 *
 * @property integer          $id
 * @property integer          $author_id
 * @property integer          $client_id
 * @property bool             $is_deleted
 *
 * @property OrderedService[] $orderedServices
 * @property Client           $client
 */
class Order extends ActiveRecordExt {

	/** @var  OrderedService[] */
	private $_services;

	/**
	 * @inheritdoc
	 */
	public static function tableName() {
		return 'ord.ord';
	}

	/**
	 * @inheritdoc
	 */
	public function behaviors() {
		return [
		];
	}

	/**
	 * @inheritdoc
	 */
	public function rules() {
		return [
		];
	}

	/**
	 * @inheritDoc
	 */
	public function scenarios() {
		$scenarios                            = parent::scenarios();
		$scenarios[ self::SCENARIO_CREATE ][] = 'orderedServices';

		return $scenarios;
	}

	/**
	 * @inheritDoc
	 */
	public function extraFields() {
		$result   = parent::extraFields();
		$result[] = 'client';
		$result['ordered_services'] = 'orderedServices';

		return $result;
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getClient() {
		return $this->hasOne( Client::className(), [ 'id' => 'client_id' ] );
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getOrderedServices() {
		return $this->hasMany( OrderedService::className(), [ 'order_id' => 'id' ] );
	}

	/**
	 * @param $services [] array of orderedService attrs
	 */
	public function setOrderedServices( $services ) {
		$this->_services = array_map( function ( $service ) {
			$model             = new OrderedService( [ 'scenario' => OrderedService::SCENARIO_CREATE ] );
			$model->attributes = $service;
			$this->on( self::EVENT_AFTER_INSERT, function ( $event ) use ( $model ) {
				/** @var OrderedService $parent */
				$parent          = $event->sender;
				$model->order_id = $parent->id;
				$model->save( false );
			} );

			return $model;
		}, $services );
	}

	public function validateServices() {
		$services        = $this->_services;
		$rootServiceType = false;
		foreach ( $services as $service ) {
			if ( $service->service && $service->service->category_id ) {
				$rootServiceType = $service->service;
				break;
			}
		}
		if ( ! $rootServiceType ) {
			$this->addError( 'services[root]', 'Root service not found' );

			return;
		}

		foreach ( $services as $index => $service ) {
			if ( $service->service_id ) {
				if ( $service->service->parent_id != $rootServiceType->id && $rootServiceType->id != $service->service->id ) {
					$this->addError( "services[$index]", 'Service not descendant root service' );
				}
			} else {
				if ( $service->option && $service->option->service->parent_id != $rootServiceType->id ) {
					$this->addError( "services[$index]", 'Option not descendant root service' );
				}
			}

			if ( ! $service->validate() ) {
				$this->addError( "services[$index]", $service->getErrors() );
			}
		}

		$requiredLength = $rootServiceType->getDescendants()->count() + 1;
		if ( $requiredLength != count( $services ) ) {
			$this->addError( "services", "Not enough services" );
		}
	}

	/**
	 * @inheritDoc
	 */
	public function beforeValidate() {
		if ( $this->_services ) {
			$this->validateServices();
		}

		return parent::beforeValidate();
	}

}
