import React, { Component } from 'react';
import { randomWord } from './words';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong: 6,
		images: [img0, img1, img2, img3, img4, img5, img6]
	};

	constructor(props) {
		super(props);
		this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
		this.handleGuess = this.handleGuess.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord() {
		return this.state.answer.split('').map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	handleGuess(e) {
		let ltr = e.target.value;
		this.setState(st => ({
			guessed: st.guessed.add(ltr),
			nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
		}));
	}

	// Handles the restarting of the game
	handleReset(e) {
		this.setState({
			nWrong: 0,
			guessed: new Set(),
			answer: randomWord()
		});
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons() {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
			<button
				className='Hangman-btn'
				key={ltr}
				value={ltr}
				onClick={this.handleGuess}
				disabled={this.state.guessed.has(ltr)}
			>
				{ltr}
			</button>
		));
	}

	/** render: render game */
	render() {
		const isWinner = this.guessedWord().join('') === this.state.answer;
		const gameOver = this.state.nWrong === this.props.maxWrong;
		const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses`;
		let gameDisplay = <p className='Hangman-btns'>{this.generateButtons()}</p>;

		if (gameOver) {
			gameDisplay = (
				<div className='Hangman-gameOver'>
					<h1>You Lose!</h1>
					<p>
						The correct answer was: <span>{this.state.answer}</span>
					</p>
				</div>
			);
		}

		if (isWinner) {
			gameDisplay = (
				<div>
					<h1>You Win!!!</h1>
					<p>{this.state.nWrong === 0 ? 'Flawless!' : 'Congratulations!'} </p>
				</div>
			);
		}

		return (
			<div className='Hangman'>
				<h1>Hangman</h1>
				<img src={this.props.images[this.state.nWrong]} alt={altText} />
				<p className='Hangman-wrong'>Number of Wrong Attempts : {this.state.nWrong}</p>
				<p className='Hangman-word'>{gameOver ? this.state.answer : this.guessedWord()}</p>
				{gameDisplay}
				<button className='Hangman-reset' onClick={this.handleReset}>
					Restart
				</button>
				<footer id='Main-footer'>Copyright &copy; 2019, Ashfaq Shimer, All Rights Reserved</footer>
			</div>
		);
	}
}

export default Hangman;
