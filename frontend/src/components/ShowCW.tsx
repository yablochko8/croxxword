import { BoolGrid, FEClue, GridDisplay } from "../../../shared/types"



// ALL STYLES HERE...FOR NOW

const bgColor = "bg-zinc-900"
const flexRow = `flex flex-row justify-center ${bgColor}`
const flexCol = `flex flex-col justify-center ${bgColor}`
const cellStylesCommon = "flex flex-col rounded-sm w-5 h-5"
const inputCell = `${cellStylesCommon} bg-white border border-gray-500`
const blankCell = `${cellStylesCommon} ${bgColor}`

const clueSubtitle = "text-sm text-gray-500 mt-5"

const clueHint = "text-sm text-zinc-900"

/**
 * Takes in a CrossWord and shows it, including:
 * - interactive grid (made of Tiles)
 * - clues
 * @returns JSX.Element
 */
export const ShowCrossword = ({ gridDisplay, clues, onInput }: { gridDisplay: GridDisplay, clues: FEClue[], onInput: (letter: string, rowNum: number, colNum: number) => void }): JSX.Element => {


    type TileProps = {
        isInteractive: boolean;
        rowNum: number;
        colNum: number;
    }

    /**
     * Show an individual tile
     */
    const Tile = (props: TileProps): JSX.Element => {
        const { isInteractive, rowNum, colNum } = props

        const tileStyle = isInteractive ? inputCell : blankCell
        return (
            <div className={tileStyle} >
                {isInteractive ? (
                    <input
                        type="text"
                        maxLength={1}
                        className="w-full h-full text-center"
                        defaultValue={gridDisplay.guesses[rowNum][colNum]}
                        onChange={(e) => onInput(e.target.value.toUpperCase(), rowNum, colNum)
                        }

                    />
                ) : (
                    <div />
                )}
            </div>
        );
    };

    /**
     * Takes in set of booleans and returns an interactive grid.
     * User can click on a tile and enter a single letter onto it.
     */
    const CrossWordGrid = ({ boolGrid }: { boolGrid: BoolGrid }): JSX.Element => {
        return (
            <div className="flex flex-row justify-center">
                <div className={flexCol} >
                    {boolGrid.map((row, rowNum) => (
                        <div key={rowNum} className={flexRow}>
                            {row.map((cell, colNum) => (
                                <Tile isInteractive={cell} rowNum={rowNum} colNum={colNum} key={`${rowNum}-${colNum}`} />
                            ))}
                        </div>
                    ))}
                </div>

            </div>
        );
    };

    /**
     * Takes in list of clues and displays them prettily.
     */
    const ClueSection = ({ clues }: { clues: FEClue[] }): JSX.Element => {
        return (
            <div className="clue-list">
                {clues.map((clue, index) => (
                    <div key={index} className={clueHint}>
                        {clue.hint} ({clue.answerLength.join(", ")})
                    </div>
                ))}
            </div>
        )
    }


    /**
     * Takes in set of clues and organises them into Across & Down
     */
    const ClueColumn = ({ clues }: { clues: FEClue[] }): JSX.Element => {

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
        <CrossWordGrid boolGrid={gridDisplay.tiles} />
        <ClueColumn clues={clues} />
    </>)
};