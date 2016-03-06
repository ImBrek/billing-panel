<?php
namespace tests\codeception\api;

use common\models\User;
use yii\base\Event;
use yii\db\ActiveRecord;

/**
 * Inherited Methods
 * @method void wantToTest( $text )
 * @method void wantTo( $text )
 * @method void execute( $callable )
 * @method void expectTo( $prediction )
 * @method void expect( $prediction )
 * @method void amGoingTo( $argumentation )
 * @method void am( $role )
 * @method void lookForwardTo( $achieveValue )
 * @method void comment( $description )
 * @method \Codeception\Lib\Friend haveFriend( $name, $actorClass = null )
 *
 * @SuppressWarnings(PHPMD)
 */
class FunctionalTester extends \Codeception\Actor {
	use _generated\FunctionalTesterActions;





	/**
	 * @inheritDoc
	 */
	public function initFixtures( $fixtures ) {
		$this->loadFixtures($this->createFixtures($fixtures));
	}

}
