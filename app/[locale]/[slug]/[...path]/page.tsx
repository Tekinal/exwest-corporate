import {notFound} from 'next/navigation';
import {CorporateSite} from '@/components/CorporateSite';
import {pages,pageMetadata,resolveCorporate} from '@/lib/corporate';
import {isLocale,locales,localizedRoutes,type RouteKey} from '@/lib/i18n';
export function generateStaticParams(){return locales.flatMap(locale=>(Object.keys(pages) as RouteKey[]).filter(k=>localizedRoutes[k][locale].split('/').length>3).map(k=>{const [, ,slug,...path]=localizedRoutes[k][locale].split('/');return {locale,slug,path};}));}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string;path:string[]}>}){const {locale,slug,path}=await params;if(!isLocale(locale))return {};const key=resolveCorporate(locale,`/${locale}/${slug}/${path.join('/')}`);return key?pageMetadata(key,locale):{};}
export default async function Page({params}:{params:Promise<{locale:string;slug:string;path:string[]}>}){const {locale,slug,path}=await params;if(!isLocale(locale))notFound();const key=resolveCorporate(locale,`/${locale}/${slug}/${path.join('/')}`);if(!key)notFound();return <CorporateSite locale={locale} pageKey={key}/>;}
