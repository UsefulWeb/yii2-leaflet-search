<?php
/**
 *
 */
namespace usefulweb\LeafletSearch;

use \yii\helpers\Html;
use \yii\helpers\ArrayHelper;
use \yii\helpers\Json;

class LeafletSearch extends \yii\base\Widget
{
  public $longitude;
  public $latitude;
  public $radius;
  public $options = [];
  public $htmlOptions = [];

  public function run() {
    $content = $this->renderWidget();
    $view = $this->getView();
    return $content;
  }

  public function renderWidget() {
    $contents = [];
    if ($this->radius) {
      $this->options['geocoder']['radius'] = $this->radius;
    }
    $this->options['geocoder']['longitude'] = $this->longitude;
    $this->options['geocoder']['latitude'] = $this->latitude;

    $contents[] = Html::tag('div', '', ArrayHelper::merge($this->htmlOptions,[
      'id' => $this->id,
      'data-leaflet-search' => Json::encode($this->options),
      ]));

    return implode("\n", $contents);
  }

  public function getInputId($name) {
    return str_replace(['[]', '][', '[', ']', ' ', '.'], ['', '-', '-', '', '-', '-'], $name);
  }
}
 ?>
