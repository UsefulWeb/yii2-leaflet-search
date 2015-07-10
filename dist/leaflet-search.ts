/// <reference path="typings/vendor/leaflet/leaflet.d.ts"/>
/// <reference path="typings/vendor/jquery/jquery.d.ts"/>
/// <reference path="typings/leaflet-search.d.ts"/>

(function($) {
  /**
   * JQuery Plugin Ext name
   * @type {string}
   */
  var pluginName: string = 'leafletSearch';

  /**
   * Extended Leaflet Geocoder class
   * @return {[L.Control.Geocoder]}                                                                                                                                                                       [description]
   */
  var LeafletSearchGeocoder = L.Control.Geocoder.extend({
    initialize: function(options) {
      /** inheritance */
      L.Control.Geocoder.prototype.initialize.call(this, options);

      var control = this,
          $longitude = $(this.options.longitude),
          $latitude = $(this.options.latitude);

      /** bind change events */
      $(this.options.longitude+', '+this.options.latitude).on('keyup', function() {
          control._markResult([$latitude.val(), $longitude.val()]);
        });
      /** bind change events on radius field */
      if (this.options.radius != null) {
        var $radius = $(this.options.radius)
        $radius.on('keyup', function(){
          if (control._radiusLayer == null) {
            return;
          }
          var value = +$(this).val();
          control._radius.setRadius(value);
          })
      }
    },
    /**
     * Adds marker to map and draw radius range
     * @param  {[type]} center Array, containing latitude and longitude
     */
    _markResult: function(center) {
      this._map.setView(center);
      // remove previous marker
      if (this._geocodeMarker) {
				this._map.removeLayer(this._geocodeMarker);
			}

			this._geocodeMarker = new L.Marker(center)
				.addTo(this._map);

      this._drawRadius(center);
    },
    /**
     * Triggers when current geocode result is selected
     *@param  {[type]} result Result of our
     */
    _geocodeResultSelected: function(result) {
      L.Control.Geocoder.prototype._geocodeResultSelected.call(this, result);
      // we need to update latitude and longitude fields
      var $longitude = $(this.options.longitude),
          $latitude = $(this.options.latitude);

      $latitude.val(result.center.lat);
      $longitude.val(result.center.lng);
      this._drawRadius(result.center);
		},
    _drawRadius: function(center) {
      if (this.options.radius == null) {
        return;
      }

      if (this._radiusLayer != null) {
        this._map.removeLayer(this._radiusLayer);
      }

      var $radius = $(this.options.radius),
          radius = +$radius.val();

      if (!radius) {
        radius = this.options.radiusSize;
        $radius.val(radius);
      }
      this._radiusLayer = new L.LayerGroup();
      this._radius = L.circle(center, radius).addTo(this._radiusLayer);
      this._radiusLayer.addTo(this._map);
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
  /**
   * Plugin class
   */
  class LeafletSearch {
    _name: string = pluginName;
    _defaults: Object = {
      map : {
        options : {},
        defaultZoom : 10,
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
      // deep extend
			this.settings = $.extend( true, {}, this._defaults, options );
      this.init();
    }

    init: Function = function() {
      var plugin = this,
          $longitude = $(this.settings.geocoder.longitude),
          $latitude = $(this.settings.geocoder.latitude),
          latitude = $latitude.val(),
          longitude = $longitude.val();

      this._map = L.map(this.element, this.settings.map.options);
      if (latitude && longitude) {
        this._map.setView.call(this._map, [latitude, longitude], this.settings.map.defaultZoom);
      }
      else if (this.settings.map.defaultView) {
        this._map.setView.apply(this._map, this.settings.map.defaultView);
      }

      this._geocoder = new LeafletSearchGeocoder(this.settings.geocoder);
      this._geocoder.addTo(this._map);
      /** click to latlng coordinates */
      this._map.on('click', function(e) {
          plugin._geocoder._markResult([e.latlng.lat, e.latlng.lng]);

          $latitude.val(e.latlng.lat);
          $longitude.val(e.latlng.lng);
        });

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this._map);
    }
  }
  /** taken from jQuery Boilerplate */
  $.fn[ pluginName ] = function ( options ) {
			return this.each(function() {
					if ( !$.data( this, "plugin_" + pluginName ) ) {
							$.data( this, "plugin_" + pluginName, new LeafletSearch( this, options ) );
					}
			});
	};
  /** init plugin automatically */
  $('[data-leaflet-search]').each(function (){
    var options = $(this).data('leaflet-search');
    $(this)[pluginName](options);
  });
  /** disable page scroll when clicking on geocoder search field */
  $('body').on('click','.leaflet-control-geocoder-icon', function() {
    return false;
  })
})(jQuery)
