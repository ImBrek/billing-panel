<?php
/**
 * User: brek
 * Date: 02.07.14
 * Time: 13:00
 */


namespace common\components;


use yii\helpers\ArrayHelper;

trait ArrayableTrait{
    public function toArray(array $fields = [], array $expand = [], $recursive = true , $source = null)
    {
        if (!$source){
            $source = $this;
        }
        $relExpand = [];
        $currentExpand = [];
        foreach ($expand as $field) {
            if (!is_array($field)){
                $field = preg_split('/\./', $field, -1);
            }
            $e = array_shift($field);
            $currentExpand[] = $e;
            if ($field){
	            $relExpand[ $e ][] = $field;
            }
        }
        $expand = $currentExpand;

        $data = [];
        foreach ($this->resolveFields($fields, $expand,$source) as $field => $definition) {
            $data[$field] = is_string($definition) ? $source->$definition : call_user_func($definition, $field, $this);
            if (isset($relExpand[$field])){
                if (is_array($data[$field])){
                    $r = [];
                    foreach ($data[$field] as $f) {
	                    $r[] = $this->toArray( [ ], $relExpand[ $field ], true, $f );
                    }
                    $data[$field] = $r;

                } else {
                    if ($data[$field]){
                        $data[$field] = $this->toArray([], $relExpand[$field], true, $data[$field]);
                    }
                }
            }
        }

        if ($this instanceof Linkable) {
            $data['_links'] = Link::serialize($this->getLinks());
        }

        return $recursive ? ArrayHelper::toArray($data) : $data;
    }

    protected function resolveFields(array $fields, array $expand, $source = null)
    {
        if (!$source){
            $source = $this;
        }
        $result = [];

        foreach ($source->fields() as $field => $definition) {
            if (is_integer($field)) {
                $field = $definition;
            }
            if (empty($fields) || in_array($field, $fields, true)) {
                $result[$field] = $definition;
            }
        }
	    $extraFields = $source->extraFields();

        foreach ($extraFields as $field => $definition) {
            if (is_integer($field)) {
                $field = $definition;
            }
            if (in_array($field, $fields, true)) {
                $result[$field] = $definition;
            }
        }

        if (empty($expand)) {
            return $result;
        }

        foreach ($extraFields as $field => $definition) {
            if (is_integer($field)) {
                $field = $definition;
            }
            if (in_array($field, $expand, true)) {
                $result[$field] = $definition;
            }
        }

        return $result;
    }

}