<?php
namespace tests\codeception\api\functional;

use common\models\order\Order;
use common\models\order\OrderedService;
use common\models\servicesTypes\Category;
use tests\codeception\api\FunctionalTester;
use tests\codeception\common\fixtures\OrderedServiceFixture;
use tests\codeception\common\fixtures\UserFixture;

class OrderCest {
	public function _before( FunctionalTester $I ) {
		$I->initFixtures( [
			OrderedServiceFixture::className(),
			UserFixture::className()
		] );
	}

	public function _after( FunctionalTester $I ) {
	}

	public function view( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendGET( 'orders/orders/1' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( 'id' );
	}

	public function index( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendGET( 'orders/orders' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( '[0].id' );
	}

	public function update( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendPUT( 'orders/orders/1' );
		$I->seeResponseCodeIs( 404 );
	}

	public function create( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendPOST( 'orders/orders', [
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
		$I->seeRecord( Order::className(), [ 'id' => $id ] );
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

		$order = $I->grabRecord(Order::className(),['id'=>$id]);
		$I->assertNotNull($order->client_id);

	}

	public function delete( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendDELETE( 'orders/orders/1' );
		$I->seeResponseCodeIs( 204 );
	}

	public function deleteOnlyAdmins( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendDELETE( 'orders/orders/1' );
		$I->seeResponseCodeIs( 403 );
	}

	public function indexForRegularUser( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendGET( 'orders/orders' );
		$I->seeResponseCodeIs( 200 );
		$orders = $I->grabDataFromResponseByJsonPath('')[0];
		$I->assertEquals(1,count($orders));
		$I->assertEquals(1,$orders[0]['client_id']);
	}

	public function indexForAdminUser( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendGET( 'orders/orders' );
		$I->seeResponseCodeIs( 200 );
		$orders = $I->grabDataFromResponseByJsonPath('')[0];
		$I->assertEquals(2,count($orders));
	}

	public function viewAnotherOrdersForAdmin( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendGET( 'orders/orders/2' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 403 );
	}



}