import type {MetadataRoute} from 'next';
import {localizedRoutes,type RouteKey} from '@/lib/i18n';
const origin='https://www.exwest.de';
export default function sitemap():MetadataRoute.Sitemap{return (Object.keys(localizedRoutes) as RouteKey[]).flatMap(key=>{const paths=localizedRoutes[key];const languages={de:`${origin}${paths.de}`,en:`${origin}${paths.en}`,tr:`${origin}${paths.tr}`,'x-default':`${origin}${paths.de}`};return (['de','en','tr'] as const).map(locale=>({url:`${origin}${paths[locale]}`,lastModified:new Date(key==='imprint'||key==='privacy'?'2026-09-04T00:00:00Z':'2026-10-11T00:00:00Z'),changeFrequency:key==='home'?'weekly' as const:'monthly' as const,priority:key==='home'?1:key==='imprint'||key==='privacy'?0.2:0.8,alternates:{languages}}));});}
