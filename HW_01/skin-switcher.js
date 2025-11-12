
const skins = [
    'basic.css',
    'dark.css',
    'modern.css',
];


let currentSkinIndex = 0;


const skinLinkTag = document.getElementById('skin-link');
const switchButton = document.getElementById('skin-switcher-btn');


switchButton.addEventListener('click', function() {
    

    currentSkinIndex++;


    if (currentSkinIndex >= skins.length) {
        currentSkinIndex = 0;
    }


    const newSkinFile = skins[currentSkinIndex];


    skinLinkTag.href = 'SKINS/' + newSkinFile;
});