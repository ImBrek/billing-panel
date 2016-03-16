<?php
namespace api\controllers\servicesTypes;

use api\controllers\base\BaseController;
use yii\web\ForbiddenHttpException;

class OptionsController extends BaseController {
	public $modelClass = 'common\models\servicesTypes\Option';

	public function behaviors() {
		$behaviors = parent::behaviors();

		if ( $this->action->id == 'view' || $this->action->id == 'index' ) {
			unset( $behaviors['_authenticator'] );
		}

		return $behaviors;
	}

	/**
	 * @inheritDoc
	 */
	public function checkAccess( $action, $model = null, $params = [ ] ) {
		if ( $action == 'view' || $action == 'index' ) {
			return;
		}

		if ( ! \Yii::$app->user->identity->is_admin ) {
			throw new ForbiddenHttpException();
		}
	}

}