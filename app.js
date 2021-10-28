const sharp = require('sharp')
const exifReader = require('exif-reader');
const geocoder = require('local-reverse-geocoder')

const image = sharp('./imgs/test.jpg')

image.metadata().then(function(metadata) {
  const exifData = exifReader(metadata.exif)
  
  const lat = exifData.gps.GPSLatitude.join(',')
  const lng = exifData.gps.GPSLongitude.join(',')
  // const time = exifData.exif.DateTimeOriginal
  const time = exifData.gps.GPSDateStamp.replace(/:/g, '-')

  let point = { latitude: lat, longitude: lng }

  geocoder.init({countries:[]}, function () {

    geocoder.lookUp(point, function (err, res) {
      const data = res[0][0] || {
        countryCode: "",
        admin1Code: {
          name:""
        },
        admin2Code: {
          name:""
        },
        admin3Code: {
          name:""
        },
        admin4Code: {
          name:""
        },
        alternateName: {
          "zh": {
              altName: ""
            }
        }
      }
      let node1 = data.countryCode
      let node2 = data.admin1Code.name
      let node3 = data.admin2Code.name
      let node4 = data.alternateName.zh.altName

      console.log('国家：' + node1)
      console.log('省份：' + node2)
      console.log('地级市：' + node3)
      console.log('具体位置：' + node4)
      console.log('时间：' + time)
    });

  });
})