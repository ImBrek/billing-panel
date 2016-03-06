<?php
namespace api\components;

use common\models\Owners;
use yii\base\Exception;
use yii\base\InvalidParamException;
use yii\db\Expression;
use yii\db\QueryBuilder;
use yii\helpers\ArrayHelper;
use yii\sphinx\Query;

class ApiQueryBuilder extends QueryBuilder {
	private $sphinxConditions = [ ];
	private $parentQuery;
	private $tableName;

	public function __construct( $db, $parentQuery, $config = [ ] ) {
		parent::__construct( $db, $config );
		$this->parentQuery = $parentQuery;
		$class             = $parentQuery->modelClass;
		$this->tableName   = $class::tableName();
	}

	protected $conditionBuilders = [
//		'NOT'        => 'buildNotCondition',
		'AND'        => 'buildAndCondition',
		'OR'         => 'buildAndCondition',
//		'BETWEEN'     => 'buildBetweenCondition',
//		'NOT BETWEEN' => 'buildBetweenCondition',
		'IN'         => 'buildInCondition',
//		'NOT IN'      => 'buildInCondition',
//		'LIKE'        => 'buildLikeCondition',
//		'ILIKE'       => 'buildLikeCondition',
//		'NOT LIKE'    => 'buildLikeCondition',
//		'OR LIKE'     => 'buildLikeCondition',
//		'OR NOT LIKE' => 'buildLikeCondition',
//		'EXISTS'      => 'buildExistsCondition',
//		'NOT EXISTS'  => 'buildExistsCondition',
//		'>'           => 'buildComparisonCondition',
//		'>='          => 'buildComparisonCondition',
//		'<='          => 'buildComparisonCondition',
//		'<'           => 'buildComparisonCondition',
		'SPHINX'     => 'buildSphinxCondition',
		'PRIVOBJECT' => 'privObjectCondition',
		'ACTION'     => 'actionCondition',
		'CLASS'      => 'classCondition'
	];

	public function buildCondition( $condition, &$params ) {
		if ( ! is_array( $condition ) ) {
			throw new InvalidParamException( "'$condition' must be array" );
		}

		return parent::buildCondition( $condition, $params );
	}

	public function buildComparisonCondition( $operator, $operands, &$params ) {
		if ( ! isset( $operands[0], $operands[1] ) ) {
			throw new InvalidParamException( "Operator '$operator' requires two operands." );
		}

		list( $column, $value ) = $operands;

		$column = $this->db->quoteColumnName( $column );

		$phName            = self::PARAM_PREFIX . count( $params );
		$params[ $phName ] = $value;

		return "$column $operator $phName";
	}

	public function buildLikeCondition( $operator, $operands, &$params ) {
		if ( ! isset( $operands[0], $operands[1] ) ) {
			throw new InvalidParamException( "Operator '$operator' requires two operands." );
		}

		$escape = isset( $operands[2] ) ? $operands[2] : [ '%' => '\%', '_' => '\_', '\\' => '\\\\' ];
		unset( $operands[2] );

		if ( ! preg_match( '/^(AND |OR |)(((NOT |))I?LIKE)/', $operator, $matches ) ) {
			throw new InvalidParamException( "Invalid operator '$operator'." );
		}
		$andor    = ' ' . ( ! empty( $matches[1] ) ? $matches[1] : 'AND ' );
		$not      = ! empty( $matches[3] );
		$operator = $matches[2];

		list( $column, $values ) = $operands;

		$values = (array) $values;

		if ( empty( $values ) ) {
			return $not ? '' : '0=1';
		}

		if ( strpos( $column, '(' ) === false ) {
			$column = $this->db->quoteColumnName( $column );
		}

		$parts = [ ];
		foreach ( $values as $value ) {
			$phName            = self::PARAM_PREFIX . count( $params );
			$params[ $phName ] = empty( $escape ) ? $value : ( '%' . strtr( $value, $escape ) . '%' );
			$parts[]           = "$column::text $operator $phName";
		}

		return implode( $andor, $parts );
	}

	public function buildSphinxCondition( $operator, $operands, &$params ) {
		if ( ! isset( $operands[0] ) ) {
			throw new InvalidParamException( "Operator '$operator' requires one or two operands." );
		}

		list( $indexName, $fields ) = $operands;

		//Используется большой limit, это ОЧЕНЬ плохо, нужно переделать на временную табличку, или на модуль sphinx для postgres
		$query = ( new Query() )->from( [ $indexName, $indexName . 'Delta' ] )->select( '_id' )->limit( 3000 );
		if ( is_array( $fields ) ) {
			$result = '';
			foreach ( $fields as $fieldName => $value ) {
				if ( ! $value ) {
					continue;
				}
				$result .= '@' . $fieldName . ' ' . \Yii::$app->sphinx->escapeMatchValue( $value ) . ' ';
			}
			//Защита от пустых запросов
			if ( empty( $result ) ) {
				return '';
			}
			$query->match( new Expression( ':match', [ 'match' => $result ] ) );
		} else {
			//Защита от пустых запросов
			if ( empty( $fields ) ) {
				return '';
			}
			$result = \Yii::$app->sphinx->escapeMatchValue( $fields );
			$query->match( new Expression( ':match', [ 'match' => $result ] ) );
		}

		return $this->buildInCondition( 'IN', [ 'id', $query->column() ], $params );

	}

	public function actionCondition( $operator, $operands, &$params ) {
		if ( ! isset( $operands[0] ) ) {
			throw new InvalidParamException( "Operator '$operator' requires one operand." );
		}
		$action = $operands[0];

		if ( $action >= 0 && $action <= 3 ) {
			$userId = \Yii::$app->user->id;

			return "check_priv(\"privMask\",$userId,$action)";
		} else {
			throw new Exception( 'Undefined action type ' . $action );
		}
	}

	public function privObjectCondition( $operator, $operands, &$params ) {
		if ( ! isset( $operands[0], $operands[1] ) ) {
			throw new InvalidParamException( "Operator '$operator' requires two operands." );
		}
		$className = 'common\\models\\' . $operands[0];
		if ( ! class_exists( $className ) ) {
			throw new Exception( 'Class ' . $className . ' not found' );
		}
		$objectId = $operands[1];

		$tableName = $className::tableName();

		$result = preg_split( '/\\./', $tableName, - 1 );
		if ( count( $result ) > 1 ) {
			$table  = $result[1];
			$schema = $result[0];
		} else {
			$table  = $result[0];
			$schema = 'public';
		}
		$t = $schema . '."' . $table . '"';

		return "[[privMask]] | get_priv_mask('$t',$objectId) = [[privMask]]";

	}

	public function classCondition( $operator, $operands ) {
		$filterName = array_shift( $operands );

		$this->parentQuery->{$filterName}( ...$operands );

		return '';
	}

	public function buildHashCondition( $condition, &$params ) {
		$parts = [ ];
		foreach ( $condition as $column => $value ) {
			if ( is_array( $value ) ) {
				// IN condition
				$parts[] = $this->buildInCondition( 'IN', [ $column, $value ], $params );
			} else {
				$column = $this->prepareColumn( $column );

				if ( $value === null ) {
					$parts[] = "$column IS NULL";
				} else {
					$phName            = self::PARAM_PREFIX . count( $params );
					$parts[]           = "$column=$phName";
					$params[ $phName ] = $value;
				}
			}
		}

		return count( $parts ) === 1 ? $parts[0] : '(' . implode( ') AND (', $parts ) . ')';
	}

	public function buildInCondition( $operator, $operands, &$params ) {
		if ( ! isset( $operands[0], $operands[1] ) ) {
			throw new Exception( "Operator '$operator' requires two operands." );
		}

		list( $column, $values ) = $operands;

		if ( $values === [ ] || $column === [ ] ) {
			return $operator === 'IN' ? '0=1' : '';
		}

		$values = (array) $values;

		foreach ( $values as $i => $value ) {
			$phName            = self::PARAM_PREFIX . count( $params );
			$params[ $phName ] = $value;
			$values[ $i ]      = $phName;
		}

		$column = $this->prepareColumn( $column );

		if ( count( $values ) > 1 ) {
			return "$column $operator (" . implode( ', ', $values ) . ')';
		} else {
			$operator = $operator === 'IN' ? '=' : '<>';

			return $column . $operator . reset( $values );
		}
	}

	public function buildSimpleCondition( $operator, $operands, &$params ) {
		if ( count( $operands ) !== 2 ) {
			throw new InvalidParamException( "Operator '$operator' requires two operands." );
		}

		list( $column, $value ) = $operands;

		$column = $this->prepareColumn( $column );

		if ( $value === null ) {
			return "$column $operator NULL";
		} else {
			$phName            = self::PARAM_PREFIX . count( $params );
			$params[ $phName ] = $value;

			return "$column $operator $phName";
		}
	}

	protected function prepareColumn( $name ) {
		return $this->db->quoteColumnName( $this->tableName . '.' . $name );
	}

	public function attachCondition( $filter, &$params ) {
		$where = $this->buildCondition( $filter, $params );
		$this->parentQuery->andWhere( $where, $params );
	}
}
