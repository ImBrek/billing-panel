<?php

namespace tests\codeception\common\unit\models;

use common\models\servicesTypes\Service;
use tests\codeception\common\fixtures\CategoryFixture;
use tests\codeception\common\fixtures\ServiceFixture;
use Yii;
use tests\codeception\common\unit\DbTestCase;
use Codeception\Specify;
use common\models\LoginForm;
use tests\codeception\common\fixtures\UserFixture;

/**
 * Login form test
 */
class ServiceTest extends DbTestCase {
	public function testCreate() {
		$service             = new Service();
		$service->scenario   = Service::SCENARIO_CREATE;
		$service->attributes = [
			'title'       => 'Test category',
			'description' => 'Test description',
			'type'        => 0,
			'cost'        => 100,
			'category_id' => 1,
		];
		$this->assertTrue( $service->save() );
		$this->assertNotNull( $service->title );
	}

	public function testUpdate() {
		$service = $this->service( 1 );

		$service->title = 'UPDATE';

		$this->assertTrue( $service->save() );
		$service->save();
		$service->refresh();

		$this->assertEquals( 'UPDATE', $service->title );
	}

	public function testDelete() {
		$service = $this->service( 1 );

		$service->delete();

		$service->refresh();
		$this->assertTrue( $service->is_deleted );
	}

	/**
	 * @inheritdoc
	 */
	public function fixtures() {
		return [
			'category' => CategoryFixture::className(),
			'service'  => ServiceFixture::className()
		];
	}
}
