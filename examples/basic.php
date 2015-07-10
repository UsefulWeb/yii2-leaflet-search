<?php
use \usefulweb\LeafletSearch\LeafletSearch;
// your asset
use \frontend\themes\dm1\assets\LeafletSearchAsset;

use yii\bootstrap\ActiveForm;
use \yii\helpers\Html;

LeafletSearchAsset::register($this);
/* @var $this yii\web\View */
?>
<div class="site-index">

    <div class="body-content">
      <?php $form = ActiveForm::begin([]); ?>
        <div class="row">
            <?php echo Html::textInput('search-longitude', null, [
              // if we using fields that placed separately of widget, we need to give to it an id's
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
                'longitude' => '#search-longitude',
                'latitude' => '#search-latitude',
                'radius' => '#search-radius',
                'options' => [
                  'map' => [
                    'options' => [],
                    'defaultView' => [[55.7198,37.6989], 10],
                  ],
                  'geocoder' => [
                    'placeholder' => 'Поиск',
                    'radiusSize' => 100,
                    'collapsed' => false,
                    ]
                  ],

              ]) ?>
        </div>
      <?php ActiveForm::end(); ?>
        <div class="row">
            <div class="col-lg-4">
                <h2>Heading</h2>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.</p>

            </div>
            <div class="col-lg-4">
                <h2>Heading</h2>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.</p>

            </div>
            <div class="col-lg-4">
                <h2>Heading</h2>

                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur.</p>

            </div>
        </div>

    </div>
</div>
