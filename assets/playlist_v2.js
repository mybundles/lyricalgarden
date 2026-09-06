//  ACCESSIBLE AUDIO PLAYER WITH PLAYLIST

document.addEventListener('DOMContentLoaded', function () {
    const audioPlayer = document.querySelector('.js-audio');
    const audioBtn = document.querySelector('.js-audiobtn');
    const playlist = [
        "assets/juliush-verona-soprano-classic-orchestra-amp-choir-1806.mp3",
        "assets/helen_ispirian-jbrahms-mainacht-mezzosoprano-helen-ispirian-161115.mp3"
    ];

    let currentTrackIndex = 0;
    audioPlayer.src = playlist[currentTrackIndex];
    audioPlayer.volume = 0.4;


    // External button click

    audioBtn.addEventListener('click', function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            showPlayer();
            syncButtonPlaying();
        } else {
            audioPlayer.pause();
            hidePlayer();
            syncButtonPaused();
        }
    });


    // Native audio controls: sync with external btn

    audioPlayer.addEventListener('play', function () {
        showPlayer();
        syncButtonPlaying();
    });

    audioPlayer.addEventListener('pause', function () {
        syncButtonPaused();
    });


    // Track ends → next track

    audioPlayer.addEventListener('ended', function () {
        currentTrackIndex++;

        if (currentTrackIndex < playlist.length) {
            audioPlayer.src = playlist[currentTrackIndex];
            audioPlayer.play();
        } else {
            currentTrackIndex = 0;
            audioPlayer.src = playlist[currentTrackIndex];
            audioPlayer.pause();
            hidePlayer();
            syncButtonPaused();
        }
    });


    // Helper functions

    function showPlayer() {
        audioPlayer.setAttribute('aria-hidden', 'false');
    }

    function hidePlayer() {
        audioPlayer.setAttribute('aria-hidden', 'true');
    }

    function syncButtonPlaying() {
        audioBtn.setAttribute('aria-label', 'Pause audio');
        audioBtn.setAttribute('aria-pressed', 'true');
    }

    function syncButtonPaused() {
        audioBtn.setAttribute('aria-label', 'Play audio');
        audioBtn.setAttribute('aria-pressed', 'false');
    }
});


