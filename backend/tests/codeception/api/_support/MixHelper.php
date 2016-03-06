<?php

namespace tests\codeception\api\_support;

use tests\codeception\common\fixtures\UserFixture;
use Codeception\Module;
use yii\test\FixtureTrait;
use yii\test\InitDbFixture;

/**
 * This helper is used to populate the database with needed fixtures before any tests are run.
 * In this example, the database is populated with the demo login user, which is used in acceptance
 * and functional tests.  All fixtures will be loaded before the suite is started and unloaded after it
 * completes.
 */
class MixHelper extends Module {
	public $insertedRecords = [ ];

	public function addAuthorizationHeader( $userId ) {
		$user = $this->getModule( 'Yii2' )->grabRecord( 'common\models\User', array( 'id' => $userId ) );
        $this->getModule( 'REST' )->haveHttpHeader( 'Authorization', 'Bearer ' . $user->access_token );;
		$this->getModule( 'REST' )->haveHttpHeader( 'Content-Type', 'application/json' );
	}

	public function haveTempRecord( $className, $attributes ) {
		$id = $this->getModule( 'Yii2' )->haveRecord( $className, $attributes );
		$this->insertedRecords[ $className ][] = $id;
		return $id;
	}

	public function _after() {
		foreach ( $this->insertedRecords as $className => $ids ) {
			/** @var ActiveRecord $ids */
			$className::deleteAll( [ 'id' => $ids ] );
		}
//        Event::flush();
	}

}
