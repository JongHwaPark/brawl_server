const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const urlencode = require('urlencode');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 8000;

const brawlToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImY5NjBhYzc4LTBkOWQtNDY3OS04ZDVjLTc3ODJkYjUxYzE1MSIsImlhdCI6MTYwMTk4MjUxNywic3ViIjoiZGV2ZWxvcGVyL2Q1YzBjMjllLThhNWEtYTI3Ny05ZDcwLTdkNDFmMzE4ZjNmZiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiMTgwLjIzMS4xOS4xMDgiXSwidHlwZSI6ImNsaWVudCJ9XX0.T32fjwwbC-exM5mz6BKfsjd0ymoT-8xIdnjviMpbhzrb6DBvM7i3562Z8P0Qivm4rgiGhna0_rs0ICVDnPmbgw';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/*
app.all('/!*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});
*/

app.use((err, req, res, next) => { // 에러 처리 부분

    console.error(err.stack); // 에러 메시지 표시
    res.status(err.response.status).send(err.response.statusText); // 500 상태 표시 후 에러 메시지 전송
});

app.get('/player/:tag', async (req, res, next) => {
    try{
        let response = await axios(`https://api.brawlstars.com/v1/players/${urlencode(req.params.tag)}`, {
            headers: {
                Accept: "application/json; charset=utf-8",
                Authorization: `Bearer ${brawlToken}`,
            }
        });
        console.log('player success');
        res.send(response.data);
    } catch(err){
        console.log('/********************** PLAYER ERROR *********************/');
        next(err);
        // console.log(err);
    }
});

app.get('/battle/:tag', async (req, res, next) => {
    try{
        let response = await axios(`https://api.brawlstars.com/v1/players/${urlencode(req.params.tag)}/battlelog`, {
            headers: {
                Accept: "application/json; charset=utf-8",
                Authorization: `Bearer ${brawlToken}`,
            }
        });
        console.log('battle : success');
        res.send(response.data);
    } catch(err){
        console.log('/********************** BATTLE ERROR *********************/');
        next(err);
        // console.log(err);
    }
});


app.listen(port, () => console.log(`Listening on port ${port}`));
