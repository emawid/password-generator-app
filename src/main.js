'use strict';

//Function to handle slider background
const slider = document.querySelector('#slider');
const characterLength = document.querySelector('#output-character-length');

const strengthDefinitions = [
  {
    criterias: 1,
    label: 'TOO WEAK!',
  },
  {
    criterias: 2,
    label: 'WEAK',
  },
  {
    criterias: 3,
    label: 'MEDIUM',
  },
  {
    criterias: 4,
    label: 'STRONG',
  },
];

const updateSliderBackground = () => {
  const value = slider.value;
  const min = slider.min || 0;
  const max = slider.max || 100;

  const percentage = ((value - min) / (max - min)) * 100;

  slider.style.background = `linear-gradient(
    to right,
    var(--color-green-200) 0%,
    var(--color-green-200) ${percentage}%,
    var(--color-grey-850) ${percentage}%,
    var(--color-grey-850) 100%
  )`;

  characterLength.textContent = value;
};

slider.addEventListener('input', updateSliderBackground);

updateSliderBackground();

//Helper function to generate random number

function getRandomInteger(min, max) {
  // Ensure min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Password generator function

const generateButton = document.querySelector('#generate-button');

const generatePassword = () => {
  let characterString = '';

  //Grab the password length
  const numberOfCharacters = document.querySelector('#slider').value;

  //Grab the password criterias
  const includeUpperCase = document.querySelector('#upper-case').checked;
  const includeLowerCase = document.querySelector('#lower-case').checked;
  const includeNumbers = document.querySelector('#numbers').checked;
  const includeSymbols = document.querySelector('#symbols').checked;

  //Characters to create password from

  const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
  const myNumbers = '0123456789';
  const mySymbols = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';

  //Concatenate password criterias

  //if includeUpperCase = true append upperCaseLetters to characterString

  const criteria = [
    { include: includeUpperCase, characters: upperCase },
    { include: includeLowerCase, characters: lowerCase },
    { include: includeNumbers, characters: myNumbers },
    { include: includeSymbols, characters: mySymbols },
  ];

  //count the number of true criterias to pass as parameter into the passwordStrength() function

  const countTrueCriteria = criteria =>
    criteria.filter(criterion => criterion.include).length;

  const trueCriteria = countTrueCriteria(criteria);

  criteria.forEach(criterion => {
    if (criterion.include) {
      characterString = characterString.concat(criterion.characters);
    }
  });

  //User input validation if characterString is empty

  if (characterString === '') {
    alert('Please select at least one character type.');
    return;
  }

  let myPassword = '';

  let randomCharacterIndex = getRandomInteger(0, characterString.length - 1);

  for (let i = 0; i < numberOfCharacters; i++) {
    randomCharacterIndex = getRandomInteger(0, characterString.length - 1);
    myPassword = myPassword.concat(characterString[randomCharacterIndex]);
  }

  //Render the password to the DOM
  const passwordContainer = document.querySelector('#output-password');
  passwordContainer.textContent = myPassword;
  passwordContainer.style.color = 'var(--color-grey-200';

  //Render correct label to strength

  const strengthLabel = passwordStrength(strengthDefinitions, trueCriteria);
  console.log(strengthLabel);

  document.querySelector('.password-strength p').textContent = strengthLabel;

  //Render correct color to strength bars
  const strengthBars = document.querySelectorAll('.strength-bar');

  //Reset style for all bars for situations where user re-generates a password
  strengthBars.forEach(bar => (bar.style = 'initial'));

  //Apply the correct background color and remove border for bars
  strengthBars.forEach((bar, i) => {
    if (i < trueCriteria) {
      bar.style.backgroundColor = 'var(--color-yellow-300)';
      bar.style.border = 'none';
    }
  });
};

//eventhandler

generateButton.addEventListener('click', generatePassword);

function passwordStrength(strengthDefinitions, numberOfCriterias) {
  const definition = strengthDefinitions.find(
    definition => numberOfCriterias === definition.criterias
  );
  console.log(numberOfCriterias);
  return definition.label;
}

//Copy password to clipboard

const copyIcon = document.querySelector('#copy-icon');
const outputPassword = document.querySelector('#output-password');

function copyPassword() {
  const password = outputPassword.textContent;
  navigator.clipboard.writeText(password).then(() => {
    const outputMessage = document.querySelector('#output-message');
    outputMessage.textContent = 'COPIED';

    setTimeout(() => {
      outputMessage.textContent = '';
    }, 2000);
  });
}

copyIcon.addEventListener('click', copyPassword);

const myName = 'Emanuel';

console.log(myName.length);
