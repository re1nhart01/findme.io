export const CONSTANTS = {
  earthRadius: 6371,
  numberOfSeconds: 10,
  countOfNums: 4,
  headerMaxValue: 390,
  matchesNumOfColumns: 2,
};

export const gendersList = [
  'Male',
  'Female',
  'Other',
];

export const moodList = [
  'Here to date 😺',
  'Open to chat 📣',
  'Ready for relationship 💑',
  'In search of incredible 🌍',
  'Into hardworking stuff 🧑‍💼',
  'Reject modernity, embrace masculinity 🦾',
];

export const relationsList = [
  'Single',
  'Taken',
  "It's complicated",
  'Open',
  'I`d rather not say',
];

export const InterestsList = [
  {
    id: 1,
    label: '📷   Photography',
    value: 1,
  },
  {
    id: 2,
    label: '🛍️    Shopping',
    value: 2,
  },
  {
    id: 3,
    label: '🎙️    Karaoke',
    value: 3,
  },
  {
    id: 4,
    label: '🧘‍♀️    Yoga',
    value: 4,
  },
  {
    id: 5,
    label: '🍪    Cooking',
    value: 5,
  },
  {
    id: 6,
    label: '🎾    Tennis',
    value: 6,
  },
  {
    id: 7,
    label: '👟    Run',
    value: 7,
  },
  {
    id: 8,
    label: '🏊    Swimming',
    value: 8,
  },
  {
    id: 9,
    label: '🎨    Art',
    value: 9,
  },
  {
    id: 10,
    label: '🌆    Traveling',
    value: 10,
  },
  {
    id: 11,
    label: '🥾    Extreme',
    value: 11,
  },
  {
    id: 12,
    label: '🎵    Music',
    value: 12,
  },
  {
    id: 13,
    label: '🍹    Drink',
    value: 13,
  },
  {
    id: 14,
    label: '🎮    Games',
    value: 14,
  },

];

export const firebase_base_url = (bucketId: string) => {
  // https://firebasestorage.googleapis.com/v0/b/musicdesktop-15d99.appspot.com/o/6c20d90d8f63dd8a64acbfb7264b7a2c06b2632b.jpg?alt=media
  // return `https://firebasestorage.googleapis.com/v0/b/musicdesktop-15d99.appspot.com/o/${bucketId}?alt=media`;
  return bucketId;
};
