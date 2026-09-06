//  TWO-COLUMN LAYOUT -  WITH STICKY SIDEBAR


document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.querySelector('.js-sidebar');
  const sidebarToggler = document.querySelector('.js-menubtn');
  const sidebarExit = document.querySelector('.js-exit');
  const sidebarBackdrop = document.querySelector('.js-sbar-backdrop');

  if(!sidebar || !sidebarBackdrop || !sidebarToggler) return;

  const isMobile = () => window.matchMedia('(max-width:62rem)').matches; // 992px = 62rem

  // Focus trap vars
  let focusableEls = [];
  let firstFocusableEl = null;
  let lastFocusableEl = null;

  function setFocusTrap() {
    focusableEls = sidebar.querySelectorAll(
      'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if(focusableEls.length === 0) return;

    firstFocusableEl = focusableEls[0];
    lastFocusableEl = focusableEls[focusableEls.length - 1];

    firstFocusableEl.focus();
  }

  function handleFocusTrap(e) {
    if(e.key !== "Tab") return;

    if(e.shiftKey){
      if(document.activeElement === firstFocusableEl){
        e.preventDefault();
        lastFocusableEl.focus();
      }
    } else {
      if(document.activeElement === lastFocusableEl){
        e.preventDefault();
        firstFocusableEl.focus();
      }
    }
  }

  function openSidebar(){
    sidebar.setAttribute('aria-hidden','false');
    sidebarToggler.setAttribute('aria-pressed','true');
    sidebarBackdrop.classList.add('is-sbar-active');

    setFocusTrap();
    document.addEventListener('keydown', handleFocusTrap);
  }

  function closeSidebar(){
    sidebar.setAttribute('aria-hidden','true');
    sidebarToggler.setAttribute('aria-pressed','false');
    sidebarBackdrop.classList.remove('is-sbar-active');

    document.removeEventListener('keydown', handleFocusTrap);
    sidebarToggler.focus();
  }

  function toggleSidebar(){
    if(sidebar.getAttribute('aria-hidden') === 'false'){
      closeSidebar();
    } else {
      openSidebar();
    }
  }

  
  // make sidebar always open on desktop mode
  function syncDesktopState(){

  if(!isMobile()){

    // Desktop → sidebar always visible
    sidebar.setAttribute('aria-hidden','false');
    sidebarToggler.setAttribute('aria-pressed','true');
    sidebarBackdrop.classList.remove('is-sbar-active');

  } else {

    // Mobile → sidebar closed initially
    sidebar.setAttribute('aria-hidden','true');
    sidebarToggler.setAttribute('aria-pressed','false');

  }

}
  
// for device rotation
window.addEventListener('resize', syncDesktopState);
syncDesktopState();
  
  
  
  sidebarToggler.addEventListener('click', e => {
    if(!isMobile()) return;
    e.stopPropagation();
    toggleSidebar();
  });

  // exit button is optional
  sidebarExit?.addEventListener('click', e => {
    if(!isMobile()) return;
    e.stopPropagation();
    closeSidebar();
  });

  
  
  // Close when clicking outside or on content
  sidebarBackdrop.addEventListener('click', () => {

  if(
    isMobile() &&
    sidebar.getAttribute('aria-hidden') === 'false'
  ){
    closeSidebar();
  }

});



  // Escape key
  document.addEventListener('keydown', e => {
    if(e.key === "Escape" && sidebar.getAttribute('aria-hidden') === 'false'){
      closeSidebar();
    }
  });

  // Swipe gestures
  let startX = 0;
  document.addEventListener('touchstart', e => startX = e.touches[0].clientX);
  document.addEventListener('touchend', e => {
    let diff = e.changedTouches[0].clientX - startX;
    if(diff > 80 && isMobile()) openSidebar();
    if(diff < -80 && isMobile()) closeSidebar();
  });

});


