<?php

namespace api\components;

class UrlRule extends \yii\rest\UrlRule {
    public $nestedResources = [];
    public $pluralize = false;

    protected function createRules() {
        $rules = parent::createRules();
        $only = array_flip($this->only);
        $except = array_flip($this->except);
        $patterns = array_merge($this->patterns, $this->extraPatterns);

        foreach ($this->nestedResources as $resource) {
            foreach ($this->controller as $urlName => $controller) {
                $resourcePrefix = "/$resource/<$resource:\\d+>";
                $prefix = trim($this->prefix . $resourcePrefix . '/' . $urlName, '/');
                foreach ($patterns as $pattern => $action) {
                    if (!isset($except[$action]) && (empty($only) || isset($only[$action]))) {
                        $rules[$urlName][] = $this->createRule($pattern, $prefix, $controller . '/' . $action);
                    }
                }
            }
        }

        return $rules;
    }
}