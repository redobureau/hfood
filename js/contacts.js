(function(){
    var infoWindow = new google.maps.InfoWindow();

    var $container = $('.js-contacts-container'),
        $elem = $('.js-contacts-item'),
        icon = $container.data('icon'),
        hoverIcon = $container.data('hover-icon');

    var map = new google.maps.Map(
        document.getElementById("map_canvas"), {
            center: {lat: 55.73, lng: 37.59},
            zoom: 11,
            //disableDefaultUI: true,
            gestureHandling: 'cooperative'
        }
    );

    function init() {
        setMarker();
    }

    function setMarker(){
        $elem.each(function(){
            var _this = $(this),
                name = _this.find('.js-contacts-title').text(),
                address = _this.find('.js-contacts-address').html(),
                coordLat = +_this.data('coord-lat'),
                coordL = +_this.data('coord-lng');

            var point = {lat: coordLat, lng: coordL};
            var html = "<b>" + name + "</b> <br/>" + address;
            var marker = createMarker(point, html, _this, map);

            //map.setCenter(marker.getPosition());
        });
    }

    function createMarker(point, html, $elem, map) {
        var marker = new google.maps.Marker({
            map: map,
            position: point,
            zIndex: 0,
            draggable: false
        });

        marker.setIcon(icon);

        marker.addListener('mouseover', function() {
            marker.setIcon(hoverIcon);
            marker.setZIndex(100);
        })

        marker.addListener('mouseout', function() {
            marker.setIcon(icon);
            marker.setZIndex(0);
        });

        if (!!$elem) {
            $elem.hover(function() {
                marker.setIcon(hoverIcon);
                marker.setZIndex(100);
            }, function(){
                marker.setIcon(icon);
                marker.setZIndex(0);
            });

            $elem.on('click', function(){
                map.setZoom(15);
                map.setCenter(marker.getPosition());
            });
        }

        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(html);
            infoWindow.open(map, marker);
            map.setZoom(15);
            map.setCenter(marker.getPosition());
        });

        return marker;
    }

    google.maps.event.addDomListener(window, 'load', init);
    google.maps.event.addDomListener(window, 'resize', function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, 'resize');
        map.setCenter(center);
    });

})();