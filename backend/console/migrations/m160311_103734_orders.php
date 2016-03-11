<?php

use yii\db\Migration;

class m160311_103734_orders extends Migration {
	public function safeUp() {
		$this->execute( 'CREATE SCHEMA ord' );

		$this->createTable( 'client', [
			'id' => 'serial4 PRIMARY KEY'
		] );

		$this->createTable( 'ord.ord', [
			'id'         => 'serial4 PRIMARY KEY',
			'author_id'  => 'int4 REFERENCES "user" ON DELETE SET NULL ON UPDATE CASCADE ',
			'client_id'  => 'int4 REFERENCES client ON DELETE SET NULL ON UPDATE CASCADE ',
			'is_deleted' => 'boolean DEFAULT false'
		] );

		$this->createTable( 'ord.ordered_service', [
			'id'         => 'serial4 PRIMARY KEY',
			'option_id'  => 'int4 REFERENCES services_types.option ON DELETE SET NULL ON UPDATE CASCADE',
			'order_id'   => 'int4 REFERENCES ord.ord ON DELETE SET NULL ON UPDATE CASCADE',
			'service_id' => 'int4 REFERENCES services_types.service ON DELETE SET NULL ON UPDATE CASCADE',
			'value'      => 'varchar(255)'
		] );


	}

	public function safeDown() {
		$this->dropTable( 'ord.ordered_service' );
		$this->dropTable( 'ord.ord' );
		$this->dropTable( 'client' );
		$this->execute( 'DROP SCHEMA ord' );
	}
}
