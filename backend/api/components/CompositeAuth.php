<?php

namespace api\components;

class CompositeAuth extends \yii\filters\auth\CompositeAuth {
	public function authenticate( $user, $request, $response ) {
		if ( $request->isOptions ) {
			return true;
		}

		return parent::authenticate( $user, $request, $response );
	}

}