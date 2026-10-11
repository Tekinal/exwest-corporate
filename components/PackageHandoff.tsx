"use client";
import {useSyncExternalStore} from 'react';
import prices from '@/lib/cie-packages.json';
import type {Locale} from '@/lib/i18n';
const names=prices.packages.map(p=>p.name);
function read(){const name=new URLSearchParams(window.location.search).get('package')??'';return names.includes(name)?name:'';}
function subscribe(notify:()=>void){window.addEventListener('popstate',notify);window.addEventListener('hashchange',notify);return()=>{window.removeEventListener('popstate',notify);window.removeEventListener('hashchange',notify);};}
export function PackageHandoff({locale}:{locale:Locale}){const name=useSyncExternalStore(subscribe,read,()=> '');if(!name)return null;const c={en:{title:'Package of interest',text:'Please mention this package and your workflow in the enquiry below, or use this email link.',email:'Email about this package'},de:{title:'Ihr gewünschtes Paket',text:'Nennen Sie dieses Paket und Ihren Ablauf in der Anfrage unten oder nutzen Sie diesen E-Mail-Link.',email:'Dieses Paket per E-Mail anfragen'},tr:{title:'İlgilendiğiniz paket',text:'Aşağıdaki talepte bu paketi ve sürecinizi belirtin veya bu e-posta bağlantısını kullanın.',email:'Bu paket için e-posta gönderin'}}[locale];return <aside className="package-handoff" aria-label={c.title}><p>{c.title}</p><strong>{name}</strong><p>{c.text}</p><a href={`mailto:contact@exwest.de?subject=${encodeURIComponent('CIE · '+name)}`}>{c.email} ↗</a></aside>;}
