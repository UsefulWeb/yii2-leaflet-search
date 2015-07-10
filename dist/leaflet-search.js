/// <reference path="typings/vendor/leaflet/leaflet.d.ts"/>
/// <reference path="typings/vendor/jquery/jquery.d.ts"/>
/// <reference path="typings/leaflet-search.d.ts"/>
(function ($) {
    var pluginName = 'leafletSearch';
    var LeafletSearchGeocoder = L.Control.Geocoder.extend({
        initialize: function (options) {
            L.Control.Geocoder.prototype.initialize.call(this, options);
            var control = this, $longitude = $(this.options.longitude), $latitude = $(this.options.latitude);
            $(this.options.longitude + ', ' + this.options.latitude).on('keyup', function () {
                control._markResult([$latitude.val(), $longitude.val()]);
            });
            if (this.options.radius != null) {
                var $radius = $(this.options.radius);
                $radius.on('keyup', function () {
                    if (control._radiusLayer == null) {
                        return;
                    }
                    var value = +$(this).val();
                    control._radius.setRadius(value);
                });
            }
        },
        _markResult: function (center) {
            this._map.setView(center);
            if (this._geocodeMarker) {
                this._map.removeLayer(this._geocodeMarker);
            }
            this._geocodeMarker = new L.Marker(center)
                .addTo(this._map);
            this._drawRadius(center);
        },
        _geocodeResultSelected: function (result) {
            L.Control.Geocoder.prototype._geocodeResultSelected.call(this, result);
            var $longitude = $(this.options.longitude), $latitude = $(this.options.latitude);
            $latitude.val(result.center.lat);
            $longitude.val(result.center.lng);
            this._drawRadius(result.center);
        },
        _drawRadius: function (center) {
            if (this.options.radius == null) {
                return;
            }
            if (this._radiusLayer != null) {
                this._map.removeLayer(this._radiusLayer);
            }
            var $radius = $(this.options.radius), radius = +$radius.val();
            if (!radius) {
                radius = this.options.radiusSize;
                $radius.val(radius);
            }
            this._radiusLayer = new L.LayerGroup();
            this._radius = L.circle(center, radius).addTo(this._radiusLayer);
            this._radiusLayer.addTo(this._map);
        },
        _bindRadiusField: function () {
            var geocoder = this, $field = $(this.options.radiusField);
            $field.on('keyup', function () {
                var value = +$(this).val();
                geocoder._radius.setRadius(value);
            });
        }
    });
    var LeafletSearch = (function () {
        function LeafletSearch(element, options) {
            this._name = pluginName;
            this._defaults = {
                map: {
                    options: {},
                    defaultZoom: 10,
                },
                geocoder: {}
            };
            this.init = function () {
                var plugin = this, $longitude = $(this.settings.geocoder.longitude), $latitude = $(this.settings.geocoder.latitude), latitude = $latitude.val(), longitude = $longitude.val();
                this._map = L.map(this.element, this.settings.map.options);
                if (latitude && longitude) {
                    this._map.setView.call(this._map, [latitude, longitude], this.settings.map.defaultZoom);
                }
                else if (this.settings.map.defaultView) {
                    this._map.setView.apply(this._map, this.settings.map.defaultView);
                }
                this._geocoder = new LeafletSearchGeocoder(this.settings.geocoder);
                this._geocoder.addTo(this._map);
                this._map.on('click', function (e) {
                    plugin._geocoder._markResult([e.latlng.lat, e.latlng.lng]);
                    $latitude.val(e.latlng.lat);
                    $longitude.val(e.latlng.lng);
                });
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this._map);
            };
            this.element = element;
            this.settings = $.extend(true, {}, this._defaults, options);
            this.init();
        }
        return LeafletSearch;
    })();
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new LeafletSearch(this, options));
            }
        });
    };
    $('[data-leaflet-search]').each(function () {
        var options = $(this).data('leaflet-search');
        $(this)[pluginName](options);
    });
    $('body').on('click', '.leaflet-control-geocoder-icon', function () {
        return false;
    });
})(jQuery);
