"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { localizedRoutes } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
const texts = {
 en: {title:"CIE AI adviser",open:"Ask the CIE AI adviser",intro:"Questions about CIE and your business. AI answers; please don’t share confidential information.",questions:["CIE for a machinery manufacturer?","Finding buyers for food exports?","Qualifying timber enquiries?","Starter: included and extra costs?"],send:"Send question",cancel:"Cancel",clear:"Clear conversation",close:"Close",input:"Your question",loading:"Preparing your answer…",error:"The adviser is currently unavailable. Please use our contact page to discuss your requirements.",limit:"Please clear this conversation to start a new question.",contact:"Discuss business fit",language:"Answer language",you:"You"},
 de: {title:"CIE KI-Berater",open:"Den CIE KI-Berater fragen",intro:"Fragen zu CIE und Ihrem Unternehmen. Antworten von KI; bitte keine vertraulichen Informationen eingeben.",questions:["CIE im Maschinenbau?","Käufer für Lebensmittelexporte finden?","Holzanfragen prüfen und nachfassen?","Starter: Umfang und Zusatzkosten?"],send:"Frage senden",cancel:"Abbrechen",clear:"Gespräch löschen",close:"Schließen",input:"Ihre Frage",loading:"Ihre Antwort wird vorbereitet…",error:"Der KI-Berater ist derzeit nicht verfügbar. Besprechen Sie Ihre Anforderungen bitte über unsere Kontaktseite.",limit:"Löschen Sie bitte das Gespräch, um eine neue Frage zu stellen.",contact:"Einsatz besprechen",language:"Antwortsprache",you:"Sie"},
 tr: {title:"CIE yapay zekâ danışmanı",open:"CIE danışmanına sorun",intro:"CIE ve işletmeniz hakkında sorularınız için. Yanıtlar yapay zekâdan gelir; gizli bilgi paylaşmayın.",questions:["Makine üreticileri için CIE?","Gıda ihracatında alıcı araştırması?","Kereste talepleri nasıl değerlendirilir?","Starter: kapsam ve ek ücretler?"],send:"Soruyu gönder",cancel:"İptal",clear:"Görüşmeyi temizle",close:"Kapat",input:"Sorunuz",loading:"Yanıtınız hazırlanıyor…",error:"Danışman şu anda kullanılamıyor. İhtiyaçlarınızı görüşmek için iletişim sayfamızı kullanın.",limit:"Yeni bir soru için görüşmeyi temizleyin.",contact:"İşletmenize uygunluğu görüşün",language:"Yanıt dili",you:"Siz"}
};
const controls = {
 en:{minimize:"Minimize",enlarge:"Enlarge",restore:"Restore size",resize:"Resize chat",smaller:"Smaller",larger:"Larger",privacy:"Privacy",hint:"Enter to send · Shift+Enter for a new line",cancelled:"Question cancelled. You can edit it and try again."},
 de:{minimize:"Minimieren",enlarge:"Vergrößern",restore:"Normale Größe",resize:"Chatgröße ändern",smaller:"Kleiner",larger:"Größer",privacy:"Datenschutz",hint:"Enter zum Senden · Shift+Enter für eine neue Zeile",cancelled:"Frage abgebrochen. Sie können sie bearbeiten und erneut senden."},
 tr:{minimize:"Küçült",enlarge:"Büyüt",restore:"Önceki boyut",resize:"Sohbet boyutunu değiştir",smaller:"Daha küçük",larger:"Daha büyük",privacy:"Gizlilik",hint:"Enter ile gönderin · Shift+Enter ile yeni satır",cancelled:"Soru iptal edildi. Düzenleyip yeniden gönderebilirsiniz."}
};
type Message = { role: "user" | "assistant"; content: string; links?: {href:string;label:string}[]; contact?: string };
const subscribeViewport=(notify:()=>void)=>{
 window.addEventListener("resize",notify);window.addEventListener("scroll",notify,{passive:true});window.visualViewport?.addEventListener("resize",notify);window.visualViewport?.addEventListener("scroll",notify);
 return()=>{window.removeEventListener("resize",notify);window.removeEventListener("scroll",notify);window.visualViewport?.removeEventListener("resize",notify);window.visualViewport?.removeEventListener("scroll",notify);};
};
const viewportSnapshot=()=>{
 const height=window.visualViewport?.height??window.innerHeight;
 const keyboard=Math.max(0,window.innerHeight-height-(window.visualViewport?.offsetTop??0));
 const button=document.querySelector(".cie-chat-launcher")?.getBoundingClientRect();
 const bottom=window.innerHeight-keyboard-16;const left=window.innerWidth-(button?.width??180)-16;
 const overlap=Array.from(document.querySelectorAll("a.corp-button,button[type=submit]")).some(el=>{const box=el.getBoundingClientRect();return box.width>0&&box.right>left&&box.left<window.innerWidth-16&&box.bottom>bottom-46&&box.top<bottom;});
 return `${document.documentElement.clientWidth}:${height}:${keyboard}:${overlap?72:0}`;
};
export default function WebsiteAdviser() {
 const path=usePathname(),router=useRouter();const pageLocale:Locale=path.startsWith("/en")?"en":path.startsWith("/tr")?"tr":"de";
 const [chosen,setChosen]=useState<Locale|null>(null);const locale=chosen??pageLocale,t=texts[locale],c=controls[locale];
 const [open,setOpen]=useState(false),[question,setQuestion]=useState(""),[messages,setMessages]=useState<Message[]>([]),[loading,setLoading]=useState(false),[error,setError]=useState("");
 const [size,setSize]=useState({width:390,height:540}),[enlarged,setEnlarged]=useState(false);
 const view=useSyncExternalStore(subscribeViewport,viewportSnapshot,()=>"1440:900:0:0");const [vw,vh,keyboard,lift]=view.split(":").map(Number);
 const mobile=vw<600;const width=mobile?Math.max(240,vw-24):Math.min(enlarged?680:size.width,vw-32);const height=Math.min(enlarged?760:size.height,Math.max(0,vh-184-lift));
 const controller=useRef<AbortController|null>(null),input=useRef<HTMLTextAreaElement|null>(null),launcher=useRef<HTMLButtonElement|null>(null),log=useRef<HTMLDivElement|null>(null);
 const drag=useRef<{x:number;y:number;width:number;height:number}|null>(null);const pending=useRef("");
 useEffect(()=>{
  // Keep the shared root widget alive through ordinary internal page navigation.
  const navigate=(event:MouseEvent)=>{
   if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.altKey||event.shiftKey)return;
   const anchor=(event.target as Element)?.closest?.("a");if(!anchor||anchor.target||anchor.hasAttribute("download"))return;
   const url=new URL(anchor.href,location.href);if(url.origin!==location.origin||!Object.values(localizedRoutes).some(routes=>(Object.values(routes) as string[]).includes(url.pathname)))return;
   if(url.pathname===location.pathname&&url.search===location.search)return;
   event.preventDefault();router.push(url.pathname+url.search+url.hash);
  };
  document.addEventListener("click",navigate);return()=>document.removeEventListener("click",navigate);
 },[router]);
 useEffect(()=>{document.documentElement.lang=pageLocale;const skip=document.querySelector(".skip-link");if(skip)skip.textContent=pageLocale==="de"?"Zum Inhalt":pageLocale==="tr"?"İçeriğe geç":"Skip to content";},[pageLocale]);
 useEffect(()=>{if(open)input.current?.focus();},[open]);
 useEffect(()=>{if(input.current){input.current.style.height="auto";input.current.style.height=Math.min(input.current.scrollHeight,96)+"px";}},[question]);
 useEffect(()=>{if(log.current)log.current.scrollTop=log.current.scrollHeight;},[messages,loading]);
 useEffect(()=>()=>controller.current?.abort(),[]);
 function minimize(){setOpen(false);launcher.current?.focus();}
 function cancel(){controller.current?.abort();controller.current=null;setLoading(false);setQuestion(pending.current);setError("cancelled");}
 function adjust(delta:number){setEnlarged(false);setSize({width:Math.max(320,Math.min(vw-32,width+delta)),height:Math.max(320,Math.min(vh-100,height+delta))});}
 async function send(){
  if(loading||!question.trim())return;setError("");
  const history=[...messages,{role:"user" as const,content:question.trim()}];
  if(history.length>16||history.reduce((n,m)=>n+m.content.length,0)>16000){setError("limit");return;}
  const abort=new AbortController();controller.current=abort;pending.current=question.trim();setLoading(true);setQuestion("");
  try{
   const response=await fetch("/api/website-adviser",{method:"POST",headers:{"Content-Type":"application/json"},signal:abort.signal,body:JSON.stringify({locale,messages:history.map(({role,content})=>({role,content}))})});
   if(!response.ok)throw Error("unavailable");const result=await response.json();if(controller.current!==abort)return;
   setMessages([...history,{role:"assistant",content:result.answer+(result.clarification?"\n\n"+result.clarification:""),links:result.links,contact:result.contact}]);
  }catch{if(!abort.signal.aborted){setError("unavailable");setQuestion(pending.current);}}
  finally{if(controller.current===abort){controller.current=null;setLoading(false);input.current?.focus();}}
 }
 return <aside className="cie-chat" id="cie-website-adviser" aria-label={t.title} style={{"--chat-keyboard":`${keyboard+lift}px`} as React.CSSProperties}>
  <button className="cie-chat-launcher" ref={launcher} aria-expanded={open} aria-controls="cie-adviser-panel" onClick={()=>open?minimize():setOpen(true)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 4h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 3v-3a2 2 0 0 1-2-2V6a2 2 0 0 1 3-2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M7 9h10M7 13h6" stroke="currentColor" strokeWidth="1.5"/></svg><span>{t.title}</span></button>
  {open&&<section id="cie-adviser-panel" className={`cie-chat-panel${vh<420?" compact":""}`} role="dialog" aria-modal="false" aria-labelledby="cie-adviser-title" style={{width,height}} onKeyDown={e=>{if(e.key==="Escape"){e.stopPropagation();minimize();}}}>
   <header className="cie-chat-header"><h2 id="cie-adviser-title">{t.title}</h2><div><button aria-label={c.minimize} title={c.minimize} onClick={minimize}>−</button><button aria-label={enlarged?c.restore:c.enlarge} title={enlarged?c.restore:c.enlarge} onClick={()=>setEnlarged(!enlarged)}>↗</button><button aria-label={t.close} title={t.close} onClick={minimize}>×</button></div></header>
   <div className="cie-chat-tools"><label><span className="sr-only">{t.language}</span><select aria-label={t.language} value={locale} onChange={e=>setChosen(e.target.value as Locale)}><option value="en">English</option><option value="de">Deutsch</option><option value="tr">Türkçe</option></select></label><button onClick={()=>{controller.current?.abort();controller.current=null;setLoading(false);setMessages([]);setQuestion("");setError("");pending.current="";input.current?.focus();}}>{t.clear}</button><Link href={localizedRoutes.privacy[locale]}>{c.privacy}</Link></div>
   <div className="cie-chat-scroll" ref={log}><p className="cie-chat-intro">{t.intro}</p>{messages.length===0&&<div className="cie-chat-starters">{t.questions.map(q=><button key={q} disabled={loading} onClick={()=>{setQuestion(q);input.current?.focus();}}>{q}</button>)}</div>}<div role="log" aria-live="polite" aria-relevant="additions text">{messages.map((m,i)=><article className={`cie-chat-message ${m.role}`} key={i}><span className="sr-only">{m.role==="user"?t.you:t.title}</span><p>{m.content}</p>{m.links?.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}{m.contact&&<Link href={m.contact}>{t.contact}</Link>}</article>)}</div><p role="status" className="cie-chat-status">{loading?t.loading:error==="limit"?t.limit:error==="cancelled"?c.cancelled:error?t.error:""}</p>{error==="unavailable"&&<Link href={`/${locale}#contact`}>{t.contact}</Link>}</div>
   <div className="cie-chat-composer"><label className="sr-only" htmlFor="cie-adviser-question">{t.input}</label><textarea ref={input} id="cie-adviser-question" rows={1} maxLength={4000} placeholder={t.input} value={question} onChange={e=>setQuestion(e.target.value)} disabled={loading} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey&&!e.nativeEvent.isComposing){e.preventDefault();send();}}}/>{loading?<button onClick={cancel}>{t.cancel}</button>:<button aria-label={t.send} disabled={!question.trim()} onClick={send}>↑</button>}</div>
   <footer className="cie-chat-footer"><small>{c.hint}</small><div className="cie-chat-size"><button aria-label={c.smaller} onClick={()=>adjust(-40)}>−</button><button aria-label={c.larger} onClick={()=>adjust(40)}>+</button><button className="cie-chat-drag" aria-label={c.resize} title={c.resize} onKeyDown={e=>{if(["ArrowUp","ArrowRight","ArrowDown","ArrowLeft"].includes(e.key)){e.preventDefault();adjust(["ArrowUp","ArrowRight"].includes(e.key)?20:-20);}}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,width,height};setEnlarged(false);}} onPointerMove={e=>{if(drag.current)setSize({width:Math.max(320,Math.min(vw-32,drag.current.width+drag.current.x-e.clientX)),height:Math.max(320,Math.min(vh-100,drag.current.height+drag.current.y-e.clientY))});}} onPointerUp={()=>{drag.current=null;}} onPointerCancel={()=>{drag.current=null;}}>⤢</button></div></footer>
  </section>}
 </aside>;
}
