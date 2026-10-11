import {ImageResponse} from 'next/og';
import {notFound} from 'next/navigation';
import {isLocale} from '@/lib/i18n';
import {pages} from '@/lib/corporate';
export const alt='Exwest / CIE';export const size={width:1200,height:630};export const contentType='image/png';
export default async function OpenGraphImage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return new ImageResponse(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',height:'100%',padding:70,background:'#19382c',color:'#f5f1e8',fontFamily:'Arial'}}><div style={{display:'flex',fontSize:22,letterSpacing:6}}>EXWEST / CIE</div><div style={{display:'flex',fontSize:78,lineHeight:1.05,maxWidth:990}}>{pages.home[locale].title}</div><div style={{display:'flex',fontSize:18,color:'#d2ddb9'}}>AI Commercial Operating System</div></div>,size);}
