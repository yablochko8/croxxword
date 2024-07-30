import { Results } from "../../../shared/types";
import { primaryButton } from "../styles";

export const ShowResults = ({ evaluation }: { evaluation: Results }) => {
  const { correctWords, wrongWords, correctLetters, wrongLetters } = evaluation;

  const submissionThreshold = 2;

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
        className={`${primaryButton} ${wrongWords >= submissionThreshold ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={wrongWords >= submissionThreshold}
      >
        Add Your Own Clue
      </button>
      <p className="text-sm text-red-500">
        Get at least {submissionThreshold} answers correct to submit a clue for the next crossword!
      </p>
    </div>
  );
};

// return `${evaluation.correctWords} correct words, ${evaluation.wrongWords} wrong words, ${evaluation.correctLetters} correct letters, ${evaluation.wrongLetters} wrong letters`;
