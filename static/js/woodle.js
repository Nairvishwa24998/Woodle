// storing alphabets as a string 
let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"


// variable to check if correct answer has been found
let foundans = false;

// function to search for word from the directory of words. Returns True if found else False
function search(x, wordRepositorylist){
  let found = false;
  x = x.toLowerCase();
  for (let i = 0; i < 9622; i ++){
    if(wordRepositorylist[i] === x){
      found = true;
      break
    }
  }
  return found;
}

// function to round value to two decimal places
function roundtwo(num) {
  return +(Math.round(num + "e+2")  + "e-2");
}

// function check if the entered element is an alphabet
function check(x){
    let result = false;
    x = x.toUpperCase()
    for(let i = 0; i < chars.length; i++){
        if (chars[i] === x){
            result = true;
            break
        }
    }
    return result;
}

// function to calculate score
function scorecalculator(time, trycount){
  return (time * ((6 - trycount/30)))/10;
}

// variable to keep tabs on the number of clicks and prevent unnecessary results
var counter = 0;

// main function 
function initiate(){
  fetch('static/text/words.txt')
  .then(response => response.text())
  .then(text => {
    let wordRepositorylist = text.split(/\r?\n/);
    counter = counter + 1;
    //  prevent multiple clicks from ruining the game      
    if (counter === 1){
      // choose random number from 0 to 9622
      let number = Math.floor(Math.random() * wordRepositorylist.length) + 1;
      // pick the word at that position
      let word = wordRepositorylist[number-1].toUpperCase();
      // variable to keep track of time
      let time = 300;
      // variable to keep tracj of tries
      let trycount = 0;
      // object to check if user has been able to move past any of the levels
      let records = {1: false, 2 : false, 3: false, 4: false, 5: false, 6: false};
      // function to keep track of time
      function timekeeper(){
        time = time - 1;
        let timedisplay = document.getElementById("time");
        timedisplay.innerHTML = time.toString();
        if (time <= 0){
          time = 0;
          clearInterval(timerepeater);
          timedisplay.innerHTML = "END";
          let wordlegrid = document.getElementById("wordlegrid");
          wordlegrid.innerHTML = "";
          alert(`The word was ${word}!`)
          setTimeout(()=>{location.reload();}, 2000)
        }
        return time;
      }
      // running the function every 1 second
      let timerepeater = setInterval(timekeeper, 1000); 
      // initializing empty array and storing the word as an array of characters
      let wordlis = [];
      for(let i = 0; i < 5; i ++){
        wordlis.push(word[i]);
      }
      let t = 5;
      // variable which increments/decrementchecks depending on whether an alphabet/backspace is pressed
      let count = 0;
      // array to store entered alphabets
      let store = [];
      let answers = {};
      for(let i = 0; i < 5; i ++){
      word[i] = false;
      }
      // variables to store whether answer has been found yet or not
      document.body.addEventListener('keydown', function(event){
      let key = event.key;
      // Convert everything to uppercase for convenience
      key = key.toUpperCase();
      // if key is in alphabets, print it out, add it to the array, increase count by 1
      if (check(key) === true && key !== "BACKSPACE"){
          if(count >= t - 5 && count < t){
          count = count + 1;
          relid = document.getElementById(count.toString());
          relid.innerHTML = key;
          store = store + key;
     }
      }
      // if key is a backspace, then remove the item from stored array
      else if(check(key) === false && key === "BACKSPACE"){
          if (count > t-5){
          // remove the last element from store
          store = store.slice(0,-1);
          relid = document.getElementById(count.toString());
          relid.innerHTML = "";
          count = count - 1;
      }
      }

      else if(check(key) === false && key === "SHIFT"){
        console.log("route1");
          if (count % 5 === 0 && count !== 0){
            // store the last five letters from store 
            let interim = store.slice(count-5,count);
            // if the last five letters do not appear in the dictionary show the error
            if (search(interim, wordRepositorylist) === false){
            alert("Not in the word list!");}
            else{
              // initialize empty object
              let dic = {};
              for(let i = 0; i < 5; i ++){
              if (dic.hasOwnProperty(word[i])){dic[word[i]] = dic[word[i]] + 1;}
              else{dic[word[i]] = 1;}}
              console.log(dic);
              records[t/5] = true;
              t = t + 5;  
              for(let i = 0; i < 5; i ++){
                // if you don't do this it would only colour the top most boxes
                let k = i + 1 + count-5;
                let box = document.getElementById(k.toString());
                count.toString()
                // don't use the in operator instead use this way. In javascript -1 is the index return when the item is not in the list
                if (wordlis.indexOf(interim[i]) !== -1){
                  if(interim[i] === wordlis[i]){
                    box.style.background = "#538D4E";
                    dic[interim[i]] = dic[interim[i]] - 1;
      
                  }
                }
                else{box.style.background = "#3A3A3C";}
              
              }
                for(let i = 0; i < 5; i ++){
                  console.log(1);
                  // if you don't do this it would only colour the top most boxes
                  let k = i + 1 + count-5;
                  let box = document.getElementById(k.toString());
                  count.toString()
                  // don't use the in operator instead use this way. In javascript -1 is the index return when the item is not in the list
                  if (wordlis.indexOf(interim[i]) !== -1){
                    console.log(2);
                    if(interim[i] !== wordlis[i])
                    {console.log(3);
                      if(dic[interim[i]] !== 0){
                        console.log(4);
                        box.style.background = "#B59F3B";
                      dic[interim[i]] = dic[interim[i]] - 1;}
                      else{box.style.background = "#3A3A3C";}
                    }
                  }
                }
              
            } 
      
    if (records[1] === true && records[2] === true && records[3] === true && records[4] === true && records[5] === true && records[6] === true && word !== interim){
          time = 0;
          clearInterval(timerepeater);
          let timedisplay = document.getElementById("time");
          timedisplay.innerHTML = "END";
          let wordlegrid = document.getElementById("wordlegrid");
          wordlegrid.innerHTML = "";
          alert(`The word was ${word}!`);
          setTimeout(()=>{location.reload();}, 2000);
    }  
    // If you win, change the timer to END
    if (word === interim){
          let timefinal = timekeeper();
          clearInterval(timerepeater);
          let timedisplay = document.getElementById("time");
          timedisplay.innerHTML = "END";
          let wordlegrid = document.getElementById("wordlegrid");
          wordlegrid.innerHTML = "";
          let finalscore = roundtwo(scorecalculator(timefinal,trycount));
          alert(`You scored ${finalscore.toString()}.`);
          setTimeout(()=>{location.reload();}, 2000);
        }
        console.log(trycount);
        trycount = trycount + 1;}} 
  });
}
  })
  .catch(error => {
    console.error('Error fetching the words file:', error);
  })

 
}



