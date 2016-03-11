<?php
namespace common\models;

use common\components\ActiveRecordExt;
use Yii;
use yii\base\NotSupportedException;
use yii\behaviors\TimestampBehavior;
use yii\db\ActiveRecord;
use yii\db\Expression;
use yii\web\IdentityInterface;

/**
 * User model
 *
 * @property integer $id
 * @property string  $username
 * @property string  $password_hash
 * @property string  $password_reset_token
 * @property string  $email
 * @property string  $auth_key
 * @property integer $status
 * @property integer $created_at
 * @property integer $updated_at
 * @property string  $password write-only password
 * @property string  $access_token
 * @property string  $access_token_expires
 * @property string  $refresh_token
 * @property string  $refresh_token_expires
 */
class User extends ActiveRecordExt implements IdentityInterface {
	const STATUS_DELETED = 0;
	const STATUS_ACTIVE = 10;

	/**
	 * @inheritdoc
	 */
	public static function tableName() {
		return '{{%user}}';
	}

	/**
	 * @inheritdoc
	 */
	public function behaviors() {
		return [
			TimestampBehavior::className(),
		];
	}

	/**
	 * @inheritdoc
	 */
	public function rules() {
		return [
			[ 'status', 'default', 'value' => self::STATUS_ACTIVE ],
			[ 'status', 'in', 'range' => [ self::STATUS_ACTIVE, self::STATUS_DELETED ] ],
			[ [ 'email', 'jabber' ], 'email' ],
			[ [ 'jabber', 'name', 'username' ], 'required' ],
			[ [ 'email', 'jabber', 'name', 'username' ], 'string', 'max' => 255 ],
		];
	}

	/**
	 * @inheritDoc
	 */
	public function scenarios() {
		$scenarios = parent::scenarios();

		$scenarios[ self::SCENARIO_UPDATE ][] = '! username';
		$scenarios[ self::SCENARIO_UPDATE ][] = 'password';

		$scenarios[ self::SCENARIO_CREATE ][] = '!status';
		$scenarios[ self::SCENARIO_CREATE ][] = 'password';

		return $scenarios;
	}

	/**
	 * @inheritdoc
	 */
	public static function findIdentity( $id ) {
		return static::findOne( [ 'id' => $id, 'status' => self::STATUS_ACTIVE ] );
	}

	/**
	 * @inheritdoc
	 */
	public static function findIdentityByAccessToken( $token, $type = null ) {
		return static::find()
		             ->andWhere( [
			             'access_token' => $token,
			             'status'       => self::STATUS_ACTIVE
		             ] )
		             ->andWhere( '[[access_token_expires]] > now()' )
		             ->one();
	}

	/**
	 * Find active user by refresh token
	 *
	 * @param $token
	 *
	 * @return $this
	 */
	public static function findIdentityByRefreshToken( $token ) {
		return static::find()
		             ->andWhere( [
			             'refresh_token' => $token,
			             'status'        => self::STATUS_ACTIVE
		             ] )
		             ->andWhere( '[[refresh_token_expires]]  > now()' )
		             ->one();
	}

	/**
	 * Finds user by username
	 *
	 * @param string $username
	 *
	 * @return static|null
	 */
	public static function findByUsername( $username ) {
		return static::findOne( [ 'username' => $username, 'status' => self::STATUS_ACTIVE ] );
	}

	/**
	 * Finds user by password reset token
	 *
	 * @param string $token password reset token
	 *
	 * @return static|null
	 */
	public static function findByPasswordResetToken( $token ) {
		if ( ! static::isPasswordResetTokenValid( $token ) ) {
			return null;
		}

		return static::findOne( [
			'password_reset_token' => $token,
			'status'               => self::STATUS_ACTIVE,
		] );
	}

	/**
	 * Finds out if password reset token is valid
	 *
	 * @param string $token password reset token
	 *
	 * @return boolean
	 */
	public static function isPasswordResetTokenValid( $token ) {
		if ( empty( $token ) ) {
			return false;
		}

		$timestamp = (int) substr( $token, strrpos( $token, '_' ) + 1 );
		$expire    = Yii::$app->params['user . passwordResetTokenExpire'];

		return $timestamp + $expire >= time();
	}

	/**
	 * @inheritdoc
	 */
	public function getId() {
		return $this->getPrimaryKey();
	}

	/**
	 * @inheritdoc
	 */
	public function getAuthKey() {
		return $this->auth_key;
	}

	/**
	 * @inheritdoc
	 */
	public function validateAuthKey( $authKey ) {
		return $this->getAuthKey() === $authKey;
	}

	/**
	 * Validates password
	 *
	 * @param string $password password to validate
	 *
	 * @return boolean if password provided is valid for current user
	 */
	public function validatePassword( $password ) {
		return Yii::$app->security->validatePassword( $password, $this->password_hash );
	}

	/**
	 * Generates password hash from password and sets it to the model
	 *
	 * @param string $password
	 */
	public function setPassword( $password ) {
		$this->password_hash = Yii::$app->security->generatePasswordHash( $password );
	}

	/**
	 * Generates "remember me" authentication key
	 */
	public function generateAuthKey() {
		$this->auth_key = Yii::$app->security->generateRandomString();
	}

	/**
	 * Generates new password reset token
	 */
	public function generatePasswordResetToken() {
		$this->password_reset_token = Yii::$app->security->generateRandomString() . '_' . time();
	}

	/**
	 * Removes password reset token
	 */
	public function removePasswordResetToken() {
		$this->password_reset_token = null;
	}

	/**
	 * Create access and refresh tokens
	 *
	 * @param bool $force
	 */
	public function generateAccessToken( $force = false ) {
		if ( $this->access_token_expires < time() || $force ) {
			$this->access_token          = Yii::$app->security->generateRandomString();
			$this->refresh_token         = Yii::$app->security->generateRandomString();
			$this->access_token_expires  = new Expression( 'now() + interval \'1 day\' ' );
			$this->refresh_token_expires = new Expression( 'now() + interval \'2 day\' ' );
		}
	}

	/**
	 * @inheritDoc
	 */
	public function beforeSave( $insert ) {
		$result = parent::beforeSave( $insert );
		if ( $result ) {
			if ( $insert ) {
				$this->generateAuthKey();
			}

			return true;
		} else {
			return false;
		}
	}

	/**
	 * @inheritDoc
	 */
	public function fields() {
		$fields = parent::fields();
		unset( $fields['access_token'] );
		unset( $fields['access_token_expires'] );
		unset( $fields['refresh_token'] );
		unset( $fields['refresh_token_expires'] );
		unset( $fields['password_reset_token'] );
		unset( $fields['auth_key'] );
		unset( $fields['password_hash'] );

		return $fields;
	}

}
