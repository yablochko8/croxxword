import { useEffect, useRef, useState } from "react"
import { BoolGrid, Clue, GridDisplay } from "../../../shared/types"



// ALL STYLES HERE...FOR NOW

const bgColor = "bg-transparent"
const flexRow = `flex flex-row justify-center ${bgColor}`
const flexCol = `flex flex-col justify-center ${bgColor}`
const cellStylesCommon = "flex flex-col rounded-sm w-10 h-10"
const inputCell = `${cellStylesCommon} bg-white border border-gray-500`
const blankCell = `${cellStylesCommon} ${bgColor}`

const clueSubtitle = "text-sm text-gray-500 mt-5"

const clueHint = "text-sm text-zinc-900"


type ShowCrosswordProps = {
    gridDisplay: GridDisplay,
    clues: Clue[],
    onInput: (letter: string, rowNum: number, colNum: number) => void,
    showResults: boolean
}
/**
 * Takes in a CrossWord and shows it, including:
 * - interactive grid (made of Tiles)
 * - clues
 */
export const ShowCrossword = ({
    gridDisplay,
    clues,
    onInput,
    showResults
}: ShowCrosswordProps) => {

    type TileProps = {
        isInteractive: boolean;
        rowNum: number;
        colNum: number;
    }
    const inputRefs = useRef<(HTMLInputElement | null)[][]>([]);

    const [activeTile, setActiveTile] = useState<{ row: number, col: number } | null>(null);

    useEffect(() => {
        if (activeTile) {
            const { row, col } = activeTile;
            if (inputRefs.current[row] && inputRefs.current[row][col]) {
                inputRefs.current[row][col]?.focus();
            }
        }
    }, [activeTile]);

    /**
     * Show an individual tile
     */
    const Tile = (props: TileProps): JSX.Element => {
        const { isInteractive, rowNum, colNum } = props
        const inputRef = useRef<HTMLInputElement>(null);

        useEffect(() => {
            if (!inputRefs.current[rowNum]) {
                inputRefs.current[rowNum] = [];
            }
            inputRefs.current[rowNum][colNum] = inputRef.current;
        }, [inputRef, rowNum, colNum]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.toUpperCase();
            onInput(value, rowNum, colNum);

            if (value) {
                const nextCol = colNum + 1;
                const nextRow = rowNum + 1;

                if (inputRefs.current[rowNum] && inputRefs.current[rowNum][nextCol]) {
                    setActiveTile({ row: rowNum, col: nextCol });
                } else if (inputRefs.current[nextRow] && inputRefs.current[nextRow][colNum]) {
                    setActiveTile({ row: nextRow, col: colNum });
                }
            }
        };

        const tileStyle = isInteractive ? inputCell : blankCell
        const isCorrect = gridDisplay.evaluation[rowNum][colNum];
        const tileColor = isInteractive
            ? `${inputCell} ${showResults ? (isCorrect ? 'bg-green-500' : gridDisplay.guesses[rowNum][colNum] ? 'bg-red-500' : '') : ''}`
            : blankCell;

        return (
            <>
                <div className={`${tileStyle} overflow-hidden focus:bg-yellow-300 hover:bg-yellow-500 w-10 h-10 ${isInteractive ? 'shadow-[0_0_20px_10px_rgba(173,16,30,10.5)] ' : ''}`}>
                    {isInteractive ? (
                        <input
                            type="text"
                            maxLength={1}
                            className={`w-full h-full text-center transform -rotate-45 ${tileColor} cursor-pointer border-none outline-none`}
                            defaultValue={gridDisplay.guesses[rowNum][colNum]}
                            onChange={handleInputChange}
                            onClick={() => setActiveTile({ row: rowNum, col: colNum })}
                            ref={inputRef}
                        />
                    ) : (
                        <div className="w-full h-full transform -rotate-45 border-none" style={{ zIndex: 1 }} />
                    )}
                </div>
            </>
        );
    };

    /**
     * Takes in set of booleans and returns an interactive grid.
     * User can click on a tile and enter a single letter onto it.
     */
    const CrossWordGrid = ({ boolGrid }: { boolGrid: BoolGrid }): JSX.Element => {
        return (
            <div className="flex flex-row justify-center">
                <div className="grid gap-[1px] w-[300px] h-[300px] rotate-45 origin-center" style={{
                    gridTemplateColumns: `repeat(${boolGrid[0].length}, 1fr)`
                }}>
                    {boolGrid.map((row, rowNum) =>
                        row.map((cell, colNum) => (
                            <div key={`${rowNum}-${colNum}`} className="border border-none w-full h-full flex justify-center items-center">
                                <Tile isInteractive={cell} rowNum={rowNum} colNum={colNum} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        );

    };

    /**
     * Takes in list of clues and displays them prettily.
     */
    const ClueSection = ({ clues }: { clues: Clue[] }): JSX.Element => {
        return (
            <div className="clue-list">
                {clues.map((clue, index) => {
                    const isActive = clue.tiles.some(tile => tile.row === activeTile?.row && tile.col === activeTile?.col)
                    return (
                        <div key={index} className={`${clueHint} ${isActive ? 'bg-yellow-500 text-black font-bold text-xl p-2 rounded-md shadow-md transition-all duration-300 transform hover:scale-105' : ''}`}>
                            {clue.hint} ({clue.answerLength.join(", ")})
                            <span className="text-xs text-gray-500">
                                by <a href={`https://twitter.com/${clue.author}`} target="_blank" rel="noopener noreferrer">@{clue.author}</a>
                            </span>
                        </div>
                    )
                })}
            </div>
        )
    }


    /**
     * Takes in set of clues and organises them into Across & Down
     */
    const ClueColumn = ({ clues }: { clues: Clue[] }): JSX.Element => {

        const cluesAcross = clues.filter((clue) => clue.isRow)
        const cluesDown = clues.filter((clue) => !clue.isRow)

        return (
            <div className="clue-column">
                <div className={clueSubtitle}>
                    Clues Across
                </div>
                <ClueSection clues={cluesAcross} />
                <div className={clueSubtitle}>
                    Clues Down
                </div>
                <ClueSection clues={cluesDown} />
            </div>
        )
    };

    return (<>
        <div className="flex flex-row">
            <CrossWordGrid boolGrid={gridDisplay.tiles} />
        </div>
        <div className="flex flex-row">
            <ClueColumn clues={clues} />
        </div>
    </>)
};