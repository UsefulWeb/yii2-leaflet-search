<?php
/**
 *
 */
namespace usefulweb\LeafletSearch;

use \yii\widgets\ActiveForm;
use \yii\helpers\Html;
use \yii\helpers\Json;

class LeafletSearch extends \yii\base\Widget
{
  public $longitude;
  public $latitude;
  public $radius;
  public $options = [];

  public function run() {
    $content = $this->renderWidget();
    $view = $this->getView();
    return $content;
  }

  public function renderWidget() {
    $contents = [];
    if ($this->radius) {
      $this->options['geocoder']['radius'] = $this->getFieldSelector($this->radius);
    }
    $this->options['geocoder']['longitude'] = $this->getFieldSelector($this->longitude);
    $this->options['geocoder']['latitude'] = $this->getFieldSelector($this->latitude);

    $contents[] = Html::tag('div', '', [
      'id' => $this->id,
      'data-leaflet-search' => Json::encode($this->options),
      ]);
    $contents[] = $this->renderField($form, $this->longitude);
    $contents[] =  $this->renderField($form, $this->latitude);
    $contents[] =  $this->renderField($form, $this->radius);

    return implode("\n", $contents);
  }

  public function getFieldSelector($params) {
    if (is_array($params)) {
      if (isset($params['name'])) {
        return '#'.$this->getInputId($params['name']);
      }
      else {
        return '#'.Html::getInputId($params['model'], $params['attribute']);
      }
    }
    else if (!is_null($params)) {
      return '#'.$this->getInputId($params);
    }
  }

  public function renderField($form, $params) {
    if (is_array($params)) {
      if (isset($params['name'])) {
        return Html::hiddenInput($params['name'], [
          'id' => $this->getInputId($params['name']),
          ]);
      }
      else {
        return $form->field($params['model'], $params['attribute'])->hiddenInput();
      }
    }
    else if (!is_null($params)) {
      if (in_array($params[0], array('#','.'))) {
        return;
      }
      return Html::hiddenInput($params, null, [
        'id' => $this->getInputId($params),
        ]);
    }
  }

  public function getInputId($name) {
    return str_replace(['[]', '][', '[', ']', ' ', '.'], ['', '-', '-', '', '-', '-'], $name);
  }
}
 ?>
