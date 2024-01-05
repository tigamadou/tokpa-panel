

import AWS from 'aws-sdk'
const S3_BUCKET = process.env.REACT_APP_WASABI_BUCKETNAME
const REGION = process.env.REACT_APP_WASABI_REGION


AWS.config.update({
  accessKeyId: process.env.REACT_APP_WASSABI_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_WASABI_SECRET_KEY
})

const myBucket = new AWS.S3({
  correctClockSkew: true,
  params: { Bucket: S3_BUCKET },
  region: REGION,
  endpoint: 'https://s3.eu-central-1.wasabisys.com',
  accessKeyId: process.env.REACT_APP_WASSABI_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_WASABI_SECRET_KEY
})
function generateUUID() {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + (Math.random() * 32)) % 32 | 0
    d = Math.floor(d / 32)
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(32)
  })
  return uuid
}

const useUploadFile = (file, callBack = null) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: `images/${generateUUID()}.${file.name.split('.')[file.name.split('.').length - 1]}`
  }
  console.log(file)

  myBucket.upload(params)
    .on('httpUploadProgress', (evt) => {
      // setProgress(Math.round((evt.loaded / evt.total) * 100))
      console.log(Math.round((evt.loaded / evt.total) * 100))
    })
    .send((err, data) => {
      if (err) {
        callBack(false)
      } else {
        if (callBack) {
          callBack(data)
        }
      }
    })

}

const useUploadFileInUserWorkspace = (userFolder, file, callBack = null) => {
  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: `${userFolder}/${generateUUID()}.${file.name.split('.')[file.name.split('.').length - 1]}`
  }
  console.log(file)

  myBucket.upload(params)
    .on('httpUploadProgress', (evt) => {
      // setProgress(Math.round((evt.loaded / evt.total) * 100))
      console.log(Math.round((evt.loaded / evt.total) * 100))
    })
    .send((err, data) => {
      if (err) {
        callBack(false)
      } else {
        if (callBack) {
          callBack(data)
        }
      }
    })

}


const useDeleteFile = (file, callBack = null) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: file
  }
  console.log(file)
  myBucket.deleteObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
      callBack(false)
    } else {
      callBack(data)
      console.log(data)
    }
  })
}
/**
 * {
 *   Response: {
 *     bucket: "your-bucket-name",
 *     key: "photos/image.jpg",
 *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
 *   }
 * }
 */

const listObjects = (folderPath, callback) => {
  if (!folderPath) {
    callback(false)
  }
  const params = {
    Bucket: S3_BUCKET,
    Prefix: folderPath
  }

  myBucket.listObjectsV2(params, (err, data) => {
    if (err) {
      callback(false)
    } else {
      callback(data.Contents)
    }
  })
}

const createFolder = (folderName, callback) => {
  if (!folderName.endsWith('/')) {
    folderName += '/'
  }

  const params = {
    Bucket: S3_BUCKET,
    Key: folderName
  }

  myBucket.putObject(params, (err, data) => {
    if (err) {
      callback(false)
    } else {
      console.log(data)
      callback(true)
    }
  })
}

const renameFileInUserWorkspace = (userFolder, oldName, newName, callback) => {
  const renameparams = {
    ACL: 'public-read',
    Bucket: S3_BUCKET,
    CopySource: `${S3_BUCKET}/${userFolder}/${oldName}`,
    Key: `${userFolder}/${newName}`
  }

  const deleteParams = {
    Bucket: S3_BUCKET,
    Key: `${userFolder}/${oldName}`
  }

  myBucket.copyObject(renameparams, function (err, data) {
    if (err) {
      callback(false)
    } else {
      if (data) { }
      myBucket.deleteObject(deleteParams, function (err, data) {
        if (err) {
          callback(false)
        } else {
          callback(data)
          if (data) { }
        }
      })
    }
  })
}

export { useUploadFile, useDeleteFile, listObjects, createFolder, useUploadFileInUserWorkspace, renameFileInUserWorkspace }