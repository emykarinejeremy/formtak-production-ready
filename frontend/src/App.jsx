import React, {useEffect, useState} from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const API = "http://localhost:4000";

export default function App(){
  const [videos, setVideos] = useState([]);
  const [tokens, setTokens] = useState(0);

  useEffect(()=>{ fetchVideos(); }, []);

  async function fetchVideos(){
    const res = await axios.get(API + "/videos");
    setVideos(res.data);
  }

  async function buyVideo(videoId){
    const res = await axios.post(API + "/purchase", { videoId });
    alert(res.data.message);
    fetchVideos();
  }

  async function tipCoach(coachId, euros){
    const res = await axios.post(API + "/tip", { coachId, euros });
    alert(res.data.message + " — tokens: "+ res.data.tokensGranted);
    setTokens(tokens + res.data.tokensGranted);
  }

  async function subscribeCoach(coachId, months, monthlyPrice){
    const res = await axios.post(API + "/subscribe", { coachId, months, monthlyPrice });
    alert(res.data.message);
  }

  return (
    <div style={{fontFamily:'Arial', margin:0, padding:0}}>
      <h1 style={{textAlign:'center'}}>FormTak</h1>
      <p style={{textAlign:'center'}}>Tokens: {tokens} (1€ = 100 tokens)</p>
      <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        {videos.map(v=>(
          <div key={v.id} style={{width:'100%', maxWidth:400, marginBottom:20, borderBottom:'1px solid #ccc', padding:10}}>
            <h3>{v.title} ({v.free?'Gratuit':'Payant €'+v.priceEuro})</h3>
            <p>Coach: {v.coachName}</p>
            <ReactPlayer url={v.url} width="100%" height="200px" playing controls/>
            <div style={{marginTop:10}}>
              {!v.free && <button onClick={()=>buyVideo(v.id)}>Acheter la vidéo</button>}
              <button style={{marginLeft:10}} onClick={()=>tipCoach(v.coachId,1)}>Tip €1</button>
              <button style={{marginLeft:10}} onClick={()=>subscribeCoach(v.coachId,1,5)}>Abonnement 1 mois €5</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
