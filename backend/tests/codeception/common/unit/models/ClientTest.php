<?php

namespace tests\codeception\common\unit\models;

use tests\codeception\common\fixtures\ClientFixture;
use Yii;
use tests\codeception\common\unit\DbTestCase;
use Codeception\Specify;
use common\models\LoginForm;

class ClientTest extends DbTestCase {
	/**
	 * @inheritdoc
	 */
	public function fixtures() {
		return [
			'client' => ClientFixture::className()
		];
	}

	public function testCreate() {
	}




}
