<?php

namespace tests\codeception\common\fixtures;

use yii\test\ActiveFixture;

class OrderedServiceFixture extends ActiveFixture {
	public $modelClass = 'common\models\order\OrderedService';
	public $depends = [
		'tests\codeception\common\fixtures\OrderFixture',
		'tests\codeception\common\fixtures\ServiceFixture',
		'tests\codeception\common\fixtures\OptionFixture'
	];

}
