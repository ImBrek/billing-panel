<?php
$params = array_merge(
	require( __DIR__ . '/../../common/config/params.php' ),
	require( __DIR__ . '/../../common/config/params-local.php' ),
	require( __DIR__ . '/params.php' ),
	require( __DIR__ . '/params-local.php' )
);

return [
	'id'                  => 'app-api',
	'basePath'            => dirname( __DIR__ ),
	'controllerNamespace' => 'api\controllers',
	'bootstrap'           => [
		'log',
	],
	'modules'             => [ ],
	'components'          => [
		'urlManager' => [
			'enablePrettyUrl'     => true,
			'enableStrictParsing' => true,
			'showScriptName'      => false,
			'rules'               => [
				[
					'class'      => 'api\components\UrlRule',
					'controller' => [ 'services-types/categories' => 'servicesTypes/categories' ],
//					'nestedResources' => [ ],
				],
				[
					'class'      => 'api\components\UrlRule',
					'controller' => [ 'services-types/services' => 'servicesTypes/services' ],
//					'nestedResources' => ['categories' ],
				],
				[
					'class'      => 'api\components\UrlRule',
					'controller' => [ 'services-types/options' => 'servicesTypes/options' ],
//					'nestedResources' => ['services' ],
				],
				[
					'class'      => 'api\components\UrlRule',
					'controller' => [ 'tokens' ],
//					'nestedResources' => ['services' ],
				],
				[
					'class'      => 'api\components\UrlRule',
					'controller' => [ 'orders/orders' => 'orders/orders' ],
//					'nestedResources' => ['services' ],
				],
				[
					'class'      => 'api\components\UrlRule',
					'controller' => [ 'users' ],
				],
				[
					'class'   => \yii\web\UrlRule::className(),
					'pattern' => 'users/check',
					'route'   => 'users/check',
					'verb'    => [ 'GET', 'OPTIONS' ]
				],
			],
		],
		'request'    => [
			'enableCookieValidation' => false,
			'parsers'                => [
				'application/json' => 'yii\web\JsonParser',
			]
		],
//		'errorHandler' => [
//			'errorAction' => 'site/error',
//		]
		'user'       => [
			'class'         => 'common\components\User',
			'identityClass' => 'common\models\User',
			'enableSession' => false,
		],

	],
	'params'              => $params,
];
