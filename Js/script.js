//ReactDOM.render(<h1>Привет</h1>, document.getElementById('app'))

const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

const computeWinner = (cells) => {
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(let i = 0; i<lines.length; i++)
    {
        const [a, b, c] = lines[i]
        if(
            cells[a] &&
            cells[a] === cells[b] &&
            cells[b] === cells[c]
        )
        {
            return [a,b,c];
        }
    }
}

// const elems = <input placeholder = 'Help text' oneClick = {inputClick} oneMouseEnter = {mouseOver} />;

function useGameState(){
    const [currentStep, setCurrentStep] = React.useState(SYMBOL_O); 
    const [cells, setSells] = React.useState([null,null,null,null,null,null,null,null,null]);
    const [winnerSequence, setWinnerSeqence] = React.useState();

    const handleCellClick = (index) => {
        if(cells[index] || winnerSequence){
            return;
        }
        
        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;
        const winner = computeWinner(cellsCopy);

        setSells(cellsCopy);
        setCurrentStep((currentStep === SYMBOL_X) ? SYMBOL_O : SYMBOL_X);
        setWinnerSeqence(winner);
    }

    const clearField = () =>
    {
        const cellsCopyClear = cells.fill(null);

        setSells(cellsCopyClear);
        setCurrentStep((currentStep === SYMBOL_X) ? SYMBOL_O : SYMBOL_X);
        setWinnerSeqence(undefined);
    }

    const winnerSymbol = winnerSequence ? cells[winnerSequence[0]] : undefined;
    const tieDraw = !winnerSequence && !cells.includes(null);

    return {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        clearField,
        winnerSymbol,
        tieDraw
    }
}

function App(){

    const {
        cells,
        currentStep,
        winnerSequence,
        handleCellClick,
        clearField,
        winnerSymbol,
        tieDraw
    } = useGameState();

    console.log(cells);

    return (
        <div className = "game">
            <GameInfo 
                tieDraw={tieDraw} 
                winnerSymbol={winnerSymbol} 
                currentStep={currentStep} 
            />
            <div className = "game-field">
                {cells.map((symbol, index) =>(
                    <GameCell 
                        key={index} 
                        isWinner={winnerSequence?.includes(index)}
                        onClick={() => handleCellClick(index)}
                        symbol={symbol}/>))
                }
            </div>
            <div>
                <button className = 'reset' onClick = {clearField}>Очистить</button>
            </div>
        </div>
    )
};


function GameInfo ({ tieDraw, winnerSymbol, currentStep }) {
    if(tieDraw){
        return (
            <div className = "game-info">
                Ничья
            </div>
        )
    }

    if(winnerSymbol){
        return (
            <div className = "game-info">
                Победитель: <GameSymbol symbol = {winnerSymbol}/>
            </div> 
        )
    }

    return (
        <div className = "game-info">
            Ход: <GameSymbol symbol={currentStep}/>
        </div> 
    )
}

function GameCell ({ isWinner, onClick, symbol}) {
    return (
        <button
        className = {`cell ${isWinner ? 'cell--win' :''}`} 
        onClick = {onClick}>
            {symbol ? <GameSymbol symbol = {symbol} /> : null}
        </button>
    );
}

function GameSymbol({ symbol }) {
    const getSymbolClassName = (symbol) =>{
        if(symbol === SYMBOL_O) return 'symbol--o';
        if(symbol === SYMBOL_X) return 'symbol--x';
        return '';
    }
    return <span className = {`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
}

const rot = ReactDOM.createRoot(document.getElementById('root'));

rot.render(<App/>);
