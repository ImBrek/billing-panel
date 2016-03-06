<?php
/**
 * User: brek
 * Date: 21.04.14
 * Time: 21:30
 */

namespace common\components;

use yii\web\ForbiddenHttpException;

class User extends \yii\web\User {
	/**
	 * Проверка прав юзера на какое либо действие, проверка производится через хранимую процедуру postgres
	 * @param $className класс обьекта
	 * @param $id id обьекта
	 * @param $operation операция которую совершаем(смотри константы ObjectModel)
	 *
	 * @return array возвращает либо NULL, либо список недостающих привилегий
	 */
	public function checkObjectPriv( $tableName, $id, $operation ) {

		$result = preg_split('/\\./', $tableName, -1);
		if (count($result)>1){
			$table = $result[1];
			$schema = $result[0];
		} else {
			$table = $result[0];
			$schema = 'public';
		}

		return \Yii::$app->db->createCommand( 'select check_object_priv(:tablename,:id,:userid,:operation)', [
			'tablename' => $schema.'."' . $table . '"',
			'id'        => $id,
			'userid'    => $this->identity->id,
			'operation' => $operation
		] )->queryColumn();

	}

}