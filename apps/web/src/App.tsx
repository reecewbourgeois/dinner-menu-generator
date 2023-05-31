import React from 'react';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="header">
                    Web
                    <div className="Turborepo">Turborepo Example</div>
                </h1>
                <div>
                    <a className="App-link" href="https://turbo.build/repo">
                        Turborepo Docs Woop
                    </a>
                    <span> | </span>
                    <a className="App-link" href="https://reactjs.org">
                        React Docs
                    </a>
                </div>
            </header>
        </div>
    );
}

export default App;
