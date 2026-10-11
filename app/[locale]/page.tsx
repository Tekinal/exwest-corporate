import {notFound} from 'next/navigation';
import {CorporateSite} from '@/components/CorporateSite';
import {pageMetadata} from '@/lib/corporate';
import {isLocale,locales} from '@/lib/i18n';
export function generateStaticParams(){return locales.map(locale=>({locale}));}
export async function generateMetadata({params}:{params:Promise<{locale:string}>}){const {locale}=await params;return isLocale(locale)?pageMetadata('home',locale):{};}
export default async function Home({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <CorporateSite locale={locale}/>;}
