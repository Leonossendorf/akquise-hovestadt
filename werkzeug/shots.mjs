import { chromium } from 'playwright';
import fs from 'fs';
const urls = fs.readFileSync('werkzeug/urls.txt','utf8').split('\n').map(s=>s.trim()).filter(Boolean);
fs.mkdirSync('shots',{recursive:true});
const b = await chromium.launch();
for (const u of urls) {
  const name = u.replace(/^https?:\/\//,'').replace(/[^a-z0-9]+/gi,'-').replace(/-$/,'');
  for (const [tag,w,h] of [['desk',1440,900],['mob',390,844]]) {
    const p = await b.newPage({viewport:{width:w,height:h}});
    try {
      await p.goto(u,{waitUntil:'networkidle',timeout:45000});
      await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}window.scrollTo(0,0);});
      await p.waitForTimeout(800);
      await p.screenshot({path:`shots/${name}-${tag}-top.png`});
      await p.screenshot({path:`shots/${name}-${tag}-full.png`,fullPage:true});
      if (tag==='desk') fs.writeFileSync(`shots/${name}.txt`, await p.evaluate(()=>document.body.innerText));
    } catch(e){ fs.writeFileSync(`shots/${name}-${tag}-FEHLER.txt`, String(e)); }
    await p.close();
  }
}
await b.close();
