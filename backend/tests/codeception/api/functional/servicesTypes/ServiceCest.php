<?php
namespace tests\codeception\api\functional;

use common\models\servicesTypes\Category;
use common\models\servicesTypes\Option;
use common\models\servicesTypes\Service;
use tests\codeception\api\FunctionalTester;
use tests\codeception\common\fixtures\CategoryFixture;
use tests\codeception\common\fixtures\OptionFixture;
use tests\codeception\common\fixtures\ServiceFixture;

class ServiceCest {
	public function _before( FunctionalTester $I ) {
		$I->initFixtures( [
			CategoryFixture::className(),
			ServiceFixture::className(),
			OptionFixture::className()
		] );
	}

	public function _after( FunctionalTester $I ) {
	}

	public function view( FunctionalTester $I ) {
		$I->sendGET( 'services-types/services/1' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( 'id' );
	}

	public function index( FunctionalTester $I ) {
		$I->sendGET( 'services-types/services' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( '[0].id' );
	}

	public function update( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendPUT( 'services-types/services/1', [
			'title' => 'test_new'
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeRecord( Service::className(), [
			'id'    => 1,
			'title' => 'test_new'
		] );
	}

	public function create( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendPOST( 'services-types/services', [
			'title'       => 'test_new',
			'type'        => 1,
			'cost'        => 1000,
			'category_id' => 1
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
		$I->seeRecord( Service::className(), [ 'id' => $I->grabDataFromResponseByJsonPath( 'id' ) ] );
	}

	public function createWithOptions( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendPOST( 'services-types/services', [
			'title'       => 'test_new_super',
			'type'        => Service::TYPE_SELECT,
			'cost'        => 1000,
			'parent_id' => 1,
			'options'     => [
				[
					'title' => 'Option1',
					'cost'  => 1
				],
				[
					'title' => 'Option2',
					'cost'  => 1
				]
			]
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
		$id = $I->grabDataFromResponseByJsonPath( 'id' );
		$I->seeRecord( Service::className(), [ 'id' => $id ] );
		$I->seeRecord( Option::className(), [ 'service_id' => $id, 'title' => 'Option1' ] );
		$I->seeRecord( Option::className(), [ 'service_id' => $id, 'title' => 'Option2' ] );
	}

	public function updateWithOptions( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendPUT( 'services-types/services/4', [
			'id'      => 4,
			'title'   => 'test_new_super',
			'options' => [
				[
					'id'         => 1,
					'is_deleted' => true
				],
				[
					'id'    => 2,
					'title' => 'Option20',
					'cost'  => 100,
				]
			]
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );

		$I->seeRecord( Option::className(), [ 'id' => 1, 'is_deleted' => true ] );
		$I->seeRecord( Option::className(), [ 'id' => 2, 'title' => 'Option20' ] );
	}

	public function delete( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendDELETE( 'services-types/services/1' );
		$I->seeResponseCodeIs( 204 );
	}

}