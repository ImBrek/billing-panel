<?php

use yii\db\Migration;

class m160311_171112_alterUser extends Migration {

	public function safeUp() {
		$this->addColumn('user','jabber','varchar(100)');
		$this->addColumn('user','name','varchar(100)');
	}

	public function safeDown() {
		$this->dropColumn('user','jabber');
		$this->dropColumn('user','name');
	}
}
