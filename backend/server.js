const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Simulated videos (streaming URLs placeholders)
let videos = [
  { id:'v1', title:'Full body workout', coachId:'coach1', coachName:'Coach A', free:false, priceEuro:4.99, url:'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' },
  { id:'v2', title:'Yoga for beginners', coachId:'coach1', coachName:'Coach A', free:true, priceEuro:0, url:'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4' }
];

const PLATFORM_COMMISSION = { videoAndSubscriptionPercent:15, tipPercent:10 };
const TOKENS_PER_EURO = 100;

app.get('/videos', (req,res)=> res.json(videos));

app.post('/purchase', (req,res)=>{
  const { videoId } = req.body;
  const video = videos.find(v=>v.id===videoId);
  if(!video) return res.status(404).json({error:'Video not found'});
  const sale = video.priceEuro;
  const commission = (PLATFORM_COMMISSION.videoAndSubscriptionPercent/100)*sale;
  const coachReceives = sale-commission;
  console.log('Purchase', {sale, commission, coachReceives});
  res.json({message:`Achat réussi €${sale}. Commission plateforme €${commission.toFixed(2)}`});
});

app.post('/tip', (req,res)=>{
  const { coachId, euros } = req.body;
  if(!euros || euros<=0) return res.status(400).json({error:'Invalid tip'});
  const tokensGranted = Math.round(euros*TOKENS_PER_EURO);
  const commission = (PLATFORM_COMMISSION.tipPercent/100)*euros;
  const coachReceives = euros-commission;
  console.log('Tip', {euros, commission, coachReceives, tokensGranted});
  res.json({message:`Tip reçu €${euros}. Commission plateforme €${commission.toFixed(2)}`, tokensGranted});
});

app.post('/subscribe',(req,res)=>{
  const { coachId, months, monthlyPrice } = req.body;
  const total = months*monthlyPrice;
  const commission = (PLATFORM_COMMISSION.videoAndSubscriptionPercent/100)*total;
  const coachReceives = total-commission;
  console.log('Subscription', {coachId, months, total, commission, coachReceives});
  res.json({message:`Abonnement créé €${total} (commission €${commission.toFixed(2)})`});
});

app.get('/platform-info',(req,res)=>res.json({PLATFORM_COMMISSION,TOKENS_PER_EURO}));

const PORT = 4000;
app.listen(PORT,()=>console.log('Backend listening on',PORT));
