
'use client';
import Image from 'next/image';
import {useEffect,useRef} from 'react';
import type {Locale} from '@/lib/i18n';
export type FilmKind='commercial'|'cargo'|'planting'|'contract';
const copy={en:{title:'Commercial work, connected.',transcript:'Read the workflow',steps:['Understand the requirement and keep its context.','Prepare the next commercial action within approved rules.','Review exceptions with the responsible person.']},de:{title:'Vertriebsarbeit im Zusammenhang.',transcript:'Den Ablauf lesen',steps:['Bedarf verstehen und den Kontext festhalten.','Den nächsten Schritt nach freigegebenen Regeln vorbereiten.','Ausnahmen mit den Verantwortlichen prüfen.']},tr:{title:'Birbirine bağlı ticari süreçler.',transcript:'Süreci okuyun',steps:['İhtiyacı anlayın ve bağlamı koruyun.','Sonraki ticari adımı onaylı kurallarla hazırlayın.','İstisnaları sorumlu kişiyle değerlendirin.']}};
export function CorporateExplainer({locale,kind='commercial'}:{locale:Locale;kind?:FilmKind}){
 const film=useRef<HTMLVideoElement>(null),c=copy[locale];
 useEffect(()=>{const q=matchMedia('(prefers-reduced-motion: reduce)');const stop=()=>{if(q.matches)film.current?.pause();};q.addEventListener('change',stop);stop();return()=>q.removeEventListener('change',stop);},[]);
 return <section className="corp-explainer filmed-context" aria-label={c.title}><div className="explainer-heading"><h2>{c.title}</h2></div><video ref={film} className="corp-film" controls playsInline preload="none" poster={`/media/${kind}.jpg`} width="1280" height="720" aria-label={c.title}><source src={`/media/${kind}.mp4`} type="video/mp4"/><track kind="captions" src={`/media/${kind}-${locale}.vtt`} srcLang={locale} label={{en:'English',de:'Deutsch',tr:'Türkçe'}[locale]} default/></video><Image unoptimized className="film-static" src={`/media/${kind}.jpg`} alt="" width="1280" height="720" loading="lazy"/><details className="film-transcript"><summary>{c.transcript}</summary><ol>{c.steps.map(s=><li key={s}>{s}</li>)}</ol></details><ol className="motion-static-copy">{c.steps.map(s=><li key={s}>{s}</li>)}</ol></section>;
}
