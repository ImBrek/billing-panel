<?php

namespace tests\codeception\common\unit\models\order;

use common\models\order\Order;
use tests\codeception\common\fixtures\OptionFixture;
use tests\codeception\common\fixtures\OrderedServiceFixture;
use tests\codeception\common\fixtures\OrderFixture;
use Yii;
use tests\codeception\common\unit\DbTestCase;
use Codeception\Specify;
use common\models\LoginForm;

class OrderTest extends DbTestCase {
	/**
	 * @inheritdoc
	 */
	public function fixtures() {
		return [
			'order'  => OrderFixture::className(),
			'option' => OptionFixture::className(),
		];
	}

	public function testCreate() {
		$order             = new Order();
		$order->scenario   = Order::SCENARIO_CREATE;
		$order->attributes = [
			'client_id' => 1
		];
		$this->assertTrue( $order->save(),print_r($order->getErrors(),true) );

	}

	public function testCreateWithServices() {
		$order                  = new Order();
		$order->scenario        = Order::SCENARIO_CREATE;
		$order->attributes      = [
			'client_id' => 1
		];
		$order->orderedServices = [
			[
				'service_id' => 6,
				'value'      => 65, //input type service
			],
			[
				'service_id' => 1, // root service
			],
			[
				'option_id' => 1, // select type service
			],
			[
				'option_id' => 4, // select type service
			],
		];

		$this->assertTrue( $order->save() );
	}

	public function testValidateWithoutRootService() {
		$order                  = new Order();
		$order->scenario        = Order::SCENARIO_CREATE;
		$order->attributes      = [
			'clientId' => 1
		];
		$order->orderedServices = [
			[
				'service_id' => 6,
				'value'      => 65, //input type service
			],
			[
				'option_id' => 1, // select type service
			],
			[
				'option_id' => 4, // select type service
			],
		];

		$this->assertFalse( $order->validate() );
		$this->assertNotNull( $order->getFirstError( 'services[root]' ) );
	}

	public function testValidateWithBadService() {
		$order                  = new Order();
		$order->scenario        = Order::SCENARIO_CREATE;
		$order->attributes      = [
			'clientId' => 1
		];
		$order->orderedServices = [
			[
				'service_id' => 6, //input type service
				'value'      => 65,
			],
			[
				'service_id' => 2, // root service
			]
		];

		$this->assertFalse( $order->validate() );
		$this->assertEquals( $order->getFirstError( 'services[0]' ), 'Service not descendant root service' );
	}

	public function testValidateWithBadOption() {
		$order                  = new Order();
		$order->scenario        = Order::SCENARIO_CREATE;
		$order->attributes      = [
			'client_id' => 1
		];
		$order->orderedServices = [
			[
				'service_id' => 2, // root service
			],
			[
				'option_id' => 1, // select type service
			],
		];

		$this->assertFalse( $order->validate() );
		$this->assertEquals( 'Option not descendant root service', $order->getFirstError( 'services[1]' ) );
	}

	public function testValidateChildModel() {
		$order                  = new Order();
		$order->scenario        = Order::SCENARIO_CREATE;
		$order->attributes      = [
			'client_id' => 1
		];
		$order->orderedServices = [
			[
				'service_id' => 6, //input type service
			],
			[
				'service_id' => 1, // root service
			],
			[
				'option_id' => 1, // select type service
			],
			[
				'option_id' => 4, // select type service
			],
		];

		$this->assertFalse( $order->validate() );
		$this->assertNotNull( $order->getFirstError( 'services[0]' ) );
	}

	public function testValidateServicesAmount() {
		$order                  = new Order();
		$order->scenario        = Order::SCENARIO_CREATE;
		$order->attributes      = [
			'client_id' => 1
		];
		$order->orderedServices = [
			[
				'service_id' => 6, //input type service
				'value'      => 65,
			],
			[
				'service_id' => 1, // root service
			],
			[
				'option_id' => 1, // select type service
			],
		];

		$this->assertFalse( $order->validate() );
		$this->assertEquals( "Not enough services", $order->getFirstError( 'services' ) );
	}

	public function testDelete(){
		$order = $this->order(1);

		$order->delete();

		$order->refresh();
		$this->assertTrue($order->is_deleted);
	}

}
