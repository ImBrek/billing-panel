<?php
namespace common\models\servicesTypes;

use common\components\ActiveRecordExt;
use Yii;
use yii\behaviors\TimestampBehavior;

/**
 * Service model
 *
 * @property integer   $id
 * @property string    $title
 * @property string    $description
 * @property integer   $type
 * @property float     $cost
 * @property integer   $category_id
 * @property bool      $is_deleted
 * @property integer   $parent_id
 *
 * @property Option[]  $options
 * @property Service[] $descendants
 * @property Service   $parent
 *
 */
class Service extends ActiveRecordExt {
	const TYPE_SELECT = 1;
	const TYPE_INPUT = 0;

	/**
	 * @inheritdoc
	 */
	public static function tableName() {
		return 'services_types.service';
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
			[ [ 'title', 'cost' ], 'required' ],
			[ [ 'type' ], 'in', 'range' => [ self::TYPE_INPUT, self::TYPE_SELECT ] ],
			[ [ 'type' ], 'required', 'when' => function ( $model ) {
				return $model->parent_id;
			} ],
			[
				[ 'category_id' ],
				'required',
				'when' => function ( $model ) {
					return ! $model->parent_id;
				}
			],
			[
				[ 'parent_id' ],
				'required',
				'when' => function ( $model ) {
					return ! $model->category_id;
				}
			]
		];
	}

	public function extraFields() {
		$result   = parent::extraFields();
		$result[] = 'descendants';
		$result[] = 'options';

		return $result;
	}

	/**
	 * @inheritDoc
	 */
	public function scenarios() {
		$scenarios = parent::scenarios();
		unset( $scenarios[ self::SCENARIO_UPDATE ]['type'] );

		return $scenarios;
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getOptions() {
		return $this->hasMany( Option::className(), [ 'service_id' => 'id' ] );
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getDescendants() {
		return $this->hasMany( Service::className(), [ 'parent_id' => 'id' ] );
	}

	/**
	 * @return \yii\db\ActiveQuery
	 */
	public function getParent() {
		return $this->hasOne( Service::className(), [ 'id' => 'parent_id' ] );
	}

}
