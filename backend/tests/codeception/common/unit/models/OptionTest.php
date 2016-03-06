<?php

namespace tests\codeception\common\unit\models;

use common\models\servicesTypes\Option;
use tests\codeception\common\fixtures\CategoryFixture;
use tests\codeception\common\fixtures\OptionFixture;
use tests\codeception\common\fixtures\ServiceFixture;
use Yii;
use tests\codeception\common\unit\DbTestCase;
use Codeception\Specify;
use tests\codeception\common\fixtures\UserFixture;

/**
 * Login form test
 */
class OptionTest extends DbTestCase {
	public function testCreateFailed() {
		$option             = new Option();
		$option->scenario   = Option::SCENARIO_CREATE;
		$option->attributes = [
			'title'       => 'Test category',
			'description' => 'Test description',
			'cost'        => 100,
			'service_id'  => 1,
		];
		$this->assertFalse( $option->save() );
		$this->assertNotNull( $option->getFirstError( 'service_id' ) );
	}

	public function testCreateSuccess() {
		$option             = new Option();
		$option->scenario   = Option::SCENARIO_CREATE;
		$option->attributes = [
			'title'       => 'Test category',
			'description' => 'Test description',
			'cost'        => 100,
			'service_id'  => 4,
		];
		$this->assertTrue( $option->save() );
		$this->assertNotNull( $option->title );
	}

	public function testUpdate() {
		$option = $this->option( 1 );

		$option->title = 'UPDATE';

		$this->assertTrue( $option->save() );
		$option->save();
		$option->refresh();

		$this->assertEquals( 'UPDATE', $option->title );
	}

	public function testDelete() {
		$option = $this->option( 1 );

		$option->delete();

		$option->refresh();
		$this->assertTrue( $option->is_deleted );
	}

	/**
	 * @inheritdoc
	 */
	public function fixtures() {
		return [
			'category' => CategoryFixture::className(),
			'service'  => ServiceFixture::className(),
			'option'   => OptionFixture::className()
		];
	}
}
