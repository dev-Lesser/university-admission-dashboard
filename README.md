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
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5000;
app.listen(port);
console.log('server started '+ port);
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

링크
```
https://<YOUR-PROJECT-NAME-HERE>.herokuapp.com
```

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
