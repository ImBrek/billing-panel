<?php
namespace tests\codeception\api\functional;

use common\models\User;
use tests\codeception\api\FunctionalTester;
use tests\codeception\common\fixtures\UserFixture;

class UsersCest {
	public function _before( FunctionalTester $I ) {
		$I->initFixtures( [
			UserFixture::className()
		] );
	}

	public function _after( FunctionalTester $I ) {
	}

	public function view( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendGET( 'users/1' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( 'id' );
	}

	public function index( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendGET( 'users' );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 200 );
		$I->seeResponseJsonMatchesJsonPath( '[0].id' );
	}

	public function update( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendPUT( 'users/1' );
		$I->seeResponseCodeIs( 404 );
	}

	public function create( FunctionalTester $I ) {
		$I->sendPOST( 'users', [
			'name'     => 'Baranov Anton Dmitrievich',
			'password' => '12345',
			'username' => 'Brek',
			'jabber'   => 'Brek@jabber.com',
			'email'    => 'test@test.com'
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
		$id = $I->grabDataFromResponseByJsonPath( 'id' );
		$I->seeRecord( User::className(), [ 'id' => $id ] );
	}

	public function delete( FunctionalTester $I ) {
		$I->addAuthorizationHeader(2);
		$I->sendDELETE( 'users/1' );
		$I->seeResponseCodeIs( 404 );
	}

}