//1. 랜덤번호 지정
//2. 유저가 번호를 입력한다. go라는 버튼을 누름
//3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//4. 랜덤번호가 < 유저번호 Down!!
//4. 랜덤번호가 > 유저번호 up!!
//5. Rest 버튼을 누르면 게임이 리셋된다
//6. 5번의 기회를 다 쓰면 게임이 끝난다.(더이상 추측 불가, 버튼이 disable)
//7. 유저가 1~100범위 밖에 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
//7. 유저가 이미 입력한 숫자를 또 입력하면, 기회를 깍지 않는다.

let num = 0;
let userInput = document.querySelector('.user-input');
let playBtn = document.querySelector('.play-btn');
let resetButton = document.querySelector('.reset-btn');
let txt = document.querySelector('.txt');
let life = 5;
let history = [];
let gameOver = false;
let lifeArea = document.querySelector('.life-area');
playBtn.addEventListener('click', play);
resetButton.addEventListener('click', resetBt)
userInput.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        play(e);
    }
})
function play(){
    let userValue = userInput.value;
    if(userValue == ''){
        txt.textContent = '숫자를 입력해주세요 '
        return;
    } else if (userValue < 1 || userValue > 100){
        txt.textContent = '범위를 벗어나셨습니다.'
        return;
    }
    if(history.includes(userValue)){
        txt.textContent = '이미 입력된 숫자입니다.'
        return;
    }
    if(userValue < num){
        txt.textContent = 'UP!!'
    } else if (userValue > num){
        txt.textContent = 'DOWN!!'
    } else {
        txt.textContent = '정답!!'
        gameOver = true;
    }
    history.push(userValue);
    life--;
    lifeArea.textContent = `남은 횟수 : ${life}번`;
    if(life < 1){
        gameOver = true;
        lifeArea.textContent = `남은 횟수가 없습니다. 처음으로`;
    }
    if(gameOver == true){
        playBtn.disabled = true;
    }
    userInput.value = '';
}



randomNum = ()=>{
    num = Math.floor(Math.random()*100 + 1);
    console.log(`정답은 ${num}`)
}

function resetBt(){
    randomNum();
    userInput.value = '';
    life = 5;
    txt.textContent = '1~100 사이 숫자를 입력해주세요'
    lifeArea.textContent = `남은 횟수 : ${life}번`;
    playBtn.disabled = false;
    gameOver = false;
}

randomNum();
