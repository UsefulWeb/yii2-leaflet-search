/// <reference path="typings/vendor/leaflet/leaflet.d.ts"/>
/// <reference path="typings/vendor/jquery/jquery.d.ts"/>
/// <reference path="typings/leaflet-search.d.ts"/>

(function($) {
  var pluginName: string = 'leafletSearch';
  var RadiusControl = L.Control.extend({
      options: {
        position: 'bottomright'
      },
      setGeocoder: function(geocoder) {

        this._geocoder = geocoder;
      },
      onAdd: function(map: L.Map) {
        var _control = this,
            $control: JQuery = $('<input type="number">');
        $control.attr({
          placeholder : 'Radius'
          });
        $control.on('keyup', function(){
          var value = +$(this).val();
          _control._geocoder._radius.setRadius(value);
          })

        return $control.get(0);
      }
    });

  var LeafletSearchGeocoder = L.Control.Geocoder.extend({
    _geocodeResultSelected: function(result) {
      L.Control.Geocoder.prototype._geocodeResultSelected.call(this, result);

      var map = this._map;
      if (this._radiusLayer != null) {
        map.removeLayer(this._radiusLayer);
      }
      else {
        this._createRadiusBox();
      }

      this._radiusLayer = new L.LayerGroup();
      this._radius = L.circle(result.center, 50).addTo(this._radiusLayer);
      this._radiusLayer.addTo(map);

		},
    _createRadiusBox: function() {
      var radiusControl = new RadiusControl();

      radiusControl.addTo(this._map);
      radiusControl.setGeocoder(this);
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
