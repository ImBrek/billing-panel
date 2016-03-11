<?php
namespace api\controllers;

use api\controllers\base\BaseController;
use common\models\User;
use yii\web\NotFoundHttpException;

class UsersController extends BaseController {
    public $modelClass = 'common\models\User';

//    public function checkAccess($action, $model = null, $params = []) {
//        //Разрешаем пользователю просматривать информацию о себе
//        if ($action == 'view' && !is_string($model) && $model->id == \Yii::$app->user->id){
//            return;
//        }
//        parent::checkAccess($action,$model,$params);
//    }
//
    public function actionCheck($username){
        if (\Yii::$app->getRequest()->getMethod() == 'OPTIONS') return;
        $user = User::find()->andWhere([
            'username'=>$username
        ])->one();
        if ($user){
            return [];
        } else {
            throw new NotFoundHttpException;
        }
    }

    public function actions() {
        $actions = parent::actions();
        unset($actions['update']);
        unset($actions['delete']);
        return $actions;
    }

}