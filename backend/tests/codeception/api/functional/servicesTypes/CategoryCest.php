<?php
namespace tests\codeception\api\functional;

use common\models\servicesTypes\Category;
use tests\codeception\api\FunctionalTester;
use tests\codeception\common\fixtures\CategoryFixture;

class CategoryCest {
	public function _before( FunctionalTester $I ) {
		$I->initFixtures( [
			CategoryFixture::className()
		] );
	}

	public function _after( FunctionalTester $I ) {
	}

	public function view( FunctionalTester $I ) {
		$I->sendGET( 'services-types/categories/1' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( 'id' );
	}

	public function index( FunctionalTester $I ) {
		$I->sendGET( 'services-types/categories' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( '[0].id' );
	}

	public function update( FunctionalTester $I ) {
		$I->sendPUT( 'services-types/categories/1', [
			'title' => 'test_new'
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeRecord( Category::className(), [
			'id'    => 1,
			'title' => 'test_new'
		] );
	}

	public function create( FunctionalTester $I ) {
		$I->sendPOST( 'services-types/categories', [
			'title' => 'test'
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
		$I->seeRecord( Category::className(), [ 'id' => $I->grabDataFromResponseByJsonPath( 'id' ) ] );
	}

	public function delete( FunctionalTester $I ) {
		$I->sendDELETE( 'services-types/categories/1');
		$I->seeResponseCodeIs( 204 );
	}

}