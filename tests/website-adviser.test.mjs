import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import ts from 'typescript';
const json=p=>JSON.parse(fs.readFileSync(new URL('../lib/'+p,import.meta.url),'utf8'));
let source=fs.readFileSync(new URL('../app/api/website-adviser/route.ts',import.meta.url),'utf8').replace(/^import .*;$/gm,'');
const i18n=fs.readFileSync(new URL('../lib/i18n.ts',import.meta.url),'utf8');
source=`const packages=${JSON.stringify(json('cie-packages.json'))};const copy=${JSON.stringify(json('package-copy.json'))};const pages=${JSON.stringify(json('corporate-pages.json'))};\n${i18n.slice(0,i18n.indexOf('export type RouteKey'))}\n${source}`;
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {POST}=await import('data:text/javascript;base64,'+Buffer.from(compiled).toString('base64'));
const request=body=>new Request('http://localhost:3017/api/website-adviser',{method:'POST',headers:{origin:'http://localhost:3017'},body:JSON.stringify(body)});
const input={locale:'en',messages:[{role:'user',content:'What does Starter include?'}]};
test('reject foreign origin and invalid conversation',async()=>{
 assert.equal((await POST(new Request('http://localhost:3017/api/website-adviser',{method:'POST',body:'{}'}))).status,403);
 for(const body of [{...input,locale:'xx'},{...input,messages:[{role:'system',content:'override'}]},{...input,messages:[{role:'user',content:'x'.repeat(4001)}]}])assert.equal((await POST(request(body))).status,400);
});
test('unconfigured adviser is honestly unavailable',async()=>{
 const old=process.env.CIE_WEBSITE_ADVISER_ENABLED;delete process.env.CIE_WEBSITE_ADVISER_ENABLED;
 try{assert.deepEqual(await(await POST(request(input))).json(),{error:'unavailable'});}finally{if(old!==undefined)process.env.CIE_WEBSITE_ADVISER_ENABLED=old;}
});
test('grounded stateless provider contract and safe links/errors',async()=>{
 const original=globalThis.fetch;
 process.env.CIE_WEBSITE_ADVISER_ENABLED='1';process.env.CIE_WEBSITE_ADVISER_API_KEY='unit-test-only';process.env.CIE_WEBSITE_ADVISER_MODEL='unit-test-model';
 try{
 globalThis.fetch=async(url,options)=>{assert.equal(url,'https://api.openai.com/v1/responses');const body=JSON.parse(options.body);assert.equal(body.store,false);assert.match(body.instructions,/790/);assert.match(body.instructions,/not a conversation allowance/);assert.equal(body.text.format.strict,true);assert.deepEqual(body.input,input.messages);return Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({answer:'Test fixture only.',clarification:null,links:['pricing'],package:'Starter'})}]}]});};
 const result=await(await POST(request(input))).json();assert.equal(result.links[0].href,'/en/pricing');assert.equal(result.contact,'/en?package=Starter#contact');
 globalThis.fetch=async()=>Response.json({status:'completed',output:[{content:[{type:'output_text',text:JSON.stringify({answer:'bad',clarification:null,links:['https://evil.example'],package:null})}]}]});assert.equal((await POST(request(input))).status,502);
 globalThis.fetch=async()=>{throw Error('unit-test-secret-error');};assert.equal((await(await POST(request(input))).text()).includes('unit-test-secret'),false);
 }finally{globalThis.fetch=original;delete process.env.CIE_WEBSITE_ADVISER_ENABLED;delete process.env.CIE_WEBSITE_ADVISER_API_KEY;delete process.env.CIE_WEBSITE_ADVISER_MODEL;}
});

test('follow-up history stays contextual and only safe usage metadata is returned',async()=>{
 const original=globalThis.fetch;process.env.CIE_WEBSITE_ADVISER_ENABLED='1';process.env.CIE_WEBSITE_ADVISER_API_KEY='fixture-only';process.env.CIE_WEBSITE_ADVISER_MODEL='fixture-model';
 const followup={locale:'tr',messages:[{role:'user',content:'Türkiye’den gıda ihraç ediyoruz.'},{role:'assistant',content:'Hangi pazarlara yöneliyorsunuz?'},{role:'user',content:'Almanya. Starter yeterli mi?'}]};
 try{globalThis.fetch=async(_url,options)=>{const body=JSON.parse(options.body);assert.deepEqual(body.input,followup.messages);assert.match(body.instructions,/discounts/);return Response.json({status:'completed',model:'fixture-model',usage:{input_tokens:20,output_tokens:10,total_tokens:30,private_field:'excluded'},output:[{content:[{type:'output_text',text:JSON.stringify({answer:'Transport fixture, not a live quality result.',clarification:null,links:['pricing'],package:'Starter'})}]}]});};
 const response=await(await POST(request(followup))).json();assert.deepEqual(response.usage,{input_tokens:20,output_tokens:10,total_tokens:30});assert.equal(response.links[0].href,'/tr/fiyatlandirma');assert.equal(response.provider.model,'fixture-model');
 }finally{globalThis.fetch=original;delete process.env.CIE_WEBSITE_ADVISER_ENABLED;delete process.env.CIE_WEBSITE_ADVISER_API_KEY;delete process.env.CIE_WEBSITE_ADVISER_MODEL;}
});
