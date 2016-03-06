<?php
namespace api\controllers;

use api\controllers\base\BaseController;

class UsersController extends BaseController {
    public $modelClass = 'common\models\User';

    public function checkAccess($action, $model = null, $params = []) {
        //Разрешаем пользователю просматривать информацию о себе
        if ($action == 'view' && !is_string($model) && $model->id == \Yii::$app->user->id){
            return;
        }
        parent::checkAccess($action,$model,$params);
    }

}