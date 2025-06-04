const main = document.querySelector('main'); // Main container for speech boxes
const voicesSelect = document.getElementById('voices'); // Dropdown for selecting voices
const textarea = document.getElementById('text'); // Textarea for custom text input
const readBtn = document.getElementById('read'); // Button to read the text in textarea
const toggleBtn = document.getElementById('toggle'); // Button to toggle the text box visibility
const closeBtn = document.getElementById('close'); // Button to close the text box

// Speech synthesis setup
const data = [
    {
        image: './img/drink.jpg',
        text: "I'm thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm hungry"
    },
    {
        image: './img/happy.jpg',
        text: "I'm happy"
    },
    {
        image: './img/sad.jpg',
        text: "I'm sad"
    },
    {
        image: './img/angry.jpg',
        text: "I'm angry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm hurt"
    },
    {
        image: './img/scared.jpg',
        text: "I'm scared"
    },
    {
        image: './img/home.jpg',
        text: "I want to go home"
    },
    {
        image: './img/school.jpg',
        text: "I want to go to school"
    },
    {
        image: './img/play.jpg',
        text: "Let's play together"
    },
    {
        image: './img/heart.jpg',
        text: "I love you"
    },
];

// Create speech boxes for each item in data
data.forEach(createBox);

// Create speech boxes
function createBox(item) {
    const box = document.createElement('div');

    const { image, text } = item;

    box.classList.add('box');
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="info">${text}</p>
    `;

    // Add click event to speak the text
    box.addEventListener('click', () => {
        setTextMessage(text);
        speakText();

        // Add active effect
        box.classList.add('active');
        setTimeout(() => box.classList.remove('active'), 800);
    });

    // Append the box to the main container
    main.appendChild(box);
}

//Init speech synthesis
const message = new SpeechSynthesisUtterance();

// Store voices
let voices = [];

// Get available voices
function getVoices() {
    voices = speechSynthesis.getVoices();

    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} (${voice.lang})`;
        voicesSelect.appendChild(option);
    });
}

// Set text message
function setTextMessage(text) {
    message.text = text;
}

// Speak text message
function speakText() {
    speechSynthesis.speak(message);
}

// Set voice
function setVoice(e) {
    message.voice = voices.find(voice => voice.name === e.target.value);
}

// Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices);

// Toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Close button
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// Change voice
voicesSelect.addEventListener('change', setVoice);

// Read text button
readBtn.addEventListener('click', () => {
    setTextMessage(textarea.value);
    speakText();
});

// Initial call to populate voices
getVoices();