document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('map', { minZoom: 1, maxBounds: [[-85, -180], [85, 180]] }).setView([25, 10], 2);

  // read every post block on the page
  var posts = {};
  document.querySelectorAll('#posts .post').forEach(function (el) {
    posts[el.dataset.id] = el;
  });

  function showPost(id, latlng) {
    var el = posts[id];
    var content = document.createElement('div');
    var heading = document.createElement('h3');
    heading.textContent = el.dataset.name;
    content.appendChild(heading);
    Array.from(el.children).forEach(function (child) {
      content.appendChild(child.cloneNode(true));
    });

    L.popup({ maxWidth: 360, maxHeight: 260 })
      .setLatLng(latlng)
      .setContent(content)
      .openOn(map);
  }

  var baseStyle = { color: '#999', weight: 1, fillColor: '#e9e4d8', fillOpacity: 1 };
  var visitedStyle = { color: '#222', weight: 1, fillColor: '#c9a86a', fillOpacity: 1 };

  fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
    .then(function (r) { return r.json(); })
    .then(function (data) {
      L.geoJSON(data, {
        style: function (f) { return posts[f.id] ? visitedStyle : baseStyle; },
        onEachFeature: function (f, layer) {
          var el = posts[f.id];
          if (!el) return;

          layer.bindTooltip(el.dataset.name, { sticky: true });
          layer.on('click', function (event) { showPost(f.id, event.latlng); });

          // pin goes at the country's center, or at data-lat / data-lng if you set them
          var pos = (el.dataset.lat && el.dataset.lng)
            ? [parseFloat(el.dataset.lat), parseFloat(el.dataset.lng)]
            : layer.getBounds().getCenter();

          L.marker(pos, {
            title: el.dataset.name,
            icon: L.divIcon({ html: '📍', className: 'pin', iconSize: [24, 24], iconAnchor: [12, 24] })
          }).addTo(map).on('click', function () { showPost(f.id, pos); });
        }
      }).addTo(map);
    });
});
