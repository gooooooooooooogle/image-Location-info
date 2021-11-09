const sharp = require('sharp')
const exifReader = require('exif-reader');
const geocoder = require('local-reverse-geocoder')

const result = {
  countryCode: "",
  admin1Code: {
    name: "无信息"
  },
  admin2Code: {
    name: "无信息"
  },
  admin3Code: {
    name: "无信息"
  },
  admin4Code: {
    name: "无信息"
  },
  alternateName: {
    "zh": {
      altName: "无信息"
    }
  }
}

const node = {
  node1: '无信息',
  node2: '无信息',
  node3: '无信息',
  node4: '无信息',
  time: '无信息'
}

export function geoInit(path, cb) {
  geocoder.init({ countries: [] }, () => {
    getImgInfo(path, cb)
  })
}
export function getImgInfo(path, cb) {

  const image = sharp(path)
  image.metadata().then(function (metadata) {
    if (!metadata.exif) {
      cb(node)
    } else {
      const exifData = exifReader(metadata.exif)

      const lat = exifData.gps.GPSLatitude.join(',')
      const lng = exifData.gps.GPSLongitude.join(',')
      // const time = exifData.exif.DateTimeOriginal
      const time = exifData.gps.GPSDateStamp.replace(/:/g, '-')

      let point = { latitude: lat, longitude: lng }
      geocoder.lookUp(point, function (err, res) {
        const data = res[0][0] || result
        let node1 = data.countryCode
        let node2 = data.admin1Code.name
        let node3 = data.admin2Code.name
        let node4
        if (data.alternateName) {
          node4 = data.alternateName.zh.altName
        } else {
          node4 = data.alternateNames
        }
        cb({
          node1,
          node2,
          node3,
          node4,
          time
        })
      });
    }
  })
}



