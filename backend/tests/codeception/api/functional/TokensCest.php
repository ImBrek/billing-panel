<?php
namespace tests\codeception\api\functional;

use common\models\servicesTypes\Category;
use common\models\User;
use tests\codeception\api\FunctionalTester;
use tests\codeception\common\fixtures\CategoryFixture;
use tests\codeception\common\fixtures\UserFixture;

class TokensCest {
	public function _before( FunctionalTester $I ) {
		$I->initFixtures( [
			UserFixture::className()
		] );
	}

	public function _after( FunctionalTester $I ) {
	}

	public function createByUsername( FunctionalTester $I ) {
		$I->sendPOST( 'tokens', [
			'username' => 'erau',
			'password' => 'password_0'
		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
	}

	public function createByRefreshToken( FunctionalTester $I ) {
		$I->sendPOST( 'tokens', [
			'refresh_token' => 'refresh_token'

		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 201 );
	}

	public function createByExpiresRefreshToken( FunctionalTester $I ) {
		$I->haveTempRecord(User::className(),	[
			'username' => 'test',
			'auth_key' => 'tUu1qHcde0diwUol3xeI-18MuHkkprQI',
			// password_0
			'password_hash' => '$2y$13$nJ1WDlBaGcbCdbNC5.5l4.sgy.OMEKCqtDQOdQ2OWpgiKRWYyzzne',
			'password_reset_token' => 'hdfghfghfEFfYR7VbMr_1392559490',
			'email' => 'test@jenkins.info',
			'access_token'          => 'access_token',
			'refresh_token'         => 'refresh_token_expires',
			'refresh_token_expires' => date('Y-m-d G:i:s', strtotime("now -1 day")),
			'access_token_expires'  => date('Y-m-d G:i:s', strtotime("now +1 day")),
		]);
		$I->sendPOST( 'tokens', [
			'refresh_token' => 'refresh_token_expires'

		] );
		$I->seeResponseIsJson();
		$I->seeResponseCodeIs( 401 );
	}


}