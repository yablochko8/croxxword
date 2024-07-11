import { CrossWord, BoolGrid, Clue, AlphaGrid } from "../data/types"
import { answerLength } from "../services/answerLength";


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

    return (
        <div>
            {boolGrid.map((row, rowNum) => (
                <div key={rowNum} style={{ display: 'flex' }} className="flex flex-row bg-red-600">
                    {row.map((cell, colNum) => (
                        <div
                            key={colNum}
                            style={{
                                width: '20px',
                                height: '20px',
                                backgroundColor: cell ? 'white' : 'black',
                                border: '1px solid gray'
                            }}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
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
                <div key={index}>{clue.hint} ({answerLength(clue.answer)})</div>
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
export const ShowCrossword = ({ cw, gg, setGG }: { cw: CrossWord, gg: AlphaGrid, setGG: Function }): JSX.Element => {

    console.log(cw.clues)
    console.log(gg)
    console.log(setGG)

    //
    // add logic here
    //

    return (<>
        <div>This is a beautiful crossword.</div>
        <CrossWordGrid boolGrid={cw.tiles} />
        <ClueColumn clues={cw.clues} />
    </>)
};