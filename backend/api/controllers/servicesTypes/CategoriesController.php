<?php
namespace api\controllers\servicesTypes;

use api\controllers\base\BaseController;

class CategoriesController extends BaseController {
    public $modelClass = 'common\models\servicesTypes\Category';

    public function behaviors() {
        $behaviors = parent::behaviors();

        if ($this->action->id == 'view' || $this->action->id == 'index'){
            unset( $behaviors['authenticator'] );
        }

        return $behaviors;
    }

}