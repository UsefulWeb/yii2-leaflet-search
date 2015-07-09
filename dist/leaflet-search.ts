/// <reference path="typings/vendor/leaflet/leaflet.d.ts"/>
/// <reference path="typings/vendor/jquery/jquery.d.ts"/>
/// <reference path="typings/leaflet-search.d.ts"/>

(function($) {
  var pluginName: string = 'leafletSearch';
  var RadiusControl = L.Control.extend({
      options: {
        position: 'bottomright'
      }
    });

  var LeafletSearchGeocoder = L.Control.Geocoder.extend({
    initialize: function(options) {
      L.Control.Geocoder.prototype.initialize.call(this, options);

      var control = this,
          $longitude = $(this.options.longitude),
          $latitude = $(this.options.latitude);

      $(this.options.longitude+', '+this.options.latitude).on('keyup', function() {
          control._markResult([$latitude.val(), $longitude.val()]);
        });
    },
    _markResult: function(center) {
      this._map.setView(center);

      if (this._geocodeMarker) {
				this._map.removeLayer(this._geocodeMarker);
			}

			this._geocodeMarker = new L.Marker(center)
				.addTo(this._map);
    },
    _geocodeResultSelected: function(result) {
      L.Control.Geocoder.prototype._geocodeResultSelected.call(this, result);

      var $longitude = $(this.options.longitude),
          $latitude = $(this.options.latitude);

      $latitude.val(result.center.lat);
      $longitude.val(result.center.lng);

      if (this.options.radius == null) {
        return;
      }

      var map = this._map;

      if (this._radiusLayer != null) {
        map.removeLayer(this._radiusLayer);
      }
      else {
        this._bindRadiusField();
      }

      this._radiusLayer = new L.LayerGroup();
      this._radius = L.circle(result.center, 50).addTo(this._radiusLayer);
      this._radiusLayer.addTo(map);

		},
    _bindRadiusField: function() {
      var geocoder = this,
          $field = $(this.options.radiusField);

      $field.on('keyup', function(){
        var value = +$(this).val();
        geocoder._radius.setRadius(value);
        })
    }
  });

  class LeafletSearch {
    _name: string = pluginName;
    _defaults: Object = {
      map : {
        options : {}
      },
      geocoder: {

      }
    };
    _geocoder: L.Control;
    _map: L.Map;
    _radius: L.Control;

    element: JQuery;
    settings: Object;

    constructor(element: JQuery, options: any) {
      this.element = element;
			this.settings = $.extend( {}, this._defaults, options );
      this.init();
    }

    init: Function = function() {
      var plugin = this;

      $(this.element).css({
        height: '300px',
        width: '800px',
      });

      this._map = L.map(this.element, this.settings.map.options);
      if (this.settings.map.view) {
        this._map.setView.apply(this._map, this.settings.map.view);
      }

      this._geocoder = new LeafletSearchGeocoder(this.settings.geocoder);
      this._geocoder.addTo(this._map);
      this._map.on('click', function(e) {
          plugin._geocoder._markResult([e.latlng.lat, e.latlng.lng])

          var $longitude = $(plugin.settings.geocoder.longitude),
              $latitude = $(plugin.settings.geocoder.latitude);

          $latitude.val(e.latlng.lat);
          $longitude.val(e.latlng.lng);
        });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this._map);
    }
  }

  $.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
					if ( !$.data( this, "plugin_" + pluginName ) ) {
							$.data( this, "plugin_" + pluginName, new LeafletSearch( this, options ) );
					}
			});
	};

  $('[data-leaflet-search]').each(function (){
    var options = $(this).data('leaflet-search');
    $(this)[pluginName](options);
  })
  $('body').on('click','.leaflet-control-geocoder-icon', function() {
    return false;
  })
})(jQuery)
