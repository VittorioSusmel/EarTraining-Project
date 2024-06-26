const keys = document.querySelectorAll('.key')

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key))
})

function playNote (key){
  const noteAudio = document.getElementById(key.dataset.note)
  noteAudio.play()
  
}

/*function playFile(filepath) {
  // Fetch the file
  fetch(filepath)
    // Read it into memory as an arrayBuffer
    .then(response => response.arrayBuffer())
    // Turn it from mp3/aac/whatever into raw audio data
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      // Now we're ready to play!
      const soundSource = context.createBufferSource();
      soundSource.buffer = audioBuffer;
      soundSource.connect(context.destination);
      soundSource.start();
    });
}*/