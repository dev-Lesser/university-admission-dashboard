# university-admission-dashboard
### Heroku 배포
#### 1. heroku 앱 생성
```
heroku create <YOUR-PROJECT-NAME-HERE>
heroku config:set NODE_ENV=production --app <YOUR-PROJECT-NAME-HERE>

```
#### 2. heroku용 임시 서버 생성
```
// server.js
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const app = express()
//here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))
// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
})
const port = process.env.PORT || 8080
app.listen(port)
console.log(`app is listening on port: ${port}`)
```

#### 3.package script 파일 수정
```
"scripts": {
    "dev": "node build/dev-server.js",
    "build": "node build/build.js",
    "start": "node server.js",   <--- EDIT THIS LINE HERE 

```

#### 4. heroku git 연결 & 배포
```
heroku git:remote --app <YOUR-PROJECT-NAME-HERE>

git add . && git commit -a -m "Adding files."

git push heroku master

```

##### 링크
```
https://<YOUR-PROJECT-NAME-HERE>.herokuapp.com
```
## !주의사항 : git branch 가 master여야함



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
