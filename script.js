let pianoNotes = [];
let optionsChanged = false; //it is used to update buttons when the user change some options after the quiz has already started
let numberOfQuestions = 0;
let questionsAnswered = 0;
let streak = 0;
let intType; //store the type of interval selected by the user
let chordsFixedRoot = true;
let note1; //notes1 and 2 are used to build intervals
let note2;
let interval; //distance of note 1 and 2 in semitones
let intArray = []; //contains allowed intervals for a question
let intExtracted = []; //contains all the intervals generated in one quiz
let intCorrectAnswers = []; //contains the correct answers linked to specific intervals
let chordsArray = []; //contains allowed chords for a question
let chordsExtracted = []; //contains all the chords generated in one quiz
let chordsCorrectAnswers = []; //contains the correct answers linked to specific chords
let chordPositions = []; //contains allowed chord positions
let chordNote1; //chordNotes1, 2, 3 and 4 are used to build a chord
let chordNote2; //chordNote4 is initialized to 0 because it has to be excluded for triads, but included for tetrachords
let chordNote3;
let chordNote4 = 0;
let chordType;
let extractedPosition;
let answerCount = 0; //counts the number of generated questions as the quiz is carried out
pianoInit(pianoNotes);
arraysInit();


//functions
//initializes the values of retults' arrays to 0
function arraysInit() {
  for(let i = 0; i < 14; i++) {
    intExtracted[i] = 0;
    intCorrectAnswers[i] = 0;
  }
  
  for(let i = 0; i < 15; i++) {
    chordsExtracted[i] = 0;
    chordsCorrectAnswers[i] = 0;
  }
}

function playNote(note){
  let audio = new Audio(note);
  audio.type = 'audio/mp3';
  audio.play();
}

//associates a value from 0 to 60 keys to a mp3 file with the sound of the corresponding note of the virtual piano
function playPiano(key){
  //let newKey = key.replace("_", "");
  console.log(key);
  let note = pianoNotes[key-1];
  console.log(pianoNotes[key-1]);
  playNote(note);
}

//initializes an array, notes, with the name of the mp3 files that contains the piano notes' sounds
function pianoInit(notes){
  let j = 0;
  for(let i = 0; i < 5; i++){
  for(let k = 0; k < 12; k++){
    notes[j+k] = 'PianoNotes/' + (i + 1) + '_' + (k + 1) + '.mp3';
    }
    j += 12;
  }
  notes[60] = 'PianoNotes/6_1.mp3';
}

//toggles the colour of a button from grey to green and viceversa
function toggleBtnColor(btn) {
  if (!btn.classList.contains("colored")) {
        btn.classList.add("colored");
    }
    else {
        btn.classList.remove("colored");
    }
  if(optionsChanged == false)  {
    optionsChanged = true;
  }
  console.log(btn.id + " " + btn.style.backgroundColor);
}

//synchronizes colours of buttons in the options section of the quiz and when the quiz is running
function synBtnColor(btn1ID, btn2ID) {
  if(document.getElementById(btn1ID).classList.contains("colored") && !document.getElementById(btn2ID).classList.contains("colored")) {
    document.getElementById(btn2ID).classList.add("colored");
  } else if(!document.getElementById(btn1ID).classList.contains("colored") && document.getElementById(btn2ID).classList.contains("colored")) {
    document.getElementById(btn2ID).classList.remove("colored");
  }
}


//intervals functions
//execute operation when the start button of the intervals quiz is pressed
function startIntervalsQuiz() {
  //change divs visibility
  document.getElementById("intervals-options").classList.add("hide");
  document.getElementById("intervals-quiz").classList.remove("hide");
  
  //transfer option buttons selection
  synBtnColor("min2-opt","min2-col");
  synBtnColor("maj2-opt","maj2-col");
  synBtnColor("min3-opt","min3-col");
  synBtnColor("maj3-opt","maj3-col");
  synBtnColor("perf4-opt","perf4-col");
  synBtnColor("tritone-opt","tritone-col");
  synBtnColor("perf5-opt","perf5-col");
  synBtnColor("min6-opt","min6-col");
  synBtnColor("maj6-opt","maj6-col");
  synBtnColor("min7-opt","min7-col");
  synBtnColor("maj7-opt","maj7-col");
  synBtnColor("octave-opt","octave-col");
  synBtnColor("min9-opt","min9-col");
  synBtnColor("maj9-opt","maj9-col");
  synBtnColor("fixed-root-1","fixed-root-2");
  
  //retrive interval to include in the quiz
  //check which int-col buttons are colored
  retriveSemitones("min2-opt");
  retriveSemitones("maj2-opt");
  retriveSemitones("min3-opt");
  retriveSemitones("maj3-opt");
  retriveSemitones("perf4-opt");
  retriveSemitones("tritone-opt");
  retriveSemitones("perf5-opt");
  retriveSemitones("min6-opt");
  retriveSemitones("maj6-opt");
  retriveSemitones("min7-opt");
  retriveSemitones("maj7-opt");
  retriveSemitones("octave-opt");
  retriveSemitones("min9-opt");
  retriveSemitones("maj9-opt");
  
  console.log(intArray);
  
  //show correct answer buttons
  hideAnswerButtons("min2-opt", "min2-ans");
  hideAnswerButtons("maj2-opt", "maj2-ans");
  hideAnswerButtons("min3-opt", "min3-ans");
  hideAnswerButtons("maj3-opt", "maj3-ans");
  hideAnswerButtons("perf4-opt", "perf4-ans");
  hideAnswerButtons("tritone-opt", "tritone-ans");
  hideAnswerButtons("perf5-opt", "perf5-ans");
  hideAnswerButtons("min6-opt", "min6-ans");
  hideAnswerButtons("maj6-opt", "maj6-ans");
  hideAnswerButtons("min7-opt", "min7-ans");
  hideAnswerButtons("maj7-opt", "maj7-ans");
  hideAnswerButtons("octave-opt", "octave-ans");
  hideAnswerButtons("min9-opt", "min9-ans");
  hideAnswerButtons("maj9-opt", "maj9-ans");
  
  //retrive other options choises
  numberOfQuestions = document.getElementById("n-questions").value;
  console.log(numberOfQuestions);
  intType = document.getElementById("int-type").value;
  console.log(intType);
  intFixedRoot = document.getElementById("fixed-root-1").classList.contains("colored");
  console.log(intFixedRoot);
  
  //show streak and number of remaining questions
  if(numberOfQuestions == 0 || !isNaN(numberOfQuestions)) {
    document.getElementById("intervals-streak").innerText = "Streak: " + streak + " of " + questionsAnswered;
  } else {
    let remain = numberOfQuestions - questionsAnswered;
    document.getElementById("intervals-streak").innerText = "Streak: " + streak + " of " + questionsAnswered + ", " + remain + " remaining";
  }
  
  //put value of flag variable to false (safe action)
  optionsChanged = false;
  
  //start quiz
  generateInterval();
  
  console.log("Intervals quiz started");
}

//build an array with selected intervals
function retriveSemitones(btnID) {
  if(document.getElementById(btnID).classList.contains("colored")) {
    intArray.push(document.getElementById(btnID).value);
  }
}

//hides not necessary buttons for anwers
function hideAnswerButtons(btn1ID, btn2ID) {
  if(!document.getElementById(btn1ID).classList.contains("colored")) {
    document.getElementById(btn2ID).classList.add("hide");
  } else {
    document.getElementById(btn2ID).classList.remove("hide");
    document.getElementById(btn2ID).className = "colored";
  }
}

//play a melodic interval given two notes
function playInterval(note1, note2) {
  playPiano(note1);
  setTimeout(playPiano, 1200, note2);
}

//play an harmonic notes, it utilizes global variables
function playHarmonicInterval() {
  playPiano(note1);
  playPiano(note2);
}

//defines if the interval is ascending, desending or harmonic and plays it using the playInterval function
function hearInterval() {
  if(intType == "asc") {
    playInterval(note1, note2);
  } else if(intType == "des") {
    playInterval(note2, note1);
  } else if(intType == "both") {
      let chance = Math.floor(Math.random()*2);
      if(chance == 0) {
      playInterval(note1, note2);
    } else {
      playInterval(note2, note1);
    }
  } else if(intType == "harm") {
    playHarmonicInterval();
  }
}

//generate an interval
function generateInterval() {
  if(intFixedRoot) {
    note1 = 25;
  } else {
    note1 = Math.floor((Math.random()*34) + 13);
  }
  note2 = intArray[Math.floor((Math.random()*intArray.length))];
  note2 = note1 + Number(note2);
  interval = note2 - note1;
  
  if(intType == "both") {
    let chance = Math.floor(Math.random()*2);
    if(chance == 0) {
      intType = "asc";
    } else {
      intType = "des";
    }
  }
}

//check if the answer is wrong or correct
function getIntervalsAnswer(btn) {
  
  if(btn.value == interval) {
    btn.className = "right";
    streak++;
    document.getElementById("int-feedback").innerText = "Good job, " + btn.innerText + " is the right answer!";
    //document.getElementById("next-int-question").classList.remove("hide");
    console.log("correct!");
    questionsAnswered++;
    
    intExtracted[btn.value-1]++;
    
    if(answerCount == 0) {
      intCorrectAnswers[btn.value-1]++;
    }
    
    if(questionsAnswered == numberOfQuestions) {
      setTimeout(endIntervalsQuiz, 1500);
    } else {
      setTimeout(nextIntervalsQuestion, 1500);
    }
  } else {
    btn.className = "wrong";
    streak = 0;
    document.getElementById("int-feedback").innerText = "Try again!";
    answerCount++;
  }
  
  
  
}

//generate the next question
function nextIntervalsQuestion() {
   
  answerCount = 0;
  
  if(numberOfQuestions == 0) {
    document.getElementById("intervals-streak").innerText = "Streak: " + streak + " of " + questionsAnswered;
  } else {
    let remain = numberOfQuestions - questionsAnswered;
    document.getElementById("intervals-streak").innerText = "Streak: " + streak + " of " + questionsAnswered + ", " + remain + " remaining";
  }

  
  document.getElementById("next-int-question").classList.add("hide");
  
  intFixedRoot = document.getElementById("fixed-root-2").classList.contains("colored");
  
  if(optionsChanged) {
    //reinclude intervals for random generation
    intArray = [];
    retriveSemitones("min2-col", intArray);
    retriveSemitones("maj2-col", intArray);
    retriveSemitones("min3-col", intArray);
    retriveSemitones("maj3-col", intArray);
    retriveSemitones("perf4-col", intArray);
    retriveSemitones("tritone-col", intArray);
    retriveSemitones("perf5-col", intArray);
    retriveSemitones("min6-col", intArray);
    retriveSemitones("maj6-col", intArray);
    retriveSemitones("min7-col", intArray);
    retriveSemitones("maj7-col", intArray);
    retriveSemitones("octave-col", intArray);
    retriveSemitones("min9-col", intArray);
    retriveSemitones("maj9-col", intArray);
    
    console.log(intArray);
  }
  
  generateInterval();
  
  //show correct answer buttons
  hideAnswerButtons("min2-col", "min2-ans");
  hideAnswerButtons("maj2-col", "maj2-ans");
  hideAnswerButtons("min3-col", "min3-ans");
  hideAnswerButtons("maj3-col", "maj3-ans");
  hideAnswerButtons("perf4-col", "perf4-ans");
  hideAnswerButtons("tritone-col", "tritone-ans");
  hideAnswerButtons("perf5-col", "perf5-ans");
  hideAnswerButtons("min6-col", "min6-ans");
  hideAnswerButtons("maj6-col", "maj6-ans");
  hideAnswerButtons("min7-col", "min7-ans");
  hideAnswerButtons("maj7-col", "maj7-ans");
  hideAnswerButtons("octave-col", "octave-ans");
  hideAnswerButtons("min9-col", "min9-ans");
  hideAnswerButtons("maj9-col", "maj9-ans");
  
  document.getElementById("int-feedback").innerText = "Select an answer below";
  
  setTimeout(hearInterval, 500);
}

//go back to intervals options section
function goToIntervalsOptions() {
  document.getElementById("home-page").classList.add("hide");
  document.getElementById("intervals-options").classList.remove("hide");
}

//execute operation to end the quiz and reinitializes variables for a new quiz
function endIntervalsQuiz() {
  //change divs visibility
  document.getElementById("intervals-results").classList.remove("hide");
  document.getElementById("intervals-quiz").classList.add("hide");
  
  for(let i = 0; i < 14; i++) {
    document.getElementById("int-result-p" + i).innerText =  intCorrectAnswers[i]+ "/" + intExtracted[i];
    if(intExtracted[i] != 0) {
      document.getElementById("int-percentage-p" + i).innerText =  Math.round(intCorrectAnswers[i] / intExtracted[i]*100) + "%";
      intExtracted[i] = 0;
      intCorrectAnswers[i] = 0;
    } else {
      document.getElementById("int-percentage-p" + i).innerText = "0%";
    }
    
  }
  
  
  //transfer option buttons selection
  synBtnColor("min2-col","min2-opt");
  synBtnColor("maj2-col","maj2-opt");
  synBtnColor("min3-col","min3-opt");
  synBtnColor("maj3-col","maj3-opt");
  synBtnColor("perf4-col","perf4-opt");
  synBtnColor("tritone-col","tritone-opt");
  synBtnColor("perf5-col","perf5-opt");
  synBtnColor("min6-col","min6-opt");
  synBtnColor("maj6-col","maj6-opt");
  synBtnColor("min7-col","min7-opt");
  synBtnColor("maj7-col","maj7-opt");
  synBtnColor("octave-col","octave-opt");
  synBtnColor("min9-col","min9-opt");
  synBtnColor("maj9-col","maj9-opt");
  synBtnColor("fixed-root-2","fixed-root-1");
  
  intArray = [];
  questionsAnswered = 0;
  streak = 0;
  answerCount = 0;
  document.getElementById("intervals-streak").innerText = "Streak: 0 of 0";
  document.getElementById("int-feedback").innerText = "";
  
  console.log("Intervals quiz ended");
}


//chords functions
//start the chords quiz, very similar to startIntervalsQuiz
function startChordsQuiz() {
  //change divs visibility
  document.getElementById("chords-options").classList.add("hide");
  document.getElementById("chords-quiz").classList.remove("hide");
  
  //transfer option buttons selection
  synBtnColor("maj-triad-opt","maj-triad-col");
  synBtnColor("min-triad-opt","min-triad-col");
  synBtnColor("dim-triad-opt","dim-triad-col");
  synBtnColor("aug-triad-opt","aug-triad-col");
  synBtnColor("sus-two-opt","sus-two-col");
  synBtnColor("sus-four-opt","sus-four-col");
  synBtnColor("dom-sev-opt","dom-sev-col");
  synBtnColor("maj-sev-opt","maj-sev-col");
  synBtnColor("min-sev-opt","min-sev-col");
  synBtnColor("min-maj-sev-opt","min-maj-sev-col");
  synBtnColor("dim-sev-opt","dim-sev-col");
  synBtnColor("dim-maj-sev-opt","dim-maj-sev-col");
  synBtnColor("half-dim-sev-opt","half-dim-sev-col");
  synBtnColor("aug-sev-opt","aug-sev-col");
  synBtnColor("aug-maj-sev-opt","aug-maj-sev-col");
  synBtnColor("fixed-root-3","fixed-root-4");
  
  //retrive interval to include in the quiz
  //check which int-col buttons are colored
  retriveChordTypes("maj-triad-col", chordsArray);
  retriveChordTypes("min-triad-col", chordsArray);
  retriveChordTypes("dim-triad-col", chordsArray);
  retriveChordTypes("aug-triad-col", chordsArray);
  retriveChordTypes("sus-two-col", chordsArray);
  retriveChordTypes("sus-four-col", chordsArray);
  retriveChordTypes("dom-sev-col", chordsArray);
  retriveChordTypes("maj-sev-col", chordsArray);
  retriveChordTypes("min-sev-col", chordsArray);
  retriveChordTypes("min-maj-sev-col", chordsArray);
  retriveChordTypes("dim-sev-col", chordsArray);
  retriveChordTypes("dim-maj-sev-col", chordsArray);
  retriveChordTypes("half-dim-sev-col", chordsArray);
  retriveChordTypes("aug-sev-col", chordsArray);
  retriveChordTypes("aug-maj-sev-col", chordsArray);
  
  console.log(chordsArray);
  
  //show correct answer buttons
  hideAnswerButtons("maj-triad-opt","maj-triad-ans");
  hideAnswerButtons("min-triad-opt","min-triad-ans");
  hideAnswerButtons("dim-triad-opt","dim-triad-ans");
  hideAnswerButtons("aug-triad-opt","aug-triad-ans");
  hideAnswerButtons("sus-two-opt","sus-two-ans");
  hideAnswerButtons("sus-four-opt","sus-four-ans");
  hideAnswerButtons("dom-sev-opt","dom-sev-ans");
  hideAnswerButtons("maj-sev-opt","maj-sev-ans");
  hideAnswerButtons("min-sev-opt","min-sev-ans");
  hideAnswerButtons("min-maj-sev-opt","min-maj-sev-ans");
  hideAnswerButtons("dim-sev-opt","dim-sev-ans");
  hideAnswerButtons("dim-maj-sev-opt","dim-maj-sev-ans");
  hideAnswerButtons("half-dim-sev-opt","half-dim-sev-ans");
  hideAnswerButtons("aug-sev-opt","aug-sev-ans");
  hideAnswerButtons("aug-maj-sev-opt","aug-maj-sev-ans");
  
  //retrive other options choises
  numberOfQuestions = document.getElementById("chords-n-questions").value;
  console.log(numberOfQuestions);
  retriveChordPostitions();
  chordsFixedRoot = document.getElementById("fixed-root-3").classList.contains("colored");
  console.log(chordsFixedRoot);
  
  //show streak and number of remaining questions
  if(numberOfQuestions == 0) {
    document.getElementById("chords-streak").innerText = "Streak: " + streak + " of " + questionsAnswered;
  } else {
    let remain = numberOfQuestions - questionsAnswered;
    document.getElementById("chords-streak").innerText = "Streak: " + streak + " of " + questionsAnswered + ", " + remain + " remaining";
  }
  
  //put value of flag variable to false (safe action)
  optionsChanged = false;
  
  //start quiz
  generateChord();
  
  console.log("Chords quiz started");
}

//retrive the allowed positions for the chords
function retriveChordPostitions() {
  if(document.getElementById("root-position").checked) {
    chordPositions.push("root-position");
  }
  if(document.getElementById("first-inversion").checked) {
    chordPositions.push("first-inversion");
  }
  if(document.getElementById("second-inversion").checked) {
    chordPositions.push("second-inversion");
  }
  if(document.getElementById("third-inversion").checked) {
    chordPositions.push("third-inversion");
  }
}

//retrive the allowed types of chords
function retriveChordTypes(btnID, array) {
  if(document.getElementById(btnID).classList.contains("colored")) {
    array.push(document.getElementById(btnID).value);
  }
}

function generateChord() {
  if(chordsFixedRoot) {
    chordNote1 = 25;
  } else {
    chordNote1 = Math.floor(Math.random()*26) + 13;
  }
  chordType = chordsArray[Math.floor(Math.random()*chordsArray.length)];
  
  //switch to generate single notes of chord
  switch(+chordType) {
  case 1:
    chordNote2 = chordNote1 + 4;
    chordNote3 = chordNote1 + 7;
    break;
  case 2:
    chordNote2 = chordNote1 + 3;
    chordNote3 = chordNote1 + 7;
    break;
  case 3:
    chordNote2 = chordNote1 + 3;
    chordNote3 = chordNote1 + 6;
    break;
  case 4:
    chordNote2 = chordNote1 + 4;
    chordNote3 = chordNote1 + 8;
    break;
  case 5:
    chordNote2 = chordNote1 + 2;
    chordNote3 = chordNote1 + 7;
    break;
  case 6:
    chordNote2 = chordNote1 + 5;
    chordNote3 = chordNote1 + 7;
    break;
  case 7:
    chordNote2 = chordNote1 + 4;
    chordNote3 = chordNote1 + 7;
    chordNote4 = chordNote1 + 10;
    break;
  case 8:
    chordNote2 = chordNote1 + 4;
    chordNote3 = chordNote1 + 7;
    chordNote4 = chordNote1 + 11;
    break;
  case 9:
    chordNote2 = chordNote1 + 3;
    chordNote3 = chordNote1 + 7;
    chordNote4 = chordNote1 + 10;
    break;
  case 10:
    chordNote2 = chordNote1 + 3;
    chordNote3 = chordNote1 + 7;
    chordNote4 = chordNote1 + 11;
    break;
  case 11:
    chordNote2 = chordNote1 + 3;
    chordNote3 = chordNote1 + 6;
    chordNote4 = chordNote1 + 9;
    break;
  case 12:
    chordNote2 = chordNote1 + 3;
    chordNote3 = chordNote1 + 6;
    chordNote4 = chordNote1 + 11;
    break;
  case 13:
    chordNote2 = chordNote1 + 3;
    chordNote3 = chordNote1 + 6;
    chordNote4 = chordNote1 + 10;
    break;
  case 14:
    chordNote2 = chordNote1 + 4;
    chordNote3 = chordNote1 + 8;
    chordNote4 = chordNote1 + 10;
    break;
  case 15:
    chordNote2 = chordNote1 + 4;
    chordNote3 = chordNote1 + 8;
    chordNote4 = chordNote1 + 11;
    break;
  default:
  
  } 
  extractedPosition = chordPositions[Math.floor(Math.random()*chordPositions.length)];
  console.log(extractedPosition);
}

//check if the answer is wrong or correct
function getChordsAnswer(btn) {
  if(btn.value == chordType) {
    btn.className = "right";
    streak++;
    document.getElementById("chords-feedback").innerText = "Good job, " + btn.innerText + " is the right answer!";
    //document.getElementById("next-int-question").classList.remove("hide");
    console.log("correct!");
    questionsAnswered++;
    
    chordsExtracted[btn.value-1]++;
    
    if(answerCount == 0) {
      chordsCorrectAnswers[btn.value-1]++;
    }
    
    if(questionsAnswered == numberOfQuestions) {
      setTimeout(endChordsQuiz, 1500);
    } else {
      setTimeout(nextChordsQuestion, 1500);
    }
  } else {
    btn.className = "wrong";
    streak = 0;
    document.getElementById("chords-feedback").innerText = "Try again!";
    answerCount++;
  }
}

function playChordRootPosition() {
  playPiano(chordNote1);
  playPiano(chordNote2);
  playPiano(chordNote3);
  if(chordNote4 != 0) {
    playPiano(chordNote4);
  }
}

function playChordFirstInversion() {
  playPiano(chordNote1 + 12);
  playPiano(chordNote2);
  playPiano(chordNote3);
  if(chordNote4 != 0) {
    playPiano(chordNote4);
  }
}

function playChordSecondInversion() {
  playPiano(chordNote1 + 12);
  playPiano(chordNote2 + 12);
  playPiano(chordNote3);
  if(chordNote4 != 0) {
    playPiano(chordNote4);
  }
}

function playChordThirdInversion() {
  playPiano(chordNote1 + 12);
  playPiano(chordNote2 + 12);
  playPiano(chordNote3 + 12);
  if(chordNote4 != 0) {
    playPiano(chordNote4);
  }
}

//associate the position of the chord to the correct play function
function hearChord() {
  if(extractedPosition == "root-position") {
    playChordRootPosition();
  } else if(extractedPosition == "first-inversion") {
    playChordFirstInversion();
  } else if(extractedPosition == "second-inversion") {
    playChordSecondInversion();
  } else if(extractedPosition == "third-inversion") {
    playChordThirdInversion();
  }
  
  console.log(chordNote1);
  console.log(chordNote2);
  console.log(chordNote3);
  console.log(chordNote4);
}

//generate next question
function nextChordsQuestion() {
  
  answerCount = 0;
  
  if(numberOfQuestions == 0) {
    document.getElementById("chords-streak").innerText = "Streak: " + streak + " of " + questionsAnswered;
  } else {
    let remain = numberOfQuestions - questionsAnswered;
    document.getElementById("chords-streak").innerText = "Streak: " + streak + " of " + questionsAnswered + ", " + remain + " remaining";
  }

  
  document.getElementById("next-chords-question").classList.add("hide");
  
  chordsFixedRoot = document.getElementById("fixed-root-4").classList.contains("colored");
  
  if(optionsChanged) {
    //reinclude intervals for random generation
    chordsArray = [];
    retriveChordTypes("maj-triad-col", chordsArray);
    retriveChordTypes("min-triad-col", chordsArray);
    retriveChordTypes("dim-triad-col", chordsArray);
    retriveChordTypes("aug-triad-col", chordsArray);
    retriveChordTypes("sus-two-col", chordsArray);
    retriveChordTypes("sus-four-col", chordsArray);
    retriveChordTypes("dom-sev-col", chordsArray);
    retriveChordTypes("maj-sev-col", chordsArray);
    retriveChordTypes("min-sev-col", chordsArray);
    retriveChordTypes("min-maj-sev-col", chordsArray);
    retriveChordTypes("dim-sev-col", chordsArray);
    retriveChordTypes("dim-maj-sev-col", chordsArray);
    retriveChordTypes("half-dim-sev-col", chordsArray);
    retriveChordTypes("aug-sev-col", chordsArray);
    retriveChordTypes("aug-maj-sev-col", chordsArray);
    
    console.log(chordsArray);
  }
  
  chordNote4 = 0;
  generateChord();
  
  //show correct answer buttons
  hideAnswerButtons("maj-triad-col","maj-triad-ans");
  hideAnswerButtons("min-triad-col","min-triad-ans");
  hideAnswerButtons("dim-triad-col","dim-triad-ans");
  hideAnswerButtons("aug-triad-col","aug-triad-ans");
  hideAnswerButtons("sus-two-col","sus-two-ans");
  hideAnswerButtons("sus-four-col","sus-four-ans");
  hideAnswerButtons("dom-sev-col","dom-sev-ans");
  hideAnswerButtons("maj-sev-col","maj-sev-ans");
  hideAnswerButtons("min-sev-col","min-sev-ans");
  hideAnswerButtons("min-maj-sev-col","min-maj-sev-ans");
  hideAnswerButtons("dim-sev-col","dim-sev-ans");
  hideAnswerButtons("dim-maj-sev-col","dim-maj-sev-ans");
  hideAnswerButtons("half-dim-sev-col","half-dim-sev-ans");
  hideAnswerButtons("aug-sev-col","aug-sev-ans");
  hideAnswerButtons("aug-maj-sev-col","aug-maj-sev-ans");
  
  document.getElementById("chords-feedback").innerText = "Select an answer below";
  
  setTimeout(hearChord, 500);
}

//go to chords options section
function goToChordsOptions() {
  document.getElementById("home-page").classList.add("hide");
  document.getElementById("chords-options").classList.remove("hide");
}

//end the chords quiz
function endChordsQuiz() {
  //change divs visibility
  document.getElementById("chords-results").classList.remove("hide");
  document.getElementById("chords-quiz").classList.add("hide");
  
  for(let i = 0; i < 15; i++) {
    document.getElementById("chords-result-p" + i).innerText =  chordsCorrectAnswers[i]+ "/" + chordsExtracted[i];
    if(chordsExtracted[i] != 0) {
      document.getElementById("chords-percentage-p" + i).innerText =  Math.round(chordsCorrectAnswers[i] / chordsExtracted[i]*100) + "%";
      chordsExtracted[i] = 0
      chordsCorrectAnswers[i] = 0;
    } else {
      document.getElementById("chords-percentage-p" + i).innerText = "0%";
    }
  }
  
  //transfer option buttons selection
  synBtnColor("maj-triad-col","maj-triad-opt");
  synBtnColor("min-triad-col","min-triad-opt");
  synBtnColor("dim-triad-col","dim-triad-opt");
  synBtnColor("aug-triad-col","aug-triad-opt");
  synBtnColor("sus-two-col","sus-two-opt");
  synBtnColor("sus-four-col","sus-four-opt");
  synBtnColor("dom-sev-col","dom-sev-opt");
  synBtnColor("maj-sev-col","maj-sev-opt");
  synBtnColor("min-sev-col","min-sev-opt");
  synBtnColor("min-maj-sev-col","min-maj-sev-opt");
  synBtnColor("dim-sev-col","dim-sev-opt");
  synBtnColor("dim-maj-sev-col","dim-maj-sev-opt");
  synBtnColor("half-dim-sev-col","half-dim-sev-opt");
  synBtnColor("aug-sev-col","aug-sev-opt");
  synBtnColor("aug-maj-sev-col","aug-maj-sev-opt");
  synBtnColor("fixed-root-4","fixed-root-3");
  
  chordsArray = [];
  chordPositions = [];
  questionsAnswered = 0;
  streak = 0;
  chordNote4 = 0;
  answerCount = 0;
  document.getElementById("chords-streak").innerText = "Streak: 0 of 0";
  document.getElementById("chords-feedback").innerText = "";
  
  console.log("Chords quiz ended");
}


//others
function goToHomePage() {
  //terminate the current quiz
  endIntervalsQuiz();
  endChordsQuiz();
  
  document.getElementById("home-page").classList.remove("hide");
  document.getElementById("chords-options").classList.add("hide");
  document.getElementById("intervals-options").classList.add("hide");
  document.getElementById("chords-quiz").classList.add("hide");
  document.getElementById("intervals-quiz").classList.add("hide");
  document.getElementById("leaving-quiz").classList.add("hide");
  document.getElementById("intervals-results").classList.add("hide");
  document.getElementById("chords-results").classList.add("hide");
  
}

//correctly terminate the quiz and go back to home page whenever desired
function leaveQuiz() {
  if(!document.getElementById("home-page").classList.contains("hide") || !document.getElementById("intervals-results").classList.contains("hide") || !document.getElementById("chords-results").classList.contains("hide")) {
    goToHomePage();
  } else {
    document.getElementById("leaving-quiz").classList.remove("hide");
  }
}

//hide the superimposed leave page
function hideLeave() {
  document.getElementById("leaving-quiz").classList.add("hide");
}