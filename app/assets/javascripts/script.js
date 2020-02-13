
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
    const circleEl = document.getElementById('circle');

    containerEl.style.paddingTop = keyLabelEl.clientHeight + 'px';
    keyEl.style.display = 'none';
    menuScenesEl.style.display = 'none';

    const scene1El = document.getElementById('scene1');
    //
    const scene2El = document.getElementById('scene2');
    //waldo: 2100 665
    const scene3El = document.getElementById('scene3');
    //

    const setContainerDimensions = () => {
        containerEl.style.width = sceneEl.clientWidth + 'px';
        containerEl.style.height = sceneEl.clientHeight + 'px';
        console.log(containerEl.style.width);
    }

    setContainerDimensions();

    scene1El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo1.jpg';
        setContainerDimensions();
    })

    scene2El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo2.jpg';
        setContainerDimensions();
    })

    scene3El.addEventListener('click', () => {
        sceneEl.src = 'assets/waldo3.jpg';
        setContainerDimensions();
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
    sceneEl.addEventListener('click', (e) => {
        circleEl.style.display = 'block';
        circleEl.style.top = e.pageY - 55 + 'px';
        circleEl.style.left = e.pageX - 55 + 'px';

    })
}
