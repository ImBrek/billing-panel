<?php
namespace common\models\servicesTypes;

use common\components\ActiveRecordExt;
use Yii;

/**
 * Category model
 *
 * @property integer $id
 * @property integer $title
 * @property integer $description
 * @property bool    $is_deleted
 *
 * @property Service[] $services 
 */

class Category extends ActiveRecordExt {
	/**
	 * @inheritdoc
	 */
	public static function tableName() {
		return 'services_types.category';
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
			[ [ 'title' ], 'required' ]
		];
	}

	/**
	 * @inheritDoc
	 */
	public function extraFields() {
		$result   = parent::extraFields();
		$result[] = 'services';

		return $result;
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getServices() {
		return $this->hasMany( Service::className(), [ 'category_id' => 'id' ] );
	}
}
