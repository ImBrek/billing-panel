<?php
namespace api\controllers\base;

use api\components\ApiQueryBuilder;

class IndexAction extends \yii\rest\IndexAction {
	public $queryBuilder;

	protected $query;

	protected function beforeRun() {
		$request = \Yii::$app->request;
		$params  = $request->queryParams;

		if ( ! empty( $params['filter'] ) ) {
			if ( is_array( $params['filter'] ) ) {
				$encoded = array_map( function ( $row ) {
					$e = json_decode( $row, true );

					return $e ? $e : $row;
				}, $params['filter'] );
			} else {
				$encoded = json_decode( $params['filter'], true );
			}

			if ( $encoded ) {
				$params['filter'] = $encoded;
			} else {
				unset( $params['filter'] );
			}
		}

		if ( ! empty( $params['sort'] ) ) {
			$encoded = json_decode( $params['sort'], true );
			if ( $encoded ) {
				$params['sort'] = $encoded;
			} else {
				unset( $params['sort'] );
			}
		}

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

	public function run() {
		$modelClass = $this->modelClass;
		$request    = \Yii::$app->request;
		$params     = $request->queryParams;

		if ( $this->checkAccess ) {
			call_user_func( $this->checkAccess, 'index', $modelClass );
		}

		$this->query = call_user_func( $this->queryBuilder, $this );

		$fields = preg_split( '/,/', \Yii::$app->request->get( 'fields' ), - 1, PREG_SPLIT_NO_EMPTY );

		if ( ! empty( $params['filter'] ) ) {
			$this->buildFilter( $params['filter'] );
		}
		if ( ! empty( $params['page'] ) ) {
			$this->buildPager( $params['page'] );
		}
		if ( ! empty( $params['sort'] ) ) {
			$this->buildSort( $params['sort'] );
		}
		if ( ! empty( $params['expand'] ) ) {
			$expand = $this->buildExpand( $params['expand'], isset( $params['showDeleted'] ) );
		} else {
			$expand = [ ];
		}
		$this->buildShowDeleted( isset( $params['showDeleted'] ) ? $params['showDeleted'] : null );

		$m = [ ];
		foreach ( $this->query->all() as $row ) {
			$m[] = $row->toArray( $fields, $expand );
		}

		return $m;
	}


	/**
	 * Управление видимостью удаленных данных, имеет смысл только если целевая таблица имеет столбец isDeleted
	 *
	 * @param bool $showDeleted
	 */
	protected function buildShowDeleted( $showDeleted ) {
		$schema     = \Yii::$app->db->schema;
		$modelClass = $this->modelClass;

		if ( $showDeleted === null ) {
			$showDeleted = false;
		}

		if ( ! $showDeleted && isset( $schema->getTableSchema( $modelClass::tableName() )->columns['is_deleted'] ) ) {
			$this->query->andWhere( [ $modelClass::tableName() . '.is_deleted' => false ] );
		}

	}

	/**
	 * Управление постраничной разбивкой
	 *
	 * @param int $page номер страницы начиная с 1
	 */
	protected function buildPager( $page ) {
		$page = $page - 1;
		$this->query->limit( 100 );
		$this->query->offset( 100 * $page );
	}

	/**
	 * Управление фильтрацией данных
	 *
	 * @param $filter фильтр данных(см ApiQueryBuilder)
	 */
	protected function buildFilter( $filter ) {
		$queryBuilder = new ApiQueryBuilder( \Yii::$app->db,$this->query );
		$queryBuilder->attachCondition($filter,$this->query->params);
//		$where        = $queryBuilder->buildCondition( $filter, $p );
//		$this->query->andWhere( $where );
//		$this->query->addParams( $p );
	}

	/**
	 * Управление сортировкой данных
	 *
	 * @param array $sort [fieldname => ASC|DESC]
	 */
	protected function buildSort( $sort ) {
		foreach ( (array) $sort as $fieldName => $direction ) {
			preg_match_all( '/\w+/', $fieldName, $p );
			$tableName = '';
			if ( count( $p[0] ) > 1 ) {
				$tableName = $p[0][0] . '.';
				$fieldName = $p[0][1];
			}
//				$modelclass = $query->modelClass;
//				$fieldName  = $modelclass::getSortFieldName( $fieldName );
			$this->query->addOrderBy( [ $tableName . $fieldName => $direction == 'desc' ? SORT_DESC : SORT_ASC ] );
		}
	}


	protected function buildExpand( $expand, $showDeleted = null ) {
		$expandResult = [ ];


		foreach ( $expand as $key => $result ) {
			$schema     = \Yii::$app->db->schema;
			$method = 'with';
			if (is_numeric($key)){
				$key = $result;
			}
			$expandResult[] = $key;
			$this->query->$method( [
				$key => function ( $query ) use ( $result, $showDeleted,$schema ) {
					$className = $query->modelClass;
					$tableSchema = $schema->getTableSchema($className::tableName());
					if ( isset( $tableSchema->columns['is_deleted'] ) ) {
						$query->andWhere(['is_deleted'=>false]);
					}
//					if ( isset( $result['filter'] ) ) {
//						$queryBuilder = new ApiQueryBuilder( \Yii::$app->db,$query );
//						$queryBuilder->attachCondition($result['filter'],$query->params);
//
//					}
//
//					if ( isset( $result['sort'] ) ) {
//						foreach ( (array) $result['sort'] as $fieldName => $direction ) {
//							$query->addOrderBy( [ $fieldName => $direction == 'desc' ? SORT_DESC : SORT_ASC ] );
//						}
//					}
				}
			] );
		}

		return $expandResult;
	}


}
