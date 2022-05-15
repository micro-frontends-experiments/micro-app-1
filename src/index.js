import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

window.renderMicroApp1 = (containerId, history, userId) => {
  console.log('renderMicroApp1')
  ReactDOM.render(
        <App history={history} userId={userId}/>,
        document.getElementById(containerId)
  )
}

window.unmountMicroApp1 = containerId => {
  ReactDOM.unmountComponentAtNode(document.getElementById(containerId))
}

if (!document.getElementById('MicroApp1-container')) {
  ReactDOM.render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById('root')
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
