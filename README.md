preview link: https://htmlpreview.github.io/?https://github.com/VittorioSusmel/EarTraining-Project/blob/main/index.html  
video presentation: [![Ear Training Site Presentation](https://studio.youtube.com/video/iGlU_qmR-L8/edit)](https://youtu.be/iGlU_qmR-L8)

The project consists in the implementation of a website that can help musicians develop their ability to recognize intervals and chords types.  
The project is realized in vanilla javascript, css and html.  
The site is divided in three main sections: a virtual piano keyboard, an intervals quiz section and a chords quiz section.  
The virtual piano section is always visible and can not be removed while the design of the site allows to easly navigate through the two quiz sections; the virtual keyboard is not optimized to be played as a musical instrment, while it has been thought as a support mechanism to help the learning process by providing an audio reference.  
The piano section mimics the layout of a real 61 keys keyboard: an audio file is associated to every key, the 61 mp3 files that contains the different notes, with the timbre of a piano, are stored in a directory called "PianoNotes" and their name indicates the octave and the semitones associated to the note starting from the last C note.  
The intervals and chords sections are both composed of tre subsections: options, quiz and result.  
In the option sections the user can decides which intervals, or chords, to include in the quiz, if the interval, or chord, is built on a fixed root note, C4, or randomly chosen, how many question the quiz will contain and respectively the interval type or the chord position.  
The intervals, or chords, included in the quiz and the fixed root property can be changed even when the quiz is running, while it is not possible to change the other options.  
The quiz can be interrupted in every moment by pressing the "End quiz" button that will show the results of the quiz or by pressing the "Home" button that will terminate the quiz without showing the results and bring the user back to the home page when he/she can decide to start a new quiz.
