<?php

use yii\db\Migration;

class m160304_202236_services_types extends Migration {
	public function safeUp() {
		$this->execute( 'CREATE SCHEMA services_types' );

		$this->createTable( 'services_types.category', [
			'id'          => 'serial4 PRIMARY KEY',
			'title'       => 'varchar(255) NOT NULL',
			'description' => 'varchar(255)',
			'is_deleted'  => 'boolean DEFAULT false'
		] );
		$this->createTable( 'services_types.service', [
			'id'          => 'serial4 PRIMARY KEY',
			'title'       => 'varchar(255) NOT NULL',
			'description' => 'varchar(255)',
			'type'        => 'int2 DEFAULT 0',
			'cost'        => 'real CHECK (cost>=0)',
			'category_id' => 'int4 REFERENCES services_types.category ON DELETE CASCADE ON UPDATE CASCADE ',
			'is_deleted'  => 'boolean DEFAULT false',
			'parent_id'   => 'int4 REFERENCES services_types.service ON DELETE CASCADE ON UPDATE CASCADE'
		] );
		$this->createTable( 'services_types.option', [
			'id'          => 'serial4 PRIMARY KEY',
			'title'       => 'varchar(255) NOT NULL',
			'description' => 'varchar(255)',
			'cost'        => 'real CHECK (cost>=0)',
			'service_id'  => 'int4 NOT NULL REFERENCES services_types.service ON DELETE CASCADE ON UPDATE CASCADE ',
			'is_deleted'  => 'boolean DEFAULT false'
		] );

	}

	public function safeDown() {
		$this->dropTable( 'services_types.option' );
		$this->dropTable( 'services_types.service' );
		$this->dropTable( 'services_types.category' );
		$this->execute( 'DROP SCHEMA services_types' );

	}

}
