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
        className={`${primaryButton} ${correctWords < submissionThreshold ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={correctWords < submissionThreshold}
      >
        Add Your Own Clues
      </button>
      {correctWords < submissionThreshold ? (
        <p className="text-sm text-red-500">
          Get at least {submissionThreshold} answers correct to submit a clue for the next crossword!
        </p>
      ) : (
        <p className="text-sm text-green-500">
          You've done it! You can contribute clues to a future crossword because you got over {submissionThreshold} answers correct.
        </p>
      )}
    </div>
  );
};
