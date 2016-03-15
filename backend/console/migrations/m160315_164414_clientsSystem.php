<?php

use yii\db\Migration;

class m160315_164414_clientsSystem extends Migration {

	public function safeUp() {
		$this->dropColumn('user','created_at');
		$this->dropColumn('user','updated_at');
		$this->addColumn('user','created_at','timestamp DEFAULT NOW()');
		$this->addColumn('user','is_admin','bool DEFAULT false');
		$this->addColumn('user','client_id','int4 REFERENCES "client" ON DELETE SET NULL ON UPDATE CASCADE');

		$this->addColumn('ord.ord','created_at','timestamp DEFAULT NOW()');
		$this->addColumn('ord.ord','is_paid','bool DEFAULT false');

		$this->addColumn('client','created_at','timestamp DEFAULT NOW()');
		$this->addColumn('client','title','varchar(255)');


	}

	public function safeDown() {
		$this->dropColumn('client','created_at');
		$this->dropColumn('client','title');

		$this->dropColumn('ord.ord','is_paid');
		$this->dropColumn('ord.ord','created_at');

		$this->dropColumn('user','is_admin');
		$this->dropColumn('user','client_id');
		$this->addColumn('user','updated_at','timestamp DEFAULT NOW()');

	}

}
