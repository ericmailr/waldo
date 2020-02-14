
if( document.readyState !== 'loading' ) {
    init();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        init();
    });
}

const init = () => {
    const containerEl = document.getElementById('container');
    const keyLabelEl = document.getElementById('toggleKeyLabel');
    const sceneEl = document.getElementById('scene');
    const keyEl = document.getElementById('key');
    const keyOptionEl = document.getElementById('keyOption');
    const toggleKeyLabelEl = document.getElementById('toggleKeyLabel');
    const sceneOptionEl = document.getElementById('sceneOption');
    const menuScenesEl = document.getElementById('menuScenes');
    const spottedEl = document.getElementById('spotted');
    const identifyEl = document.getElementById('identify');
    const charactersEl = document.getElementById('characters');

    containerEl.style.paddingTop = keyLabelEl.clientHeight + 'px';
    keyEl.style.display = 'none';
    menuScenesEl.style.display = 'none';

    let currentX = 0;
    let currentY = 0;

    const scene1El = document.getElementById('scene1');
    //waldo: 2555 1385
    //wenda: 3040 475
    //woof: 1326 1641
    //odlaw: 3266 1250
    //wizard whitebeard: 359 1471
    //scroll: 2908 2071
    //camera: 780 1481
    //key: 1101 1478
    //binoculars: 1538 1933
    //bone: 2652 974
    const scene2El = document.getElementById('scene2');
    //waldo: 2100 665
    const scene3El = document.getElementById('scene3');
    //

    scene1El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo1.jpg';
    })

    scene2El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo2.jpg';
    })

    scene3El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo3.jpg';
    })

    const toggleKeyHandler = () => {
        if (keyEl.style.display === 'none') {
            keyEl.style.display = 'flex';
            toggleKeyLabelEl.innerHTML = 'Hide Key';
        } else {
            keyEl.style.display = 'none';
            toggleKeyLabelEl.innerHTML = 'Show Key';
        }
    }

    const toggleScenesHandler = () => {
        if (menuScenesEl.style.display === 'none') {
            menuScenesEl.style.display = 'flex';
        } else {
            menuScenesEl.style.display = 'none';
        }
    }

    sceneOptionEl.addEventListener('click', toggleScenesHandler)
    keyOptionEl.addEventListener('click', toggleKeyHandler) 
    containerEl.addEventListener('click', (e) => {
        spottedEl.style.display = 'flex';
        spottedEl.style.top = e.pageY - 55 + 'px';
        spottedEl.style.left = e.pageX - 55 + 'px';
        identifyEl.style.display = 'block';
        charactersEl.style.display = 'none';
    })

    identifyEl.addEventListener('click', (e) => {
        e.stopPropagation();
        identifyEl.style.display = 'none';
        charactersEl.style.display = 'block';
        console.log('it worked');
    })

    charactersEl.addEventListener('click', (e) => {
        e.stopPropagation();
        identifyEl.style.display = 'block';
        charactersEl.style.display = 'none';
        console.log(e.target.innerHTML);
        // is it within 30px of e.target.innerHTML
    })

}
