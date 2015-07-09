<?php
/**
 *
 */
namespace usefulweb\LeafletSearch;

class LeafletSearchAsset extends \yii\web\AssetBundle
{
  public $sourcePath = '@vendor/useful-web/yii2-leaflet-search/dist';
  public $js = [
      'leaflet-search.js',
  ];

  public $depends = [
  ];
}
 ?>
