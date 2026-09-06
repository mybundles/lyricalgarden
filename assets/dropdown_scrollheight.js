
// ACCESSIBLE DROPDOWN USING SCROLLHEIGHT

const toggleBtns = document.querySelectorAll('.js-dpdown-trigr');

const updateDropdownState = (btn, forceExpand) => {
  const content = btn.nextElementSibling;
  // If forceExpand is provided, use it; otherwise, flip the current state
  const isExpanding = forceExpand ?? btn.getAttribute('aria-expanded') === 'false';

  btn.setAttribute('aria-expanded', isExpanding);
  // Using scrollHeight allows for a perfect transition to the exact content size
  content.style.maxHeight = isExpanding ? `${content.scrollHeight}px` : '0px';
};

const closeAllExcept = (currentBtn = null) => {
  toggleBtns.forEach(btn => {
    if (btn !== currentBtn) {
      updateDropdownState(btn, false);
    }
  });
};

toggleBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    // 1. Close others
    closeAllExcept(btn);
    // 2. Toggle this one
    updateDropdownState(btn);
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.js-dpdown-trigr')) {
    closeAllExcept();
  }
});

// Optional: Handle window resizing
// (ScrollHeight changes if the user resizes the browser!)
window.addEventListener('resize', () => {
  toggleBtns.forEach(btn => {
    if (btn.getAttribute('aria-expanded') === 'true') {
      const content = btn.nextElementSibling;
      content.style.maxHeight = `${content.scrollHeight}px`;
    }
  });
});

