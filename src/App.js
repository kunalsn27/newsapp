//Function Based Component

import './App.css';
import React, { useState } from 'react'
import Navbar from './components/NavBar';
import News from './components/News';
// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = ()=> {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API
  const [progress, setProgress] = useState(0)

  
    return (
      <div>
        <BrowserRouter>

          <Navbar />

          <LoadingBar
          height={3}
            color='#f11946'
            progress={progress}
          />

          <Routes>

            <Route exact  path="/"               element={<News setProgress={setProgress} apiKey={apiKey}  key="general" pageSize={pageSize} country="in" category="general" />}></Route>
            <Route exact  path="/business"       element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business" />}></Route>
            <Route exact  path="/entertainment"  element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment" />}></Route>
            <Route exact  path="/general"        element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general" />}></Route>
            <Route exact  path="/health"         element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health" />}></Route>
            <Route exact  path="/science"        element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science" />}></Route>
            <Route exact  path="/sports"         element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports" />}></Route>
            <Route exact  path="/technology"     element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology" />}></Route>

          </Routes>
        </BrowserRouter>
      </div>
    ) 
}
export default App;
//------------------------------------------------------------------------------


// // // Class Based component
// import './App.css';
// import React, { Component } from 'react'
// import Navbar from './components/NavBar';
// import News from './components/News';
// // import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoadingBar from 'react-top-loading-bar'


// export default class App extends Component {
//   pageSize = 15;
//   // apiKey = process.env.REACT_APP_NEWS_API 
//   apiKey="5088e832799340d0b06bd492419a28b3"
//   state={
//     progress: 0
//   }
//   setProgress = (progress) => {
//     this.setState({progress:progress})
//   }

//   render() {
//     return (
//       <div>
//         <BrowserRouter>

//           <Navbar />

//           <LoadingBar
//           height={3}
//             color='#f11946'
//             progress={this.state.progress}
//           />

//           <Routes>

//             <Route exact  path="/"               element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
//             <Route exact  path="/business"       element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="in" category="business" />}></Route>
//             <Route exact  path="/entertainment"  element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
//             <Route exact  path="/general"        element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="in" category="general" />}></Route>
//             <Route exact  path="/health"         element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="in" category="health" />}></Route>
//             <Route exact  path="/science"        element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="in" category="science" />}></Route>
//             <Route exact  path="/sports"         element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="in" category="sports" />}></Route>
//             <Route exact  path="/technology"     element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="in" category="technology" />}></Route>

//           </Routes>
//         </BrowserRouter>
//       </div>
//     )
//   }
// }


// // import logo from './logo.svg';
// // import './App.css';

// // import React, { Component } from 'react'
// // import Navbar from './components/NavBar';
// // import News from './components/News';


// // export default class App extends Component {
// //   render() {
// //     return (
// //       <div>
// //         <Navbar/>
// //         <News setProgress={this.setProgress}  pageSize={5} country="in" category="Health"/>
// //       </div>
// //     )
// //   }
// // }

