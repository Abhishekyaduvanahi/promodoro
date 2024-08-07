const timer = document.querySelector('.timer');
const title = document.querySelector('.title');
const startBtn = document.querySelector('.startBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const resumeBtn = document.querySelector('.resumeBtn');
const resetBtn = document.querySelector('.resetBtn');
const pomoCountDisplay = document.querySelector('.pomoCountDisplay');

//Making Variables
const WORK_TIME =1*60;
const BREAK_TIME =0.5*60;
let timerId =null;
let oneRoundCompleted =false;
let totalCount =0;
let  paused =false;
const getTimeInSeconds=(timeString)=>{
  const[minutes,seconds]=timeString.split(":");
  return parseInt(minutes*60)+ parseInt(seconds);
}
//function to countDown
const countDown =(time)=>{
  return ()=>{
    const mins =Math.floor(time/60).toString().padStart(2,'0');
    const secs =Math.floor(time%60).toString().padStart(2,'0');
    // timer.textContent=time;
    timer.textContent =`${mins}:${secs}`;
    time--;
    if(time<0){
      stopTimer();
      if(!oneRoundCompleted){
        timerId=startTimer(BREAK_TIME);
        oneRoundCompleted=true;
        updateTitle("Its break time !")
      }
      else{
        updateTitle("completed 1 Round of Pomodoro Technique");
        setTimeout(()=>{ updateTitle("Start Timer Again")},2000)
        totalCount++;
        saveLocalCounts();
        showPomoCounts();
      }
      
    }
  }

} 
 // Function to update title 
 const updateTitle=(msg)=>{
   title.textContent=msg;
 }
 
 //Function to save pomodoro counts to local storage
  const saveLocalCounts =() =>{
    let counts=JSON.parse(localStorage.getItem("pomoCounts"));
    counts !==null ? counts++:counts=1;
    counts++;
    localStorage.setItem("promoCounts",JSON.stringify(counts))
  }
//Function to start timer
const startTimer =(startTime)=>{
  if(timerId !==null){
    stopTimer();
  }
  return setInterval(countDown(startTime),1000);
}

// function to stop Timer

const stopTimer= ()=>{
   clearInterval(timerId);
   timerId=null;
}
//Adding EventListener to reset button
resetBtn.addEventListener('click',()=>{
  stopTimer();
  timer.textContent="25:00";
  
})

//Adding EventListener to REWSUME button
resumeBtn.addEventListener('click',()=>{
  if(paused){
    const currentTime=getTimeInSeconds(timer.textContent);
    timerId=startTimer(currentTime);
    paused=false;
     (!oneRoundCompleted) ? updateTitle("Its work time "):updateTitle("Its break Time");

  }
  
  
})
//Adding EventListener to pause button
pauseBtn.addEventListener('click',()=>{
  stopTimer();
  paused=true;
  updateTitle("timer Paused !");
  
  
})

//Adding EvnetListener to start Button
startBtn.addEventListener('click',()=>{
timerId= startTimer(WORK_TIME);
updateTitle("It's Work Time !")
})

// Function to show completed pomodoros to screen from local storage 
const showPomoCounts =()=>{
  const counts = JSON.parse(localStorage.getItem("pomoCounts"));
  if(counts >0){
    pomoCountDisplay.style.display="flex";
  }
  pomoCountDisplay.firstElementChild.textContent=counts;

}
showPomoCounts();


