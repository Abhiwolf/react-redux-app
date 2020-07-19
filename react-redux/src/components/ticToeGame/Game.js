import React from 'react';
import './index.css';
import Board from './Board';

// eslint-disable-next-line import/no-named-as-default
import produce from "immer";
const baseState = [
    {
        todo: "Learn typescript",
        done: true
    },
    {
        todo: "Try immer",
        done: false
    }
]
class Game extends React.Component {
    render() {
        const nextState = produce(baseState, draftState => {
            draftState.push({todo: "Tweet about it"})
            draftState[1].done = true
        })
        console.log(nextState);
        console.log(baseState);
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
        )
    }
}

export default Game;