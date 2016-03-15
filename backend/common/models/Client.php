<?php
namespace common\models;

use common\components\ActiveRecordExt;
use common\models\order\Order;
use Yii;

/**
 * Client model
 *
 * @property integer $id
 * @property string  $title
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
			[ 'title', 'string', 'max' => 255 ]
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

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getUsers() {
		return $this->hasMany( User::className(), [ 'id' => 'client_id' ] );
	}
}
