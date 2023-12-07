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
function App(){

    const [currentStep, setCurrentStep] = React.useState(SYMBOL_O); 
    const [cells, setSells] = React.useState([null,null,null,null,null,null,null,null,null]);
    const [winnerSequence, setWinnerSeqence] = React.useState();

    const getSymbolClassName = (symbol) =>{
        if(symbol === SYMBOL_O) return "symbol--o";
        if(symbol === SYMBOL_X) return "symbol--x";
        return '';
    }

    const renderSymbol = (symbol) => <span className = {`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
    const handleCellClick = (index) => {
        if(cells[index]){
            return;
        }
        
        const cellsCopy = cells.slice();
        cellsCopy[index] = currentStep;
        const winner = computeWinner(cellsCopy);

        setSells(cellsCopy);
        setCurrentStep((currentStep == SYMBOL_O) ? SYMBOL_X : SYMBOL_O);
        setWinnerSeqence(winner);
    }

    return (
        <div className = "game">
            <div className = "game-info">
                Ход: {renderSymbol(currentStep)}
            </div>
            <div className = "game-field">
                {cells.map((symbol, index) =>{
                    const isWinner = winnerSequence?.includes(index);
                    return <button
                        key = {index} 
                        className = {`cell ${isWinner ? 'cell--win' :''}`} 
                        onClick = {() => handleCellClick(index)}
                        >
                        {symbol ? renderSymbol(symbol) : null}
                        </button>
                })}
            </div>
        </div>
    )
};

const rot = ReactDOM.createRoot(document.getElementById('root'));

rot.render(<App/>);
