import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
// import reportWebVitals from './reportWebVitals'

async function enableMocking () {
  if (process.env.NODE_ENV !== 'development') {
    return
  }

  const { worker } = await import('./mocks/browser')

  return await worker.start({
    onUnhandledRequest(req, print) {
      const excloudeRoutes = ['/favicon.ico', '/manifest.json', '/logo192.png', 'chrome-extension://']

      const isExcluded = excloudeRoutes.some((route) => {
        return req.url.includes(route)
      })

      if (isExcluded) {
        return;
      }

      print.warning();
    }
  })
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

enableMocking().then(() => {
  root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
  )
}).catch((error) => { console.log(error) })

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals()
