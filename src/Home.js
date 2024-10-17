import { useEffect, useState } from "react";

const NewGame = () => {
  const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    )
  }

  const choices = ['rock', 'paper', 'scissors'];

  const [isLoading, setIsLoading] = useState(true);
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');
  const [gameStarted, setGameStarted] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleClick = (choice) => {
    setUserChoice(choice);
    const random = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(random);
    determineWinner(choice, random);
    setGameStarted(false);
  }

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a tie!");
    } else if (
      (user === 'rock' && computer === 'scissors') ||
      (user === 'scissors' && computer === 'paper') ||
      (user === 'paper' && computer === 'rock')
    ) {
      setResult('You win!');
    } else {
      setResult('You lose!');
    }

    setTimeout(resetGame, 2000);
  }

  const resetGame = () => {
    setUserChoice('');
    setComputerChoice('');
    setResult('');
    setGameStarted(true);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center h-screen bg-sky-100 m-0 p-0">
      <h1 className="text-5xl border-x-8-solid p-11 mb-10 text-white font-Ruge-Boogie border-b-1 bg-gradient-to-r from-sky-500 to-indigo-500 border-gray-300 shadow-md w-full text-center">Rock, Paper, Scissors</h1>
      <div className="bg-card dark:bg-card-foreground text-card-foreground dark:text-card p-6 rounded-lg shadow-lg">
      <div className="flex space-x-4 justify-center mt-20">
        {choices.map((choice) => (
          <button
            key={choice}
            onClick={() => handleClick(choice)}
            className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-white hover:text-black transition ${!gameStarted ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={!gameStarted}
          >
            {choice.charAt(0).toUpperCase() + choice.slice(1)}
          </button>
        ))}
      </div>
      <div className="mt-6 text-xl font-Ubuntu">
        <p>You chose: <span className=" text-cyan-700 ">{userChoice}</span></p>
        <p>Computer chose: <span className=" text-cyan-700">{computerChoice}</span></p>
        <p className="font-bold mt-4">{result}</p>
      </div>
      </div>
    </div>
  );
}

export default NewGame;