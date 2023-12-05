//ReactDOM.render(<h1>Привет</h1>, document.getElementById('app'))

const SYMBOL_X = 'X';
const SYMBOL_O = 'O';

// const elems = <input placeholder = 'Help text' oneClick = {inputClick} oneMouseEnter = {mouseOver} />;
function App(){
    const currentStep = SYMBOL_O; 
    const cells = [null,null,null,SYMBOL_O,SYMBOL_X,SYMBOL_O,null,null,null];

    const getSymbolClassName = (symbol) =>{
        if(symbol === SYMBOL_O) return "symbol--o";
        if(symbol === SYMBOL_X) return "symbol--x";
        return '';
    }

    const renderSymbol = (symbol) => <span className = {`symbol ${getSymbolClassName(symbol)}`}>{symbol}</span>
    const handleCellClick = () => {
        console.log("click");
    }

    return (
        <div className = "game">
            <div className = "game-info">
                Ход: {renderSymbol(currentStep)}
            </div>
            <div className = "game-field">
                {cells.map((symbol, index) =>{
                    return <button key = {index} className = "cell" onClick = {handleCellClick}>{symbol ? renderSymbol(symbol) : null}</button>
                })}
            </div>
        </div>
    )
};

const rot = ReactDOM.createRoot(document.getElementById('root'));

rot.render(<App/>);
