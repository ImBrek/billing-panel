<?php

namespace api\controllers\base;

use api\components\ApiQueryBuilder;
use common\components\ActiveRecordExt;
use common\components\Helpers;
use common\models\Buildings;
use common\models\Streets;
use common\models\Users;
use yii\web\ForbiddenHttpException;

class ViewAction extends \yii\rest\ViewAction {
	public $queryBuilder;

	protected function beforeRun() {
		$request = \Yii::$app->request;
		$params  = $request->queryParams;

		if ( ! empty( $params['expand'] ) ) {
			$encoded = json_decode( $params['expand'], true );
			if ( $encoded ) {
				$params['expand'] = $encoded;
			} else {
				$params['expand'] = preg_split( '/,/', $params['expand'], - 1, PREG_SPLIT_NO_EMPTY );
			}
		}

		$request->queryParams = $params;

		return parent::beforeRun();
	}

	public function run( $id ) {
		$modelClass = $this->modelClass;
		$query      = call_user_func( $this->queryBuilder, $this );
		$params     = \Yii::$app->request->queryParams;
		$schema     = \Yii::$app->db->schema;

		if ( isset( $params['showDeleted'] ) ) {
			$showDeleted = $params['showDeleted'];
		} else {
			$showDeleted = false;
		}

		$model = $query->andWhere( [ 'id' => $id ] )->one();

		$expandFields = [ ];
		$with         = [ ];
		// Получаем список моделей которые нужно подгрузить вместе с основной моделью
		if ( isset( $params['expand'] ) ) {
			foreach ( $params['expand'] as $key => $expand ) {
				if ( is_integer( $key ) ) {
					if ( $modelClass::hasRelation( $expand ) ) {
						if ( ! $showDeleted ) {
							$with[ $expand ] = function ( $query ) use ( $schema ) {
								$modelClass = $query->modelClass;
								$schema     = $schema->getTableSchema( $modelClass::tableName() );
								if ( isset( $schema->columns['isDeleted'] ) ) {
									$query->andWhere( [ 'isDeleted' => false ] );
								}
							};
						} else {
							$with[] = $expand;
						}
					}
				} else {
					if ( $modelClass::hasRelation( $key ) ) {
						$with[ $key ] = function ( $query ) use ( $expand ) {
							if ( isset( $expand['filter'] ) ) {
								$queryBuilder = new ApiQueryBuilder( \Yii::$app->db,$query );
								$where        = $queryBuilder->buildCondition( $expand['filter'], $params );
								$query->andWhere( $where );
								$query->addParams( $params );
							}
							if ( isset( $expand['sort'] ) ) {
								foreach ( (array) $expand['sort'] as $fieldName => $direction ) {
									$query->addOrderBy( [ $fieldName => $direction == 'desc' ? SORT_DESC : SORT_ASC ] );
								}
							}
							if ( isset( $expand['limit'] ) ) {
								$query->limit( $expand['limit'] );
							}
						};
					}
				}
			}
			$expandFields = isset( $params['expand'][0] ) ? $params['expand'] : array_keys( $params['expand'] );
		}

		$m = [ $model ];
		$model->find()->findWith( $with, $m );

		if ( $this->checkAccess ) {
			call_user_func( $this->checkAccess, $this->id, $model );
		}

		$fields = preg_split( '/,/', \Yii::$app->request->get( 'fields' ), - 1, PREG_SPLIT_NO_EMPTY );

		return $model->toArray( $fields, $expandFields );
	}

}