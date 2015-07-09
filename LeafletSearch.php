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
    $contents[] = Html::tag('div', '', [
      'id' => $this->id,
      'data-leaflet-search' => Json::encode($this->options),
      ]);
    $contents[] = $this->renderModel($form, $this->longitude);
    $contents[] =  $this->renderModel($form, $this->latitude);
    $contents[] =  $this->renderModel($form, $this->radius);

    return implode("\n", $contents);
  }

  public function renderModel($form, $params) {
    if (is_array($params)) {
      if (isset($params['name'])) {
        return Html::hiddenInput($params['name']);
      }
      else {
        return $form->field($params['model'], $params['attribute'])->hiddenInput();
      }
    }
    else if (!is_null($params)) {
      return Html::hiddenInput($params);
    }
  }
}
 ?>
