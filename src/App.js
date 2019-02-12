import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    // expand selection left and right in order to cover the first and last words entirely
    expandSelection(range, maxLength) {
        if (range.collapsed) {
            return;
        }

        while (range.toString()[0].match(/\w/) && range.startOffset > 0) {
            range.setStart(range.startContainer, range.startOffset - 1);
        }

        while (range.toString()[range.toString().length - 1].match(/\w/)
        && range.endOffset < maxLength
            ) {
            range.setEnd(range.endContainer, range.endOffset + 1);
        }

        if(range.toString()[0].match(/[^a-z0-9]/i)){
            range.setStart(range.startContainer, range.startOffset + 1);
        }
        if(range.toString()[range.toString().length -1].match(/[^a-z0-9]/i)){
            range.setEnd(range.endContainer, range.endOffset - 1);
        }
    }

    handleMouseUp(e) {
        let selectionObject = window.getSelection();
        let selectionRange = selectionObject.getRangeAt(0);
        this.expandSelection(selectionRange, e.currentTarget.textContent.length);
        if (selectionObject.focusNode.textContent === e.currentTarget.textContent) {
            let selectedText = selectionObject.toString();
            console.log(selectedText);
        }
    }

    render() {
        return (
            <div className="App">
                <p
                    onMouseUp={e => this.handleMouseUp(e)}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                </p>
            </div>
        );
    }
}

export default App;
