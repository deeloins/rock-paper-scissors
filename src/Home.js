import { useEffect, useState } from "react";
const rockImage = '/images/rock.png';
const paperImage = '/images/paper.png';
const scissorsImage = '/images/scissors.png';

const NewGame = () => {
  const LoadingSpinner = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  };

  const choices = [
    { name: "rock", image: rockImage },
    { name: "paper", image: paperImage },
    { name: "scissors", image: scissorsImage },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [userChoice, setUserChoice] = useState(null); // will hold choice object
  const [computerChoice, setComputerChoice] = useState(null); // will hold choice object
  const [result, setResult] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [gamesToPlay, setGamesToPlay] = useState(3);
  const [gamesRemaining, setGamesRemaining] = useState(gamesToPlay);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [buttonsDisabled, setButtonsDisabled] = useState(false); // Disable buttons after each selection
  const [showRestart, setShowRestart] = useState(false); // Show restart button after series

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const handleClick = (choice) => {
    if (!gameStarted || gamesRemaining === 0 || buttonsDisabled) return;

    setUserChoice(choice);
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
    determineWinner(choice.name, randomChoice.name);

    setButtonsDisabled(true); // Disable buttons after a choice
    setTimeout(() => setButtonsDisabled(false), 2000); // Re-enable buttons after 2 seconds
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      setResult("It's a tie!");
    } else if (
      (user === "rock" && computer === "scissors") ||
      (user === "scissors" && computer === "paper") ||
      (user === "paper" && computer === "rock")
    ) {
      setResult("You win!");
      setTotalWins((prevWins) => prevWins + 1);
    } else {
      setResult("You lose!");
      setTotalLosses((prevLosses) => prevLosses + 1);
    }

    setGamesRemaining((prevGames) => prevGames - 1);

    if (gamesRemaining === 1) {
      setShowRestart(true); // Show restart button after last game
    }
  };

  const resetGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  const startGame = () => {
    setGameStarted(true);
    setGamesRemaining(gamesToPlay);
    setTotalWins(0);
    setTotalLosses(0);
    setShowRestart(false); // Hide restart button when starting new game
  };

  const handleRestart = () => {
    setGameStarted(false); // Return to game setup (round selection)
    setGamesRemaining(gamesToPlay);
    setUserChoice(null);
    setComputerChoice(null);
    setResult("");
    setTotalWins(0);
    setTotalLosses(0);
    setShowRestart(false); // Hide restart button
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-sky-100 m-0 p-0">
      <h1 className="text-5xl border-x-8-solid p-11 mb-10 text-white font-Ruge-Boogie border-b-1 bg-gradient-to-r from-sky-500 to-indigo-500 border-gray-300 shadow-md w-full text-center">
        Rock, Paper, Scissors
      </h1>

      {!gameStarted ? (
        <div className="mb-8">
          <label className="text-lg">How many games would you like to play?</label>
          <select
            value={gamesToPlay}
            onChange={(e) => setGamesToPlay(parseInt(e.target.value))}
            className="bg-white text-black px-4 py-2 rounded shadow ml-4"
          >
            {[3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} games
              </option>
            ))}
          </select>
          <button
            onClick={startGame}
            className="bg-cyan-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 ml-4"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="bg-card dark:bg-card-foreground text-card-foreground dark:text-card p-6 rounded-lg shadow-lg">
          <div className="flex space-x-8 justify-center mt-20">
            {choices.map((choice) => (
              <button
                key={choice.name}
                onClick={() => handleClick(choice)}
                className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-white hover:text-black transition ${
                  !gameStarted || gamesRemaining === 0 || buttonsDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!gameStarted || gamesRemaining === 0 || buttonsDisabled}
              >
                <img src={choice.image} alt={choice.name} className="h-20 w-20 object-contain" />
              </button>
            ))}
          </div>
          <div className="mt-6 text-xl font-Ubuntu">
            {userChoice && (
              <>
                <p>You chose:</p>
                <img src={userChoice.image} alt={userChoice.name} className="h-20 w-20 mx-auto mt-2" />
              </>
            )}
            {computerChoice && (
              <>
                <p>Computer chose:</p>
                <img src={computerChoice.image} alt={computerChoice.name} className="h-20 w-20 mx-auto mt-2" />
              </>
            )}
            <p className="font-bold mt-4">{result}</p>
            <p>Games remaining: {gamesRemaining}</p>
            <p>Total Wins: {totalWins}</p>
            <p>Total Losses: {totalLosses}</p>
          </div>

          {showRestart && (
            <div className="mt-8">
              <button
                onClick={handleRestart}
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-700"
              >
                Restart Game
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NewGame;
