<?php

namespace tests\codeception\common\unit\models;

use common\models\servicesTypes\Category;
use tests\codeception\common\fixtures\CategoryFixture;
use Yii;
use tests\codeception\common\unit\DbTestCase;
use Codeception\Specify;
use common\models\LoginForm;
use tests\codeception\common\fixtures\UserFixture;

/**
 * Login form test
 */
class CategoryTest extends DbTestCase {
	public function testCreate() {
		$category = new Category();
		$category->scenario = Category::SCENARIO_CREATE;
		$category->attributes = [
			'title'=>'Test category',
			'description'=> 'Test description'
		];
		$this->assertTrue($category->save());
		$this->assertNotNull($category->title);
		$this->assertNotNull($category->description);
	}

	public function testUpdate(){
		/**
		 * @var Category
		 */
	    $category = $this->category(1);

		$category->title='UPDATE';

		$this->assertTrue($category->save());
		$category->save();
		$category->refresh();

		$this->assertEquals('UPDATE',$category->title);
	}

	public function testDelete(){
		$category = $this->category(1);

		$category->delete();

		$category->refresh();
		$this->assertTrue($category->is_deleted);
	}


	/**
	 * @inheritdoc
	 */
	public function fixtures() {
		return [
			'category' => CategoryFixture::className()
		];
	}
}
