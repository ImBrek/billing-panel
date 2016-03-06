<?php

use yii\db\Migration;

class m160306_001927_authenticationSystem extends Migration {

	public function safeUp() {
		$this->addColumn( 'user', 'access_token', 'varchar(255)' );
		$this->addColumn( 'user', 'access_token_expires', 'timestamp' );
		$this->addColumn( 'user', 'refresh_token', 'varchar(255)' );
		$this->addColumn( 'user', 'refresh_token_expires', 'timestamp' );
		$this->addColumn( 'user', 'last_login_time', 'timestamp' );
	}

	public function safeDown() {
		$this->dropColumn( 'user', 'access_token' );
		$this->dropColumn( 'user', 'access_token_expires' );
		$this->dropColumn( 'user', 'refresh_token' );
		$this->dropColumn( 'user', 'refresh_token_expires' );
		$this->dropColumn( 'user', 'last_login_time' );
	}

}
