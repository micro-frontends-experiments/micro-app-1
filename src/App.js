import {useEffect, useState} from "react";
import logo from './logo.svg';
import './App.css';

function App() {
    console.log('MicroApp1 has rendered')

    const [title, setTitle] = useState('')

    useEffect(() => {
        const url = process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_BACKEND_PROD_HOST
            : process.env.REACT_APP_BACKEND_DEV_HOST
        fetch(`${url}/micro-app-1`)
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
                <h1>{title} with Auto Deploying</h1>
            </header>
        </div>
  );
}

export default App;
