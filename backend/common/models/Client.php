<?php
namespace common\models;

use common\components\ActiveRecordExt;
use common\models\order\Order;
use Yii;

/**
 * Client model
 *
 * @property integer  $id
 *
 * @property Order[] $orders
 */
class Client extends ActiveRecordExt {
	/**
	 * @inheritdoc
	 */
	public static function tableName() {
		return 'client';
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
	public function extraFields() {
		$result   = parent::extraFields();
		$result[] = 'orders';

		return $result;
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getOrders() {
		return $this->hasMany( Order::className(), [ 'client_id' => 'id' ] );
	}
}
