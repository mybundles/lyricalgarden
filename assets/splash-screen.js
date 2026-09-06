// From Sitepoint


const splashScreen = document.querySelector('.js-splash-screen');

const enterBtn = document.querySelector('.js-splash-screen-close');



// Check if user already dismissed it during this browser session

if (sessionStorage.getItem('splashDismissed') === 'true') {
    splashScreen.style.display = 'none';

}
function dismissSplash() {
    splashScreen.classList.add('is-hidden');
    sessionStorage.setItem('splashDismissed', 'true');
}
enterBtn.addEventListener('click', dismissSplash);
window.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !splashScreen.classList.contains('is-hidden')) {
        dismissSplash();
    }
});
