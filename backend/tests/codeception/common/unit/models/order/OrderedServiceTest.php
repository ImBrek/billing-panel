<?php

namespace tests\codeception\common\unit\models\order;

use common\models\order\OrderedService;
use tests\codeception\common\fixtures\OrderedServiceFixture;
use tests\codeception\common\fixtures\OrderFixture;
use Yii;
use tests\codeception\common\unit\DbTestCase;
use Codeception\Specify;
use common\models\LoginForm;

class OrderedServiceTest extends DbTestCase {
	/**
	 * @inheritdoc
	 */
	public function fixtures() {
		return [
			'ordered_service' => OrderedServiceFixture::className()
		];
	}

	public function testCreate() {
		$service = new OrderedService([
			'scenario'=>OrderedService::SCENARIO_CREATE
		]);
		$service->attributes = [
			'option_id'=>1,
			'order_id'=>2
		];

		$this->assertTrue($service->save());
	}

	public function testValidateOption(){
		$service = new OrderedService([
			'scenario'=>OrderedService::SCENARIO_CREATE
		]);
		$service->attributes = [
			'order_id'=>2
		];

		$this->assertFalse($service->validate());
		$this->assertNotNull($service->getFirstError('option_id'));
		$this->assertNotNull($service->getFirstError('service_id'));
	}

	public function testValidateValue(){
		$service = new OrderedService([
			'scenario'=>OrderedService::SCENARIO_CREATE
		]);
		$service->attributes = [
			'order_id'=>2,
			'service_id'=>6
		];

		$this->assertFalse($service->validate());
		$this->assertNotNull($service->getFirstError('value'));
	}




}
