<?php
/**
 *
 */
namespace usefulweb\LeafletSearch;

class LeafletSearchAsset extends \yii\web\AssetBundle
{
  public $css = [
      'dist/leaflet-search.min.css',
  ];
  public $js = [
      'dist/leaflet-search.min.js',
  ];
  public $depends = [
      // 'frontend\themes\dm1\assets\AngularAsset',
      // 'frontend\themes\dm1\assets\AngularResourceAsset',
  ];
}
 ?>
