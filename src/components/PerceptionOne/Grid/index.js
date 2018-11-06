import React, { Component } from 'react';
import './styles.css'

class Grid extends Component {

    //  letters = Array(252).fill(this.props.letter);
    letters = Array(4).fill(this.props.letter);
    newLetters = Array(4).fill(this.props.searchedLetter);
    longLetters = this.letters.concat(this.newLetters).sort(() => Math.random() - 0.5);

    guessedCells = [];
    cellVerify = (cell, index) => {
        if (cell === this.props.searchedLetter && !this.guessedCells.includes(index) && this.guessedCells.length <= this.newLetters.length) {
            this.guessedCells.push(index)
        } else {
            this.props.errorCounter(1)
        }

    }
    render() {
        return (
            <div className='grid' >
                {
                    this.longLetters.map((e, i) =>
                        <div
                            key={i}
                            onClick={(e) => this.cellVerify(e.target.innerText, i)}
                            className='letter'>{e}
                        </div>)
                }
            </div>
        )
    }

}

export default Grid;