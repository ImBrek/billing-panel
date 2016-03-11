<?php

namespace tests\codeception\common\unit\models;

use common\models\User;
use Yii;
use tests\codeception\common\unit\DbTestCase;
use Codeception\Specify;
use common\models\LoginForm;
use tests\codeception\common\fixtures\UserFixture;

/**
 * Login form test
 */
class UserTest extends DbTestCase {
	/**
	 * @inheritdoc
	 */
	public function fixtures() {
		return [
			'user' => UserFixture::className()
		];
	}

	public function testCreate() {
		$model             = new User( [ 'scenario' => User::SCENARIO_CREATE ] );
		$model->attributes = [
			'name'     => 'Baranov Anton Dmitrievich',
			'password' => '12345',
			'username' => 'Brek',
			'jabber'   => 'Brek@jabber.com',
			'email'    => 'test@test.com'
		];
		$this->assertTrue( $model->save() );
	}

	public function testUpdate() {
		$model = $this->user(0);

		$model->name = 'Test';

		$this->assertTrue($model->save());
		$model->refresh();
		$this->assertEquals('Test',$model->name);
	}

}
