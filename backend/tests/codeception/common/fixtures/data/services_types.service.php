<?php
/**
 * User: brek
 * Date: 05.03.16
 * Time: 14:04
 */

return [
	'1'=>[
		'title'       => 'Platform 1',
		'description' => 'Platform 1',
		'cost'        => 1000,
		'category_id' => 1,
		'parent_id'   => null
	],
	'2'=>[
		'title'       => 'Platform 2',
		'description' => 'Platform 2',
		'cost'        => 2000,
		'category_id' => 1,
		'parent_id'   => null
	],
	'3'=>[
		'title'       => 'Platform 3',
		'description' => 'Platform 3',
		'cost'        => 3000,
		'category_id' => 2,
		'parent_id'   => null
	],
	'4'=>[
		'title'       => 'RAM Memory',
		'description' => 'RAM Memory',
		'type'        => 1,
		'cost'        => 0,
		'category_id' => null,
		'parent_id'   => 1
	],
	'5'=>[
		'title'       => 'Hard drive',
		'description' => 'Hard drive',
		'type'        => 1,
		'cost'        => 0,
		'category_id' => null,
		'parent_id'   => 1
	],
	'6'=>[
		'title'       => 'IP address',
		'description' => 'IP address',
		'type'        => 0,
		'cost'        => 4000,
		'category_id' => null,
		'parent_id'   => 1
	],
];