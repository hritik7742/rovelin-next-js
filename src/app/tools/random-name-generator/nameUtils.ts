// Import only the types we need
import { NameData } from './types';

// Type definitions for rules and formatting
interface NameRule {
  minLength: number;
  maxLength: number;
  allowedCharacters: RegExp;
}

interface NameFormat {
  capitalization: 'first_letter' | 'all_caps' | 'all_lower';
}

// Basic validation rules
const nameRules: Record<string, NameRule> = {
  global: {
    minLength: 2,
    maxLength: 50,
    allowedCharacters: /^[A-Za-zÀ-ÿ\s\-']+$/
  }
};

// Basic formatting rules
const nameFormatting: Record<string, NameFormat> = {
  global: {
    capitalization: 'first_letter'
  }
};

// Base name data for general styles
const nameData: NameData = {
  modern: {
    male: [
      'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Joseph', 'Thomas', 'Charles', 'Daniel',
      'Matthew', 'Anthony', 'Christopher', 'Steven', 'Andrew', 'Kevin', 'Brian', 'George', 'Edward', 'Ronald'
    ],
    female: [
      'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
      'Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Mia', 'Charlotte', 'Amelia', 'Harper', 'Evelyn'
    ],
    neutral: ['Alex', 'Jordan', 'Taylor', 'Sam', 'Chris', 'Morgan', 'Casey', 'Riley', 'Sage', 'Quinn']
  },
  fantasy: {
    male: [
      'Thorin', 'Aragorn', 'Legolas', 'Gandalf', 'Elrond', 'Faramir', 'Boromir', 'Thranduil', 'Celeborn', 'Glorfindel',
      'Merlin', 'Arthur', 'Lancelot', 'Galahad', 'Percival', 'Tristan', 'Gawain', 'Roland', 'Cedric', 'Magnus'
    ],
    female: [
      'Galadriel', 'Arwen', 'Eowyn', 'Celebrian', 'Luthien', 'Tauriel', 'Morwen', 'Idril', 'Nienna', 'Varda',
      'Morgana', 'Guinevere', 'Isolde', 'Nimue', 'Vivian', 'Elaine', 'Igraine', 'Lyra', 'Freya', 'Circe'
    ],
    neutral: ['Ainur', 'Eldarin', 'Silmaril', 'Teleri', 'Vanyar', 'Maiar', 'Valar', 'Istari', 'Edain', 'Dunedain']
  },
  'sci-fi': {
    male: [
      'Zephyr', 'Nova', 'Orion', 'Atlas', 'Phoenix', 'Cyrus', 'Neo', 'Zenith', 'Quantum', 'Vector',
      'Helios', 'Theron', 'Caspian', 'Draco', 'Sirius', 'Rigel', 'Altair', 'Cygnus', 'Lyra', 'Perseus'
    ],
    female: [
      'Luna', 'Aurora', 'Stella', 'Nova', 'Celeste', 'Astrid', 'Lyra', 'Vega', 'Andromeda', 'Cassiopeia',
      'Astra', 'Nebula', 'Carina', 'Phoenix', 'Selene', 'Calypso', 'Io', 'Nova', 'Phoebe', 'Rhea'
    ],
    neutral: ['Nebula', 'Cosmos', 'Galaxy', 'Quasar', 'Stellar', 'Astra', 'Orbit', 'Pulsar', 'Nova', 'Zenith']
  },
  ancient: {
    male: [
      'Augustus', 'Marcus', 'Julius', 'Alexander', 'Leonidas', 'Ptolemy', 'Theseus', 'Perseus', 'Achilles', 'Hercules',
      'Odysseus', 'Ajax', 'Hector', 'Paris', 'Agamemnon', 'Orpheus', 'Atlas', 'Darius', 'Cyrus', 'Xerxes'
    ],
    female: [
      'Helena', 'Cleopatra', 'Athena', 'Artemis', 'Persephone', 'Cassandra', 'Penelope', 'Andromeda', 'Circe', 'Medea',
      'Helen', 'Iris', 'Hera', 'Demeter', 'Aphrodite', 'Calliope', 'Daphne', 'Echo', 'Thalia', 'Clio'
    ],
    neutral: ['Phoenix', 'Oracle', 'Sage', 'Chronos', 'Atlas', 'Nike', 'Nemesis', 'Thanatos', 'Chaos', 'Eros']
  },
  cute: {
    male: [
      'Buddy', 'Charlie', 'Lucky', 'Teddy', 'Ollie', 'Milo', 'Leo', 'Finn', 'Ziggy', 'Pip',
      'Coco', 'Biscuit', 'Peanut', 'Gizmo', 'Jasper', 'Toby', 'Remy', 'Louie', 'Percy', 'Rudy'
    ],
    female: [
      'Lily', 'Daisy', 'Rosie', 'Bella', 'Luna', 'Molly', 'Sophie', 'Ruby', 'Lucy', 'Penny',
      'Poppy', 'Maisie', 'Willow', 'Chloe', 'Sadie', 'Millie', 'Pixie', 'Gracie', 'Lola', 'Winnie'
    ],
    neutral: ['Cookie', 'Sunny', 'Angel', 'Sparkle', 'Bubble', 'Ziggy', 'Pepper', 'Sugar', 'Honey', 'Berry']
  }
};

// Country-specific name data
const countryNames: NameData = {
  indian: {
    male: [
      'Aarav', 'Vihaan', 'Arjun', 'Krishna', 'Aditya', 'Rohan', 'Vivaan', 'Shaurya', 'Dhruv', 'Ishaan',
      'Kabir', 'Aryan', 'Reyansh', 'Veer', 'Sai', 'Pranav', 'Advait', 'Atharv', 'Dev', 'Rudra'
    ],
    female: [
      'Aanya', 'Diya', 'Saanvi', 'Myra', 'Aadhya', 'Aaradhya', 'Ananya', 'Pari', 'Avni', 'Kiara',
      'Zara', 'Anika', 'Navya', 'Riya', 'Ira', 'Disha', 'Aria', 'Sara', 'Kyra', 'Maya'
    ],
    neutral: ['Kiran', 'Akash', 'Jyoti']
  },
  chinese: {
    male: [
      'Wei', 'Ming', 'Hui', 'Jian', 'Chen', 'Lei', 'Yang', 'Feng', 'Jun', 'Xiang',
      'Tao', 'Kai', 'Ying', 'Cheng', 'Hong', 'Jie', 'Bin', 'Gang', 'Hao', 'Long'
    ],
    female: [
      'Mei', 'Ling', 'Xia', 'Hui', 'Juan', 'Yan', 'Qing', 'Zhen', 'Yi', 'Jing',
      'Fang', 'Hong', 'Wei', 'Min', 'Lan', 'Hua', 'Xue', 'Yu', 'Ping', 'Na'
    ],
    neutral: ['Jie', 'Yu', 'Xin']
  },
  japanese: {
    male: [
      'Hiroto', 'Yuto', 'Haruto', 'Sota', 'Yuki', 'Kento', 'Riku', 'Kenji', 'Daiki', 'Akira',
      'Kaito', 'Takumi', 'Sora', 'Ryota', 'Yuma', 'Kenta', 'Hayato', 'Yusei', 'Ryuki', 'Shota'
    ],
    female: [
      'Yui', 'Hina', 'Sakura', 'Mio', 'Aoi', 'Rin', 'Akari', 'Yuna', 'Saki', 'Koharu',
      'Mei', 'Miyu', 'Yuna', 'Hana', 'Riko', 'Yuka', 'Nanami', 'Ayaka', 'Hinata', 'Yui'
    ],
    neutral: ['Kaoru', 'Hikaru', 'Makoto']
  },
  korean: {
    male: [
      'Min-jun', 'Seo-jun', 'Do-yoon', 'Ji-ho', 'Joon-ho', 'Hyun-woo', 'Tae-hyung', 'Seung-ho', 'Ji-won', 'Min-seok'
    ],
    female: [
      'Seo-yeon', 'Ji-woo', 'Min-seo', 'Ha-yoon', 'Eun-ji', 'Ye-jin', 'Ji-eun', 'Soo-jin', 'Hye-jin', 'Min-ji'
    ],
    neutral: ['Ji-yu', 'Joon', 'Hyun']
  },
  arabic: {
    male: [
      'Mohammed', 'Ahmad', 'Ali', 'Hassan', 'Ibrahim', 'Omar', 'Yusuf', 'Khalid', 'Samir', 'Tariq'
    ],
    female: [
      'Fatima', 'Aisha', 'Noor', 'Layla', 'Zainab', 'Maryam', 'Amira', 'Rania', 'Hana', 'Sara'
    ],
    neutral: ['Nour', 'Salam', 'Karim']
  },
  russian: {
    male: [
      'Alexander', 'Dmitri', 'Ivan', 'Mikhail', 'Nikolai', 'Pavel', 'Sergei', 'Vladimir', 'Yuri', 'Boris'
    ],
    female: [
      'Anastasia', 'Ekaterina', 'Maria', 'Natalia', 'Olga', 'Svetlana', 'Tatiana', 'Valentina', 'Yelena', 'Anna'
    ],
    neutral: ['Sasha', 'Zhenya', 'Valya']
  },
  greek: {
    male: [
      'Andreas', 'Christos', 'Dimitris', 'Georgios', 'Ioannis', 'Konstantinos', 'Nikolaos', 'Panagiotis', 'Stavros', 'Theodoros'
    ],
    female: [
      'Aikaterini', 'Eleni', 'Georgia', 'Irini', 'Maria', 'Panagiota', 'Sofia', 'Vasiliki', 'Zoi', 'Christina'
    ],
    neutral: ['Alexis', 'Artemis', 'Nikitas']
  },
  italian: {
    male: [
      'Alessandro', 'Francesco', 'Giuseppe', 'Lorenzo', 'Marco', 'Matteo', 'Paolo', 'Roberto', 'Stefano', 'Vincenzo'
    ],
    female: [
      'Alessandra', 'Chiara', 'Francesca', 'Giovanna', 'Laura', 'Maria', 'Paola', 'Rosa', 'Sofia', 'Valentina'
    ],
    neutral: ['Andrea', 'Elia', 'Luca']
  },
  german: {
    male: [
      'Alexander', 'Christian', 'Daniel', 'Felix', 'Jonas', 'Lukas', 'Maximilian', 'Niklas', 'Sebastian', 'Thomas'
    ],
    female: [
      'Anna', 'Emma', 'Hannah', 'Julia', 'Katharina', 'Laura', 'Lena', 'Marie', 'Sarah', 'Sophie'
    ],
    neutral: ['Kim', 'Robin', 'Sascha']
  },
  swedish: {
    male: [
      'Erik', 'Gustav', 'Johan', 'Karl', 'Lars', 'Magnus', 'Nils', 'Oscar', 'Per', 'Sven'
    ],
    female: [
      'Anna', 'Astrid', 'Emma', 'Eva', 'Hanna', 'Ingrid', 'Karin', 'Maria', 'Sara', 'Sofia'
    ],
    neutral: ['Love', 'Kim', 'Alex']
  },
  brazilian: {
    male: [
      'Antonio', 'Carlos', 'Francisco', 'João', 'José', 'Lucas', 'Miguel', 'Paulo', 'Pedro', 'Rafael'
    ],
    female: [
      'Ana', 'Beatriz', 'Carolina', 'Gabriela', 'Julia', 'Larissa', 'Maria', 'Mariana', 'Sofia', 'Victoria'
    ],
    neutral: ['Ariel', 'Dani', 'Sasha']
  },
  vietnamese: {
    male: [
      'An', 'Dung', 'Hung', 'Huy', 'Long', 'Minh', 'Quan', 'Tai', 'Thanh', 'Tuan'
    ],
    female: [
      'Anh', 'Chi', 'Hoa', 'Huong', 'Lan', 'Mai', 'Nga', 'Thanh', 'Trang', 'Van'
    ],
    neutral: ['Binh', 'Linh', 'Kim']
  },
  spanish: {
    male: [
      'Alejandro', 'Mateo', 'Santiago', 'Diego', 'Lucas', 'Daniel', 'Gabriel', 'Adrian', 'Pablo', 'Miguel',
      'David', 'Hugo', 'Martin', 'Javier', 'Leo', 'Alvaro', 'Carlos', 'Marco', 'Alex', 'Victor'
    ],
    female: [
      'Sofia', 'Isabella', 'Valentina', 'Camila', 'Lucia', 'Elena', 'Victoria', 'Gabriela', 'Ana', 'Carmen',
      'Maria', 'Paula', 'Sara', 'Daniela', 'Alba', 'Julia', 'Noa', 'Emma', 'Martina', 'Carla'
    ],
    neutral: ['Angel', 'Cruz', 'Guadalupe']
  },
  french: {
    male: [
      'Lucas', 'Louis', 'Gabriel', 'Jules', 'Hugo', 'Arthur', 'Nathan', 'Thomas', 'Adam', 'Leo',
      'Paul', 'Raphael', 'Louis', 'Mathis', 'Jules', 'Victor', 'Noah', 'Ethan', 'Theo', 'Tom'
    ],
    female: [
      'Emma', 'Louise', 'Alice', 'Chloe', 'Inès', 'Léa', 'Manon', 'Lina', 'Rose', 'Anna',
      'Jade', 'Louise', 'Lena', 'Mila', 'Sarah', 'Julia', 'Lou', 'Eva', 'Nina', 'Zoe'
    ],
    neutral: ['Dominique', 'Claude', 'Camille']
  }
};

// Combine all name data
const allNameData = {
  ...nameData,
  ...countryNames
};

// Name generation function
export const generateName = (style: string, gender: string): string => {
  const styleNames = allNameData[style as keyof typeof allNameData];
  const genderNames = styleNames[gender as keyof typeof styleNames];
  const randomIndex = Math.floor(Math.random() * genderNames.length);
  return genderNames[randomIndex];
};

// Validation functions
export const validateName = (name: string, style: string, gender: string): boolean => {
  const rules = nameRules[style as keyof typeof nameRules] || nameRules.global;
  const styleNames = allNameData[style as keyof typeof allNameData];
  const genderNames = styleNames?.[gender as keyof typeof styleNames] || [];
  
  return (
    name.length >= rules.minLength &&
    name.length <= rules.maxLength &&
    rules.allowedCharacters.test(name) &&
    genderNames.includes(name)
  );
};

// Format name according to cultural rules
export const formatName = (name: string, style: string): string => {
  const format = nameFormatting[style as keyof typeof nameFormatting] || nameFormatting.global;
  let formattedName = name.trim();
  
  if (format.capitalization === 'first_letter') {
    formattedName = formattedName.charAt(0).toUpperCase() + formattedName.slice(1).toLowerCase();
  }
  
  return formattedName;
}; 