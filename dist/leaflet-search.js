/// <reference path="typings/vendor/jquery/jquery.d.ts"/>
/// <reference path="typings/vendor/leaflet/leaflet.d.ts"/>
(function ($) {
    var pluginName = 'leafletSearch';
    var LeafletSearch = (function () {
        function LeafletSearch(element, options) {
            this._name = pluginName;
            this.init = function () {
            };
            this.element = element;
            this.settings = $.extend({}, this._defaults, options);
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
})(jQuery);
