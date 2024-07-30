import { Results } from "../../../shared/types";
import { primaryButton } from "../styles";

export const ShowResults = ({ evaluation }: { evaluation: Results }) => {
  const { correctWords, wrongWords, correctLetters, wrongLetters } = evaluation;
  return (
    <div>
      <p>
        {correctWords} correct words, {wrongWords} wrong
        words
      </p>
      <p>
        {correctLetters} correct letters, {wrongLetters} wrong letters
      </p>
      <button
        onClick={() => window.open('https://airtable.com/appKt0Zoe7tx4IWk9/pagVcorRDWGpxiUeK/form', '_blank')}
        className={`${primaryButton} ${wrongWords > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={wrongWords > 0}
      >
        Submit Clue for next crossword!
      </button>
      <p>
        Get all answers correct to submit a clue for the next crossword.
      </p>
    </div>
  );
};

// return `${evaluation.correctWords} correct words, ${evaluation.wrongWords} wrong words, ${evaluation.correctLetters} correct letters, ${evaluation.wrongLetters} wrong letters`;
