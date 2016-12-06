(function(){

  L.mapbox.accessToken = 'pk.eyJ1IjoianNtaXQ4IiwiYSI6ImNpdXR6cmlzeDAyaTUydXBzY2pyeTQ1ajIifQ.OsqnhovcG7e5arkfsr2hyA';

  var map = L.mapbox.map('map', 'mapbox.outdoors', {
      center: [37.8, -85.8],
      zoom: 6,
      minZoom: 2,
      maxZoom: 15,

  });


  var KyCounties = omnivore.csv('data/ukvdl_accessions.csv')
      .on('ready',function(e) {
          drawMap(e.target.toGeoJSON())
      })

      .on('error', function(e) {
          console.log(e.error[0].message)
      });


  var currentYear = 1995,
      data,
      kyCountydata = 'ACC_';

  function drawMap(mapData){

       data = L.geoJson(mapData, {
          pointToLayer: function(feature, layer){
              return L.circleMarker(layer, {
                  color: '#54278f',
                  opacity: 2,
                  weight: 1.0,
                  fillOpacity: 0,
              });

          }

      }).addTo(map);
      selectionChanger();
  updateSymbols();
  }
  function selectionChanger(){

     $('select[id="kyCounty"]').change(function(){
          kyCountydata = $(this).val();
          updateSymbols();
    });

  };

  function updateSymbols() {




    data.eachLayer(function(layer) {
        var props = layer.feature.properties;
       var animalData = Number(props[kyCountydata + currentYear])
       var radius = calcRadius(animalData);
        infoWindow(props, animalData);

      });
  }

  function calcRadius(val) {

      var radius = Math.sqrt(val/Math.PI);
      return radius * .6;

  }


  function infoWindow() {
      var info = $('#info');

      data.on('mouseover', function(e){


          info.show()

          var props = e.layer.feature.properties;
          var displayMetro = props.county;
          var displayData = Number(props[kyCountydata + currentYear]);
          $('#info span').text(displayMetro+' '+currentYear);
          $('.kyCountydata span').text((displayData*1000000).toLocaleString());

          e.layer.setStyle({ fillOpacity: .6 });


          updateInfo(xData, yData)


      });

      data.on('mouseout', function(e){

          e.layer.setStyle({ fillOpacity: 0});

      });

  }
      function updateInfo(){

      }

})();
