import { CrossWord, BoolGrid, Clue } from "../data/types"
import { AnswerLength } from "../services/AnswerLength";


type TileProps = {
    isInteractive: boolean;
    rowNum: number;
    colNum: number;
}

/**
 * Takes in set of booleans and returns an interactive grid.
 * User can click on a tile and enter a single letter onto it.
 * 
 */
const Tile = (props: TileProps): JSX.Element => {

    console.log(props)
    //
    // add logic here
    //
    return <div>This is a beautiful grid.</div>;
};

/**
 * Takes in set of booleans and returns an interactive grid.
 * User can click on a tile and enter a single letter onto it.
 * 
 */
const CrossWordGrid = ({ boolGrid }: { boolGrid: BoolGrid }): JSX.Element => {

    console.log(boolGrid)

    //
    // add logic here
    //

    return (
        <>
            <div>This is a beautiful grid made of tiles that look like this:</div>
            <Tile isInteractive={true} rowNum={0} colNum={0} />
        </>
    )
};


/**
 * Takes in set of clues and displays them prettily.
 * 
 */
const ClueColumn = ({ clues }: { clues: Clue[] }): JSX.Element => {

    console.log(clues)

    //
    // add logic here
    //

    return (
        <>

            <div>Clue 1 - This is a beautiful column of clues</div>
            <div> it looks something like this... </div>
            {clues.map((clue, index) => (
                <div key={index}>{clue.hint} ({AnswerLength(clue.answer)})</div>
            ))}
        </>
    )
};

/**
 * Takes in a CrossWord and shows it, including:
 * - interactive grid
 * - clues
 * - submit button
 * @returns JSX.Element
 */
export const ShowCrossword = ({ cw }: { cw: CrossWord }): JSX.Element => {

    console.log(cw.clues)

    //
    // add logic here
    //

    return (<>
        <div>This is a beautiful crossword.</div>
        <CrossWordGrid boolGrid={cw.tiles} />
        <ClueColumn clues={cw.clues} />
    </>)
};