<?php
namespace api\controllers;

use common\models\User;
use yii\rest\Controller;
use yii\web\BadRequestHttpException;
use yii\web\NotFoundHttpException;
use yii\web\UnauthorizedHttpException;

class TokensController extends Controller {

	public function getUser() {
		$params = \Yii::$app->getRequest()->getBodyParams();

		if ( ! empty( $params['refresh_token'] ) ) {
			return User::findIdentityByRefreshToken( $params['refresh_token'] );
		} else if ( ! ( empty( $params['username'] ) && empty( $params['password'] ) ) ) {
			$user = User::findByUsername( $params['username'] );
			if ( $user->validatePassword( $params['password'] ) ) {
				return $user;
			}
		}

		return false;
	}

	public function actionCreate() {
		$user = $this->getUser();

		if ( $user ) {
			\Yii::$app->user->login( $user );
			$user->generateAccessToken();
			$user->save( false );
			$user->refresh();
		} else {
			throw new UnauthorizedHttpException();
		}

		$response = \Yii::$app->getResponse();
		$response->setStatusCode( 201 );

		return [
			'access_token'          => $user->access_token,
			'refresh_token'         => $user->refresh_token,
			'refresh_token_expires' => $user->refresh_token_expires,
			'access_token_expires'  => $user->access_token_expires,
			'user_id'               => $user->id
		];
	}

	public function actionDelete() {
		\Yii::$app->user->logout();

		return true;
	}

}