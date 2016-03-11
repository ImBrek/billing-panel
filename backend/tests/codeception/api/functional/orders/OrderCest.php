<?php
namespace tests\codeception\api\functional;

use common\models\order\Order;
use common\models\order\OrderedService;
use common\models\servicesTypes\Category;
use tests\codeception\api\FunctionalTester;
use tests\codeception\common\fixtures\OrderedServiceFixture;

class OrderCest {
	public function _before( FunctionalTester $I ) {
		$I->initFixtures( [
			OrderedServiceFixture::className()
		] );
	}

	public function _after( FunctionalTester $I ) {
	}

	public function view( FunctionalTester $I ) {
		$I->sendGET( 'orders/orders/1' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( 'id' );
	}

	public function index( FunctionalTester $I ) {
		$I->sendGET( 'orders/orders' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( '[0].id' );
	}

	public function update( FunctionalTester $I ) {
		$I->sendPUT( 'orders/orders/1' );
		$I->seeResponseCodeIs( 404 );
	}

	public function create( FunctionalTester $I ) {
		$I->sendPOST( 'orders/orders', [
			'client_id'        => 1,
			'ordered_services' => [
				[
					'service_id' => 6,
					'value'      => 'test',
				],
				[
					'service_id' => 1,
				],
				[
					'option_id' => 1,
				],
				[
					'option_id' => 4,
				],
			]
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
		$id = $I->grabDataFromResponseByJsonPath( 'id' );
		$I->seeRecord( Order::className(), [ 'id' => $I->grabDataFromResponseByJsonPath( 'id' ) ] );
		$I->seeRecord( OrderedService::className(), [
			'order_id'   => $id,
			'service_id' => 1
		] );
		$I->seeRecord( OrderedService::className(), [
			'order_id'   => $id,
			'service_id' => 6,
			'value'      => 'test'
		] );
		$I->seeRecord( OrderedService::className(), [
			'option_id' => 1,
			'order_id'  => $id
		] );
		$I->seeRecord( OrderedService::className(), [
			'option_id' => 4,
			'order_id'  => $id
		] );
	}

	public function delete( FunctionalTester $I ) {
		$I->sendDELETE( 'orders/orders/1' );
		$I->seeResponseCodeIs( 204 );
	}

}