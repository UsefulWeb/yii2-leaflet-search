# yii2-leaflet-search
Yii2 leaflet search plugin

## Basic usage
First, include this scripts:
```html
  <!-- leaflet library -->
  <script src="/assets/6268c434/leaflet.js"></script>
  <!-- https://github.com/perliedman/leaflet-control-geocoder-->
  <script src="/assets/961614a3/Control.Geocoder.js"></script>
  <!-- \usefulweb\yii2-leaflet-search\dist\leaflet-search.js -->
  <script src="/assets/c01748f9/leaflet-search.js"></script>
```

And then you can use this plugin
```php
<?php
  use \usefulweb\LeafletSearch\LeafletSearch;
  use yii\bootstrap\ActiveForm;
?>
<?php $form = ActiveForm::begin([]); ?>
  <div class="row">
      <?php echo Html::textInput('search-longitude', null, [
        'id' => 'search-longitude',
        ]) ?>
  </div>
  <div class="row">
    <?php echo Html::textInput('search-latitude', null, [
      'id' => 'search-latitude',
      ]) ?>
  </div>
  <div class="row">
    <?php echo Html::textInput('search-radius', null, [
      'id' => 'search-radius',
      ]) ?>
  </div>
  <div class="row">
      <?php echo LeafletSearch::widget([
          // id of longitude field
          'longitude' => 'search-longitude',
          // id of latitude field
          'latitude' => 'search-latitude',
          // id of radius field: optional
          'radius' => 'search-radius',
          // htmloptions for map container
          'htmlOptions' => [
            'style' => 'width:900px;height:300px;'
          ],
          'options' => [
            'map' => [
              // leaflet map options, see http://leafletjs.com/reference.html#map-options
              'options' => [],
              // leaflet default view options, see http://leafletjs.com/reference.html#map-setview
              'defaultView' => [[55.7198,37.6989], 10],
              // default map zoom (used for panning to coordinates from field values)
              'defaultZoom' => 10,
            ],
            // leaflet-geocoder-control options, see https://github.com/perliedman/leaflet-control-geocoder#options
            'geocoder' => [
              'placeholder' => 'Search...',
              'radiusSize' => 100,
              'collapsed' => false,
              ]
            ],

        ]) ?>
  </div>
<?php ActiveForm::end(); ?>
```

## Using AssetBundle
First, you need to extend \usefulweb\LeafletSearch\LeafletSearchAsset:
```php
<?php
namespace \your\namespace\assets;

class LeafletSearchAsset extends \usefulweb\LeafletSearch\LeafletSearchAsset
{
  public $depends = [
    'path\to\LeafletAsset',
    'path\to\LeafletControlGeocoderAsset',
  ];
}
 ?>
```
in your php file add this lines
```php
<?php
use \usefulweb\LeafletSearch\LeafletSearch;
use \your\namespace\assets\LeafletSearchAsset;

LeafletSearchAsset::register($this);
?>
```
