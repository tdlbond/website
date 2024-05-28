const Client = require('ssh2-sftp-client')
const path = require('path')
const fs = require('node:fs')

const config = {
  host: '123.60.150.35',
  port: 22,
  username: 'root',
  password: 'cloud@12345'
}

const localDir = path.resolve(__dirname, `./docs/.vitepress/dist`)
const remoteDir = '/www/server/nginx/html/dist'
const remoteDirRename = '/www/server/nginx/html/website'

async function deploy(config) {
  const sftp = new Client()
  try {
    await sftp.connect(config)
    console.log('ssh连接成功')
    const isExists = await sftp.exists(remoteDirRename)
    if (isExists) {
      await sftp.rmdir(remoteDirRename, true)
      console.log('已删除服务器上的文件')
    }
    await sftp.uploadDir(localDir, remoteDir)
    await sftp.rename(remoteDir, remoteDirRename)
    console.log('成功')
  } catch (error) {
    console.error(error.message)
  } finally {
    await sftp.end()
    console.log('ssh连接已关闭')
  }
}

deploy(config)
