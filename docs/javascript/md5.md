---
title: MD5
date: '2022-12-06'
sidebar: 'auto'
categories:
 - 前端基础
tags:
 - md5
publish: true
---

## 对上传的文件进行MD5加密
```js
	import SparkMD5 from 'spark-md5'
    md5Count (file) {
      return new Promise((resolve, reject) => {
        let fileReader = new FileReader(),
        blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,
        chunkSize = 2097152,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5()

        fileReader.onload = function (e) {
          try {
            spark.appendBinary(e.target.result)
            currentChunk++
            if (currentChunk < chunks) {
              loadNext()
            } else {
              resolve(spark.end())
            }
          } catch (error) {
            reject(error)
          }
        }

        function loadNext () {
          let start = currentChunk * chunkSize,
          end = start + chunkSize >= file.size ? file.size : start + chunkSize
          fileReader.readAsBinaryString(blobSlice.call(file, start, end))
        }

        loadNext()
      })
    }
```