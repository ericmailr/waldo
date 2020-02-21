
if( document.readyState !== 'loading' ) {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

const init = () => {
    const containerEl = document.getElementById('container');
    const toggleKeyLabelEl = document.getElementById('toggleKeyLabel');
    const chooseSceneLabelEl = document.getElementById('chooseSceneLabel');
    const sceneEl = document.getElementById('scene');
    const keyOptionEl = document.getElementById('keyOption');
    const keyContainerEl = document.getElementById('keyContainer');
    const scenesEl = document.getElementById('scenes');
    const spottedEl = document.getElementById('spotted');
    const identifyEl = document.getElementById('identify');
    const targetsEl = document.getElementById('targets');
    const circleEl = document.getElementById('currentCircle');
    const permCircle = `<div class='circles foundCircles'><div><div></div></div></div>`;

    const menuHeight = getComputedStyle(keyOptionEl).height;
    containerEl.style.marginTop = menuHeight;

    const scene1El = document.getElementById('scene1');
    const scene2El = document.getElementById('scene2');
    const scene3El = document.getElementById('scene3');

    const accuracyLeeway = 25;
    let currentX = 0;
    let currentY = 0;

    let startTime = new Date();
    let time = 0;
    let foundTargets = [];


    const toDuration =  (number) => {
        var sec_num = parseInt(number, 10);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) { hours = "0" + hours; }
        if (minutes < 10) { minutes = "0"+minutes; }
        if (seconds < 10) { seconds = "0"+seconds; }
        if (hours === "00") {
            return minutes + ':' + seconds;
        }
        return hours+ ':' + minutes + ':' + seconds;
    }
    
    const updateTime = () => {
       time = toDuration(Math.round((new Date() - startTime) / 1000));
       toggleKeyLabelEl.innerHTML = `Key (${time})`;
    }

    let startTimer = setInterval(updateTime, 1000);

    const toggleKeyHandler = () => {
        if (getComputedStyle(keyContainerEl).display === 'none') {
            keyContainerEl.style.display = 'flex';
            toggleKeyLabelEl.innerHTML = `Key (${time})`;
        } else {
            keyContainerEl.style.display = 'none';
            toggleKeyLabelEl.innerHTML = `Key (${time})`;
        }
    }

    const chooseSceneHandler = () => {
        if (getComputedStyle(scenesEl).display === 'none') {
            scenesEl.style.display = 'flex';
        } else {
            scenesEl.style.display = 'none';
        }
    }

    scene1El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo1.jpg';
    })

    scene2El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo2.jpg';
    })

    scene3El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo3.jpg';
    })

    toggleKeyLabelEl.addEventListener('click', toggleKeyHandler);
    keyContainerEl.addEventListener('click', toggleKeyHandler);
    chooseSceneLabelEl.addEventListener('click', chooseSceneHandler);

    const scenesElChildren = scenesEl.children;
    for (var i=0; i < scenesElChildren.length; i++) {
        scenesElChildren[i].addEventListener('click', () => {
            chooseSceneHandler();
            let checks = document.getElementsByClassName('checks');
            for (let i = 0; i < checks.length; i++) {
                checks[i].parentElement.removeChild(checks[i]);
            }
            let foundCircles = document.getElementsByClassName('foundCircles');
            for (let i = 0; i < foundCircles.length; i ++) {
                foundCircles[i].parentElement.removeChild(foundCircles[i]);
            }
            foundTargets = [];
            clearInterval(startTimer);
            startTime = new Date();
            startTimer = setInterval(updateTime, 1000);
        })
    }

    containerEl.addEventListener('click', (e) => {
        spottedEl.style.display = 'flex';
        spottedEl.style.top = e.pageY - parseInt(menuHeight) - circleEl.offsetHeight / 2 + 'px';
        spottedEl.style.left = e.pageX - circleEl.offsetWidth / 2 + 'px';
        identifyEl.style.display = 'block';
        targetsEl.style.display = 'none';
        currentX = e.pageX;
        currentY = e.pageY;
        // hide scene options if opened
        scenesEl.style.display = 'none';
    })

    identifyEl.addEventListener('click', (e) => {
        e.stopPropagation();
        identifyEl.style.display = 'none';
        targetsEl.style.display = 'block';
    })

    targetsEl.addEventListener('click', (e) => {
        e.stopPropagation();
        identifyEl.style.display = 'block';
        targetsEl.style.display = 'none';
        let targetName = e.target.innerHTML;
        if (!foundTargets.includes(targetName)) {
        fetch(`/${targetName}.json`)
            .then(function(response) {
                return response.json();
            })
            .then(function(target) {
                if(Math.abs(currentX-target.x) < accuracyLeeway && Math.abs(currentY-target.y) < accuracyLeeway) {
                    foundTargets.push(target.name);
                    keyContainerEl.insertAdjacentHTML('beforeend',`<img class='checks' src='assets/check.png'>`);
                    keyContainerEl.lastChild.style.left = target.keyX + 'px';
                    keyContainerEl.lastChild.style.top = target.keyY + 'px';
                    containerEl.insertAdjacentHTML('afterbegin', permCircle);
                    containerEl.firstChild.style.top = spottedEl.style.top;
                    containerEl.firstChild.style.left = spottedEl.style.left;
                    if (foundTargets.length === 1) {
                        toggleKeyLabelEl.innerHTML = `You found them all in ${time}!`;
                        clearInterval(startTimer);
                    } else {
                        toggleKeyLabelEl.innerHTML = `${target.name} found!`;
                        setTimeout(function(){ toggleKeyLabelEl.innerHTML = `Key (${time})`; }, 3000);
                    }
                } else {
                    toggleKeyLabelEl.innerHTML = target.name === 'Binoculars' ? `${target.name} aren't there. Try again!` : `${target.name} isn't there. Try again!`;
                    clearInterval(startTimer);
                    setTimeout( () => {
                        startTimer = setInterval(updateTime, 1000);
                        updateTime();
                        toggleKeyLabelEl.innerHTML = `Key (${time})`; 
                    }, 3000);
                }
            });
        } else {
            toggleKeyLabelEl.innerHTML = ['Waldo','Wenda','Woof','Odlaw','Whitebeard'].includes(targetName) ? `You already found ${targetName}!` : `You already found the ${targetName}`;
            setTimeout(function(){ toggleKeyLabelEl.innerHTML = `Key (${time})`; }, 3000);
        }
    })
}
