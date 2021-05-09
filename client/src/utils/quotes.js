const inspiringQuotes = [
  {
    quote:
      "Make your life a masterpiece, imagein no limitations on what you can be, have or do.",
    author: "Brian Tracy",
  },
  {
    quote: "Be the CHANGE that you wish to see in the world.",
    author: "Mahatma Gandhi",
  },
  {
    quote: "The key to success is to start before you area ready.",
    author: "Marie Forleo",
  },
  {
    quote: "Act as if what you do makes a difference. IT DOES.",
    author: "William James",
  },
  {
    quote: "Life is a journey to be experienced, not a problem to be solved",
    author: "Winnie the Pooh",
  },
  {
    quote:
      "I am not lost, for I know where I am. But however, where I am may be lost.",
    author: "Winnie the Pooh",
  },
  {
    quote:
      "You're braver than you believe, stronger than you seem, and smarter than you think.",
    author: "Winnie the Pooh",
  },
  {
    quote:
      "As we grow up, we realize it is less important to have lots of friends and more impotant to have real ones.",
    author: "Charlie Brown",
  },
  {
    quote: "In the book of life, the answers aren't in the back.",
    author: "Charlie Brown",
  },
  {
    quote:
      "Worrying won't stop the bad stuff from happening- it just stops you from enjoying the good.",
    author: "Charlie Brown",
  },
  {
    quote: "It's hard to beat a person who never gives up.",
    author: "Babe Ruth",
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    quote:
      "All our dreams can come true, if we have the courage to pursue them.",
    author: "Walt Disney",
  },
  {
    quote: "Everything you can imagine is real.",
    author: "Pablo Picasso",
  },
  {
    quote: "Do one thing every day that scares you.",
    author: "Eleanor Roosevelt",
  },
  {
    quote: "whatever you are, be a good one.",
    author: "Abraham Lincoln",
  },
  {
    quote:
      "Smart people learn from everything and everyone, average people from their experiences, stupid people already have all the answers.",
    author: "Socrates",
  },
  {
    quote:
      "You can either experience the pain of discipline or the pain of regret. The choice is yours.",
    author: "Unknown",
  },
  {
    quote: "Impossible is just an opinion",
    author: "Paulo Coelho",
  },
];

export const fetchRandomQuote = () => {
  const min = 0;
  const max = inspiringQuotes.length - 1;
  const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
  return inspiringQuotes[randomIndex];
};
