<?php
use \yii\widgets\ActiveForm;
use \yii\helpers\Html;

/**
 *
 */
namespace usefulweb\LeafletSearch;

class LeafletSearch extends \yii\base\Widget
{
  public $id = 'leaflet-search';
  public $longitude;
  public $latitude;
  public $radius;

  public function run() {
      $content = $this->renderWidget();
  }

  public function renderWidget() {

    ob_start();
    $form = ActiveForm::begin(['id' => $this->id.'-form']);

    echo $this->renderModel($form, $this->longitude);
    echo $this->renderModel($form, $this->latitude);
    echo $this->renderModel($form, $this->radius);

    ActiveForm::end();

    return ob_end_clean();
  }

  public function renderModel($form, $params) {
    if (is_array($params)) {

    }
    else if (!is_null($params)) {
      Html::
    }
  }
}
 ?>
