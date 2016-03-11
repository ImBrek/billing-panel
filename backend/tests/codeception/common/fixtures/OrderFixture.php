<?php

namespace tests\codeception\common\fixtures;

use yii\test\ActiveFixture;

class OrderFixture extends ActiveFixture {
	public $modelClass = 'common\models\order\Order';
	public $depends = [
		'tests\codeception\common\fixtures\ClientFixture'
	];
}
