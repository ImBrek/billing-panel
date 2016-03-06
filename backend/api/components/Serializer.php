<?php
namespace api\components;

use yii\base\Model;
use yii\data\DataProviderInterface;

class Serializer extends \yii\rest\Serializer {
	public $_expand = [ ];

	public function serialize( $data, $expand = [ ] ) {
		$this->_expand = $expand;

		return parent::serialize( $data );
	}

}