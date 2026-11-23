(()=>{
  "use strict";
  const modal=document.querySelector('[data-preview-modal]');
  if (!modal) return;
  const modalPanel=modal.querySelector('[role=dialog]');
  const closeControl=modal.querySelector('button[aria-label="Close offer details"]');
  const focusable=modal.querySelector('button');
  let returnFocus=null;
  const open=()=>{
    returnFocus=document.activeElement;
    modal.hidden=false;
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow='hidden';
    (closeControl||focusable)?.focus();
  };
  const close=()=>{
    modal.hidden=true;
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow='';
    returnFocus?.focus?.();
  };
  [...document.querySelectorAll('button')].forEach(b=>{
    const label=b.textContent.trim();
    if (label.includes('Review Offer Details') || label.includes('Review Partner Details') || label.includes('Read offer disclosures and eligibility checklist')) {
      b.addEventListener('click',open);
    }
  });
  modal.querySelectorAll('button').forEach(b=>b.addEventListener('click',close));
  modal.addEventListener('click',e=>{if(e.target===modal)close()});
  modalPanel.addEventListener('click',e=>e.stopPropagation());
  document.addEventListener('keydown',e=>{
    if(modal.hidden)return;
    if(e.key==='Escape'){e.preventDefault();close();}
    if(e.key==='Tab'){
      const list=[...modal.querySelectorAll('button:not([disabled])')];
      const first=list[0],last=list[list.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  for(const b of document.querySelectorAll('section button')){
    const panel=b.parentElement?.querySelector('.accordion-panel');
    if(!panel)continue;
    b.addEventListener('click',()=>{
      const willOpen=!panel.classList.contains('is-open');
      panel.classList.toggle('is-open',willOpen);
      panel.setAttribute('aria-hidden',String(!willOpen));
      const ico=b.querySelector('.flex.h-6');
      if(ico)ico.classList.toggle('rotate-180',willOpen);
    });
  }
  const sticky=[...document.querySelectorAll('[aria-hidden]')].find(el=>
      el.classList.contains('fixed') && el.classList.contains('bottom-0') && el.querySelector('button'));
  if(sticky){
    const update=()=>{
      const show=window.scrollY>400;
      sticky.classList.toggle('translate-y-0',show);
      sticky.classList.toggle('translate-y-full',!show);
      sticky.classList.toggle('pointer-events-none',!show);
      sticky.setAttribute('aria-hidden',String(!show));
      const button=sticky.querySelector('button');
      if(button)button.tabIndex=show?0:-1;
    };
    window.addEventListener('scroll',update,{passive:true});update();
  }
})();
