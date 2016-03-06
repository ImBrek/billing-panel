<?php
namespace common\models\servicesTypes;

use common\components\ActiveRecordExt;
use Yii;

/**
 * Option model
 *
 * @property integer $id
 * @property string  $title
 * @property string  $description
 * @property float   $cost
 * @property integer $service_id
 * @property bool    $is_deleted
 *
 * @property Service $service
 */
class Option extends ActiveRecordExt {
	/**
	 * @inheritdoc
	 */
	public static function tableName() {
		return 'services_types.option';
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
			[ [ 'title', 'description' ], 'string', 'max' => 255 ],
			[ [ 'cost' ], 'integer', 'min' => 0 ],
			[ [ 'title', 'service_id', 'cost' ], 'required' ],
			[
				'service_id',
				function ( $attribute, $params ) {
					$service = Service::findOne( $this->service_id );
					if ( $service->type != Service::TYPE_SELECT ) {
						$this->addError( $attribute, 'Service type must be SELECT' );
					}
				}
			]
		];
	}

	/**
	 * @inheritDoc
	 */
	public function scenarios() {
		$scenarios = parent::scenarios();
		//Denied update service_od
		unset( $scenarios[ self::SCENARIO_UPDATE ]['service_id'] );

		return $scenarios;
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getService() {
		return $this->hasOne( Service::className(), [ 'id' => 'service_id' ] );
	}

}
