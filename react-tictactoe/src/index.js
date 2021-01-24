import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button
      className={props.clicked ? "square clicked" : "square"}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        clicked={this.props.winner && i in this.props.winner ? true : false}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderBoard() {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      let squares = [];
      for (let j = 0; j < 3; j++) {
        squares.push(this.renderSquare(i * 3 + j));
      }
      rows.push(<div className="board-row">{squares}</div>);
    }
    return rows;
  }

  render() {
    return <div>{this.renderBoard()}</div>;
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          position: [null, null],
        },
      ],
      xIsNext: true,
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];

    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    let x, y;
    if (i < 3) {
      x = 1;
      y = i + 1;
    } else if (i < 6) {
      x = 2;
      y = i - 2;
    } else {
      x = 3;
      y = i - 5;
    }

    this.setState({
      history: history.concat([
        {
          squares: squares,
          position: [x, y],
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      clicked: i,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
            {move !== 0 && (
              <>
                {" "}
                [<span>{step.position[0]}</span>,{" "}
                <span>{step.position[1]}</span>]
              </>
            )}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + current.squares[winner[0]];
    } else {
      if (this.state.stepNumber === 9) status = "DRAW";
      else status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winner={winner}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

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
      return [a, b, c];
    }
  }
  return null;
}

/* TODO */

// 이동 기록 목록에서 특정 형식(행, 열)으로 각 이동의 위치를 표시해주세요. - O
// 이동 목록에서 현재 선택된 아이템을 굵게 표시해주세요.
// 사각형들을 만들 때 하드코딩 대신에 두 개의 반복문을 사용하도록 Board를 다시 작성해주세요. - O
// 오름차순이나 내림차순으로 이동을 정렬하도록 토글 버튼을 추가해주세요.
// 승자가 정해지면 승부의 원인이 된 세 개의 사각형을 강조해주세요.
// 승자가 없는 경우 무승부라는 메시지를 표시해주세요. - o
