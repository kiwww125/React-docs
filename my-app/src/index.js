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
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [{
                    squares : Array(9).fill(null)
            }],
            xIsNext : true
        }
    }

    handleClick(i){
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if(squares[i] || calculateWinner(squares)){
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        //update states
        this.setState({
            history : history.concat([
                {squares : squares
            }]),
            xIsNext : !this.state.xIsNext
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
        let status;
        
        if(winner) {
            status = `winner is ${winner}`;
        }
        else {
            status = `next player is ` + (this.state.xIsNext ? "X" : "O");
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current.squares}
                        onClick={(i)=>this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}


ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

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



// // function Comment(props) {
// //     return (
// //       <div className="Comment">
// //         <UserInfo user={props.author} />
// //         <CommentText />
// //         <CommentDate />
// //       </div>
// //     );
// //   }

// // function Avatar(props) {
// //     return (
// //         <img className="Avatar"
// //             src={props.user.avatarUrl}
// //             alt={props.user.name}
// //         />
// //     );
// // }

// // function UserInfo(props) {
// //     return (
// //         <div className="UserInfo">
// //             <Avatar user={props.user}/>
// //             <div className="UserInfo-name">
// //                 {props.user.name}
// //             </div>
// //         </div>
// //     );
// // }
// // function CommentText(props) {
// //     return (
// //         <div className="Comment-text">
// //           {props.text}
// //         </div>
// //     );
// // }

// // function CommentDate(props){
// //     return (
// //     <div className="Comment-date">
// //         {formatDate(props.date)}
// //     </div>
// //   );
// // }

// // //this가 없다면 scope가 이상해짐, class 외부의 props를 참조한다. 
// // class Clock extends React.Component {
// //     //Component 내부의 state가 변경되면, React가 이를 감지하며
// //     //해당 Component instance를 다시 render한다.
// //     constructor(props) {
// //         super(props);
// //         this.state = { date: new Date() };
// //     }

// //     //component 출력물이 DOM에 rendering 된 이후에 실행
// //     componentDidMount() {
// //         this.timerID = setInterval(
// //             () => this.tick(),
// //             1000
// //         );
// //     }

// //     componentWillMount() {
// //         clearInterval(this.timerID);
// //     }

// //     tick() {
// //         this.setState({
// //             date: new Date()
// //         });
// //     }

// //     render() {
// //         return (
// //             <div>
// //                 <h1>Hello, world!</h1>
// //                 <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
// //             </div>
// //         );
// //     }
// // }

// // ReactDOM.render(
// //     <Clock />,
// //     document.getElementById('root')
// // );




