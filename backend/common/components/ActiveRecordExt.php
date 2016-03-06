<?php

namespace common\components;

use yii\db\ActiveRecord;

class ActiveRecordExt extends ActiveRecord {
	use ArrayableTrait;
	
	protected $preSaveRelations = [];

	const SCENARIO_UPDATE = 'update';
	const SCENARIO_CREATE = 'create';
	const SCENARIO_DELETE = 'delete';

	/**
	 * Переопределение метода удаления, в случае если в таблице есть поле is_deleted, обьект не удаляется а просто выставляется флаг
	 * @return bool|int
	 * @throws \yii\db\StaleObjectException
	 */
	public function deleteInternal() {
		if ( $this->beforeDelete() ) {
			if ( isset( $this->tableSchema->columns['is_deleted'] ) ) {
				$this->is_deleted = true;
				$values           = $this->getDirtyAttributes();
				$condition        = $this->getOldPrimaryKey( true );
				$result           = $this->updateAll( $values, $condition );

				return $result;
			}
		} else {
			return false;
		}
	}

	public static function hasRelation( $name ) {
		$modelClass = self::className();

		$o = new $modelClass;
		if ( ( $pos = strpos( $name, '.' ) ) !== false ) {
			$childName = substr( $name, $pos + 1 );
			$name      = substr( $name, 0, $pos );
		}
		$relation = $o->getRelation( $name, false );
		if ( $relation && $relation->link ) {
			if ( isset( $childName ) ) {
				$relModelClass = $relation->modelClass;

				return $relModelClass::hasRelation( $childName );
			} else {
				return true;
			}
		}

		return false;
	}

	/**
	 * @inheritDoc
	 */
	public function scenarios() {
		$scenarios = parent::scenarios();

		if ( empty( $scenarios[ self::SCENARIO_CREATE ] ) ) {
			$scenarios[ self::SCENARIO_CREATE ] = $scenarios[ self::SCENARIO_DEFAULT ];
		}

		if ( empty( $scenarios[ self::SCENARIO_UPDATE ] ) ) {
			$scenarios[ self::SCENARIO_UPDATE ] = $scenarios[ self::SCENARIO_DEFAULT ];
		}

		if ( empty( $scenarios[ self::SCENARIO_DELETE ] ) ) {
			$scenarios[ self::SCENARIO_DELETE ] = $scenarios[ self::SCENARIO_DEFAULT ];
		}

		return $scenarios;
	}

//	public function transactions() {
//		return [
//			self::SCENARIO_DEFAULT => self::OP_ALL,
//			self::SCENARIO_CREATE  => self::OP_ALL,
//			self::SCENARIO_UPDATE  => self::OP_ALL,
//			self::SCENARIO_DELETE  => self::OP_ALL,
//		];
//	}

}