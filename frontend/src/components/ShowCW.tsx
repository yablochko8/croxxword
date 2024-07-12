import { FECrossword, BoolGrid, FEClue, AlphaGrid, GridDisplay, ClueDisplay } from "../../../shared/types"
import React from "react";

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

    // STYLES
    const bgColor = "bg-zinc-900"
    const flexRow = `flex flex-row justify-center ${bgColor}`
    const flexCol = `flex flex-col justify-center ${bgColor}`
    const cellStylesCommon = "flex flex-col rounded-sm w-5 h-5"
    const inputCell = `${cellStylesCommon} bg-white border border-gray-500`
    const blankCell = `${cellStylesCommon} ${bgColor}`

    return (
        <div className="flex flex-row justify-center">
            <div className={flexCol} >
                {boolGrid.map((row, rowNum) => (
                    <div key={rowNum} className={flexRow}>
                        {row.map((cell, colNum) => (
                            <div
                                key={colNum}
                                className={cell ? inputCell : blankCell}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>

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
const ClueColumn = ({ clues }: { clues: FEClue[] }): JSX.Element => {

    console.log(clues)

    //
    // add logic here
    //

    return (
        <>

            <div>Clue 1 - This is a beautiful column of clues</div>
            <div> it looks something like this... </div>
            {clues.map((clue, index) => (
                <div key={index}>{clue.hint} ({clue.answerLength.join(", ")})</div>
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
export const ShowCrossword = ({ gridDisplay, clues, changeLetter }: { gridDisplay: GridDisplay, clues: FEClue[], changeLetter: () => void }): JSX.Element => {

    console.log(gridDisplay.tiles)
    console.log(clues)

    //
    // add logic here
    //

    return (<>
        <div>This is a beautiful crossword.</div>
        <CrossWordGrid boolGrid={gridDisplay.tiles} />
        <ClueColumn clues={clues} />
    </>)
};