'use strict';
const paymentParams=new URLSearchParams(location.hash.slice(1));
const demoReference=paymentParams.get('reference')||'';
const demoCode=paymentParams.get('code')||'';
const demoAmount=Number(paymentParams.get('amount'));
const demoExpiry=Number(paymentParams.get('expires'));
const pageContent=document.querySelector('#paymentPageContent');
let previewFinished=false;
const validDemo=/^SKY-[A-HJ-NP-Z2-9]{6}$/.test(demoReference)&&/^[A-HJ-NP-Z2-9]{6}$/.test(demoCode)&&Number.isSafeInteger(demoAmount)&&demoAmount>0&&demoAmount<=200000000&&Number.isSafeInteger(demoExpiry);
const demoMoney=value=>new Intl.NumberFormat('en-US',{style:'currency',currency:'VND',maximumFractionDigits:0}).format(value);
function showPaymentError(message){pageContent.innerHTML='<h1>This demo link is unavailable.</h1><p class="modal-copy"></p><a class="button button-outline" href="./">Back to SkyBook</a>';pageContent.querySelector('p').textContent=message}
function displayPreview(){
 if(!validDemo){showPaymentError('Open checkout in SkyBook and scan the QR to start a demo payment.');return}
 if(Date.now()>=demoExpiry){showPaymentError('The QR has expired. Generate a new QR in the original booking tab.');return}
 pageContent.innerHTML=`<h1>Review your demo payment.</h1><p class="modal-copy">Example amount only. Nothing will be charged.</p><p class="payment-amount">${demoMoney(demoAmount)}</p><div class="payment-reference"><span>Demo payment reference</span><strong>${demoReference}</strong></div><p class="modal-copy">Simulate payment to reveal the confirmation code for your original booking tab.</p><button type="button" id="finishPreview" class="button button-primary">Simulate payment</button>`;
}
function completePreview(){
 if(previewFinished)return;
 if(!validDemo||Date.now()>=demoExpiry){showPaymentError('This demo payment has expired. Generate a new QR in your booking tab.');return}
 previewFinished=true;
 pageContent.innerHTML=`<div class="success-emblem"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 12 5 5L20 6"/></svg></div><h1>Demo payment complete.</h1><p class="modal-copy">No money was charged. Enter this code in the original booking tab to complete your sample booking.</p><strong class="confirmation-code">${demoCode}</strong><button type="button" class="button button-outline" id="copyDemoCode">Copy confirmation code</button><p id="copyStatus" class="modal-note" role="status"></p><p class="modal-copy" style="margin-top:20px">If both tabs are on this browser, the booking can confirm automatically. On another device, enter the code manually. This code expires with the QR.</p>`;
 if(typeof BroadcastChannel!=='undefined'){const channel=new BroadcastChannel('skybook-demo-payments');channel.postMessage({type:'demo-payment',reference:demoReference,code:demoCode});setTimeout(()=>channel.close(),500)}
}
document.addEventListener('click',async event=>{
 if(event.target.closest('#finishPreview'))completePreview();
 if(event.target.closest('#copyDemoCode')){try{await navigator.clipboard.writeText(demoCode);document.querySelector('#copyStatus').textContent='Code copied. Return to the original booking tab.'}catch{document.querySelector('#copyStatus').textContent='Copy the 6-character code displayed above.'}}
});
displayPreview();
setInterval(()=>{if(validDemo&&!previewFinished&&Date.now()>=demoExpiry)showPaymentError('The QR has expired. Generate a new one in the original booking tab.')},1000);
