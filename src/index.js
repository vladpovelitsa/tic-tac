import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}



class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    let randomPosition;
    const emptySquares = [];
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = 'X';
    this.setState({
      squares:squares,
    })

    function autoPlay(squares) {
      for (let i = 0; i <= squares.length - 1; i++) {
        if (squares[i] == null) {
          emptySquares.push(squares[i]);
        }
      }
      addOs()
      checkPosition()
    }
    function addOs(){
      randomPosition = Math.floor((Math.random() * 10));
      return randomPosition
    }      
    
    function checkPosition() {
      if (calculateWinner(squares)) {
        return
      }
      else if (emptySquares.length === 0 ) {
        alert('here is no Winner now! Try again!')
        window.location.reload()
        return
      }
      else if (squares[randomPosition] || randomPosition === 9) {
        addOs()
        checkPosition()
      }
      else {
        squares[randomPosition] = 'O';
      }
    }
    autoPlay(squares)

  }

  renderSquare(i) {
    return <Square 
              value={this.state.squares[i]}
              onClick= {() => this.handleClick(i)}
            />;
  }

  render() {
    let status = 'Take your turn '
    const winner = calculateWinner(this.state.squares);
    if (winner == 'X') {
      status = 'You Win!';
    }
    else if (winner == 'O') {
      status = 'You Lose :(';      
    }
    else {
      status = 'Take your turn';      

    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <button className='restart' onClick={()=> {window.location.reload()}}> Restart </button>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


