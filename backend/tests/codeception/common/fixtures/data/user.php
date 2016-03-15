<?php
/**
 * User: brek
 * Date: 06.03.16
 * Time: 3:55
 */

return [
	[
		'name'                  => 'Test Test Test',
		'username'              => 'erau',
		'auth_key'              => 'tUu1qHcde0diwUol3xeI-18MuHkkprQI',
		// password_0
		'password_hash'         => '$2y$13$nJ1WDlBaGcbCdbNC5.5l4.sgy.OMEKCqtDQOdQ2OWpgiKRWYyzzne',
		'password_reset_token'  => 'RkD_w0_8HEedzLk7MM-ZKEFfYR7VbMr_1392559490',
		'email'                 => 'sfriesen@jenkins.info',
		'jabber'                => 'test@jabber.com',
		'access_token'          => 'access_token',
		'refresh_token'         => 'refresh_token',
		'refresh_token_expires' => date( 'Y-m-d G:i:s', strtotime( "now +1 day" ) ),
		'access_token_expires'  => date( 'Y-m-d G:i:s', strtotime( "now +1 day" ) ),
		'is_admin'              => true
	],
	[
		'name'                  => 'Regular client',
		'username'              => 'reg',
		'auth_key'              => 'tUu1qHcde0diwUol3xeI-18MuHkkprQI',
		// password_0
		'password_hash'         => '$2y$13$nJ1WDlBaGcbCdbNC5.5l4.sgy.OMEKCqtDQOdQ2OWpgiKRWYyzzne',
		'password_reset_token'  => 'RkD_Jw0_8HEedzLk7MM-ZKEFfYR7VbMr_1392559490',
		'email'                 => 'reg@test.info',
		'jabber'                => 'reg@test.info',
		'access_token'          => 'reg_access_token',
		'refresh_token'         => 'reg_refresh_token',
		'refresh_token_expires' => date( 'Y-m-d G:i:s', strtotime( "now +1 day" ) ),
		'access_token_expires'  => date( 'Y-m-d G:i:s', strtotime( "now +1 day" ) ),
		'is_admin'              => false,
		'client_id'             => 1
	],
];