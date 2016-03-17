<?php
namespace api\controllers;

use api\controllers\base\BaseController;
use common\models\User;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;

class UsersController extends BaseController {
	public $modelClass = 'common\models\User';

	public function actionCheck( $username = '', $email = '', $jabber = '' ) {
		if ( \Yii::$app->getRequest()->getMethod() == 'OPTIONS' ) {
			return;
		}

		$jabberCount   = 0;
		$usernameCount = 0;
		$emailCount    = 0;

		if ( $username ) {
			$usernameCount = User::find()->andWhere( [
				'username' => $username
			] )->count();
		}
		if ( $jabber ) {
			$jabberCount = User::find()->andWhere( [
				'jabber' => $jabber
			] )->count();
		}
		if ( $email ) {
			$emailCount = User::find()->andWhere( [
				'email' => $email
			] )->count();
		}
		if ( $usernameCount || $jabberCount || $usernameCount ) {
			return [
				'username' => $usernameCount > 0,
				'email'    => $emailCount > 0,
				'jabber'   => $jabberCount > 0
			];
		} else {
			throw new NotFoundHttpException;
		}
	}

	public function actions() {
		$actions = parent::actions();
		unset( $actions['update'] );
		unset( $actions['delete'] );

		return $actions;
	}

	public function behaviors() {
		$behaviors = parent::behaviors();
		if ( $this->action->id == 'check' || $this->action->id == 'create' ) {
			unset( $behaviors['_authenticator'] );
		}

		return $behaviors;
	}

	/**
	 * @inheritDoc
	 */
	public function checkAccess( $action, $model = null, $params = [ ] ) {
		if ( \Yii::$app->user->identity && \Yii::$app->user->identity->is_admin ) {
			return;
		}
		if ( in_array( $action, [ 'check', 'create' ] ) ) {
			return;
		}
		if ( $action == 'view' && $model->id == \Yii::$app->user->id ) {
			return;
		}

		throw new ForbiddenHttpException();
	}

}