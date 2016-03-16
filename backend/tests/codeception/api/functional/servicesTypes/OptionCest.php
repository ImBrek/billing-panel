<?php
namespace tests\codeception\api\functional;

use common\models\servicesTypes\Option;
use common\models\servicesTypes\Service;
use tests\codeception\api\FunctionalTester;
use tests\codeception\common\fixtures\CategoryFixture;
use tests\codeception\common\fixtures\OptionFixture;
use tests\codeception\common\fixtures\ServiceFixture;

class OptionCest {
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
		$I->sendGET( 'services-types/options/1' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( 'id' );
	}

	public function index( FunctionalTester $I ) {
		$I->sendGET( 'services-types/options' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( '[0].id' );
	}

	public function update( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendPUT( 'services-types/options/1', [
			'title' => 'test_new'
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeRecord( Option::className(), [
			'id'    => 1,
			'title' => 'test_new'
		] );
	}

	public function create( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendPOST( 'services-types/options', [
			'title' => 'test_new',
			'cost'=>1000,
			'service_id'=>4
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
		$I->seeRecord( Option::className(), [ 'id' => $I->grabDataFromResponseByJsonPath( 'id' ) ] );
	}

	public function delete( FunctionalTester $I ) {
		$I->addAuthorizationHeader(1);
		$I->sendDELETE( 'services-types/options/1');
		$I->seeResponseCodeIs( 204 );
	}

	public function createOnlyAdmins( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendPOST( 'services-types/options', [
			'title' => 'test_new',
			'cost'=>1000,
			'service_id'=>4
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 403 );
	}

}