import {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
    console.log('MicroApp1 has rendered')

    const [title, setTitle] = useState('')

    useEffect(() => {
        fetch('http://localhost:8001/micro-app-1')
            .then(async (response) => {
                const {title} = await response.json();
                if (title) {
                    setTitle(title)
                }
            })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>{title}</h1>
            </header>
        </div>
  );
}

export default App;
