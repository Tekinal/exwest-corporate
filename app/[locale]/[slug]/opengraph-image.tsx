import {ImageResponse} from 'next/og';
import {notFound} from 'next/navigation';
import {isLocale} from '@/lib/i18n';
import {pages,resolveCorporate} from '@/lib/corporate';
export const alt='Exwest / CIE';export const size={width:1200,height:630};export const contentType='image/png';
export default async function OpenGraphImage({params}:{params:Promise<{locale:string;slug:string}>}){const {locale,slug}=await params;if(!isLocale(locale))notFound();const key=resolveCorporate(locale,`/${locale}/${slug}`);if(!key)notFound();return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',padding:70,background:'#19382c',color:'#f5f1e8',fontFamily:'Arial'}}><div style={{display:'flex',fontSize:22,letterSpacing:6}}>EXWEST / CIE</div><div style={{display:'flex',fontSize:62,lineHeight:1.08,maxWidth:1040}}>{pages[key][locale].title}</div><div style={{display:'flex',fontSize:18,color:'#d2ddb9'}}>AI Commercial Operating System</div></div>,size);}
