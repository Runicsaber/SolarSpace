export function backgroundAudio() {
    const audioListener = new THREE.AudioListener();
    camera.add(audioListener);

    const bgAudio = new THREE.Audio(audioListener);

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load('./assets/bgAudio.mp3', function(buffer) {
        bgAudio.setBuffer(buffer);
        bgAudio.setLoop(true);
        bgAudio.setVolume(0.1);
        bgAudio.play();
    })
}