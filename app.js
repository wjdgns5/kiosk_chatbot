var express = require('express');
var app = express();
var request = require('request');
const path = require('path');
var fs = require('fs');
var ejs = require('ejs');
const { default: axios } = require('axios');
const { Script } = require('vm');
const bodyParser = require('body-parser');
var { OpenAIApi, Configuration } = require('openai');
var client_id_ = '4PzkiRoqnTTMCBZTmsir';
var client_secret_ = 'Jd7zCaJqSC';

app.get('/first_page', function (req, res){
    // res.sendFile(__dirname + '/html/chat.html');
     res.sendFile(__dirname + '/html/first_page.html');
     var request = require('request');
    // res.sendFile(__dirname + 'C:\Users\rhfov\Downloads');
  }); // 카메라 작동 시연

//   app.set('view engine', 'ejs'); 
// app.set('views', path.join(__dirname, 'views')); 
// app.use('/views', express.static('views'))

app.get('/face', function (req, res) {
  res.sendFile(path.join(__dirname, '/views/face.html'));
  var request = require('request');
  //var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식
  var api_url = 'https://openapi.naver.com/v1/vision/face'; // 얼굴 감지

// ------------------------------------------------------
  var _formData = {
    image:'image',
    image: fs.createReadStream(__dirname + '/public/photo.png') // FILE 이름
  };
   var _req = request.post({url:api_url, formData:_formData,
     headers: {'X-Naver-Client-Id':client_id_, 'X-Naver-Client-Secret': client_secret_}}).on('response', function(response) {

   });
  
//    res.render('face', _req);
});

  
app.use('/public', express.static('public'));


// app.use(express.static('public'));
// app.get('/public', (req, res)=> {
//     res.send("<img src='/photo.png'>");
// });


// -----------------------------------------
//----------------------------------------------
//-----------------------------------------------

let config = new Configuration({
    apiKey:'OpenAPI Key',
  });
  let openai = new OpenAIApi(config);

    app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html')
  });

  var client_id = ' naver_api@@';
    var client_secret = ' naver_api@@';

    app.get('/translate', function (req, res) {
        var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
        var query = req.query.q;
        
        var options = {
            url: api_url,
            form: {'source':'ko', 'target':'en', 'text':query},
            headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
         };
        request.post(options, function (error, response, body) {
            var 영어 = JSON.parse(body).message?.result.translatedText;
     
            openai.createCompletion({
               model: "avinci:ft-personal-2023-05-19-09-26-21",
               prompt: 영어,
               temperature: 0.7,
               max_tokens: 128,
               top_p: 1,
               frequency_penalty: 0,
               presence_penalty: 0,
             }).then((result) => {
               console.log('ai 응답', result.data.choices[0].text);
     
               var api_url = 'https://openapi.naver.com/v1/papago/n2mt';
               var query = result.data.choices[0].text;
               var options = {
                   url: api_url,
                   form: {'source':'en', 'target':'ko', 'text':query},
                   headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
               };
               request.post(options, function (error, response, body) {
                 console.log(body);
                 res.status(200).json(body);
                   
               });
     
     
             }).catch((error)=>{
               console.log('openai error', error)
             })
     
        });
      });
//--------------------------------------------
app.listen(3000, function () {
    console.log('http://127.0.0.1:3000/first_page app listening on port 3000!');
    console.log('http://localhost:3000/face');
    console.log('http://http://127.0.0.1:3000/index');
  });
