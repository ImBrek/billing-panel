<?php
namespace common\models\order;

use common\components\ActiveRecordExt;
use common\models\servicesTypes\Option;
use common\models\servicesTypes\Service;
use Yii;

/**
 * Ordered service model
 *
 * @property integer $id
 * @property integer $option_id
 * @property integer $order_id
 * @property string  $value
 * @property integer $service_id
 *
 * @property Order   $order
 * @property Option  $option
 * @property Service $service
 */
class OrderedService extends ActiveRecordExt {
	/**
	 * @inheritdoc
	 */
	public static function tableName() {
		return 'ord.ordered_service';
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
			[
				'value',
				'required',
				'when' => function ( $model ) {
					return $model->service && $model->service->type === 0;
				}
			],
			[
				'option_id',
				'required',
				'when' => function ( $model ) {
					return ! $model->service_id;
				}
			],
			[
				'service_id',
				'required',
				'when' => function ( $model ) {
					return ! $model->option_id;
			}
			]
		];
	}

	/**
	 * @inheritDoc
	 */
	public function extraFields() {
		$result   = parent::extraFields();
		$result[] = 'order';
		$result[] = 'service';
		$result[] = 'option';

		return $result;
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getOrder() {
		return $this->hasOne( Order::className(), [ 'id' => 'order_id' ] );
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getService() {
		return $this->hasOne( Service::className(), [ 'id' => 'service_id' ] );
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getOption() {
		return $this->hasOne( Option::className(), [ 'id' => 'option_id' ] );
	}
}
