

// const intGameBoard=[
//     [null,null,null],
//     [null,null,null],
//     [null,null,null],
// ];

export default function GameBoard({onSelectedSquare,board})
{
    // let gameBoard=intGameBoard;

    // for (const turn of turns)
    // {
    //     const {square,player} = turn;
    //     const {row,col} = square;
    //     gameBoard[row][col]= player;

    // }
   
    return(
    <ol id="game-board">
        {board.map((row,rowIndex)=>(
        <li key={rowIndex}>
            <ol>
            {row.map((playerSymbol,colIndex)=>(
            <li key={colIndex}>
                <button onClick={()=>onSelectedSquare(rowIndex,colIndex)} 
                disabled={playerSymbol!==null}>{playerSymbol} </button>
            </li>
            ))}
            </ol> 
        </li>
        ))}
    </ol>


    );
     //const [gameBoard,setGameBoard]=useState(intGameBoard);

    // function handelSelectedSquare(rowIndex,colIndex)
    // {
    //     setGameBoard((prevGameBoar)=>{
    //         const updateGame=[... prevGameBoar.map(innerArray=>[...innerArray])];
    //         updateGame[rowIndex][colIndex]=activePlayerSymbol;
    //         return updateGame;
    // });
    // onSelectedSquare();
    // }
}