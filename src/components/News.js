//Function Based Component

import React, {useEffect, useState} from 'react'
import './News.css';
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title = `${capitalizeFirstLetter(props.category)} - HeadlineHorizon`;

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json()

        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);

    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - HeadlineHorizon`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])


    // const handlePrevClick = async () => {
    //     setPage(page-1)
    //     updateNews();
    // }

    // const handleNextClick = async () => { 
    //     setPage(page+1)
    //     updateNews()
    // }

    const fetchMoreData = async () => {          
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <div className="All">
                <h1 className="text-center mt-5 pt-4 pb-4">HeadlineHorizon -Top {capitalizeFirstLetter(props.category)} HeadLines</h1>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">

                        <div className="row">
                            {articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        </>
    )

}


News.defaultProps = {
country: 'in',
pageSize: 8,
category: 'general',
}

News.propTypes = {
country: PropTypes.string,
pageSize: PropTypes.number,
category: PropTypes.string,
}

export default News


//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Class Based Component

// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import Spinner from './Spinner';
// import './News.css';
// import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';


// export class News extends Component {
//     static defaultProps={
//         country: 'in',
//         pageSize: 8,
//         category: 'general'
//     }

//     static propTypes={
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string
//     }

//     // articles = [
//     //     {
//     //     "source": {
//     //     "id": "cnn",
//     //     "name": "CNN"
//     //     },
//     //     "author": "By <a href=\"/profiles/tara-subramaniam\">Tara Subramaniam</a>, Christian Edwards, Thom Poole, <a href=\"/profiles/aditi-sandal\">Aditi Sangal</a>, <a href=\"/profiles/tori-powell\">Tori B. Powell</a> and <a href=\"/profiles/adrienne-vogt\">Adrienne Vogt</a>, CNN",
//     //     "title": "First hostages released after Israel-Hamas truce begins: Live updates - CNN",
//     //     "description": "An four-day truce begins between Israel and Hamas, with the release of hostages held in Gaza since October 7 expected later Friday. Follow live updates.",
//     //     "url": "https://www.cnn.com/middleeast/live-news/israel-hamas-war-gaza-news-11-24-23/index.html",
//     //     "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/231106194936-gaza-rubble-israeli-strike-aftermath-11062023-super-tease.jpg",
//     //     "publishedAt": "2023-11-24T14:40:00Z",
//     //     "content": "Hamas published the names of Palestinian prisoners expected to be in the first batch released from Israeli jails on Friday.\r\nThe list has 39 names 24 women and 15 minors. The majority of the people o… [+1119 chars]"
//     //     },
//     //     {
//     //     "source": {
//     //     "id": null,
//     //     "name": "Digital Trends"
//     //     },
//     //     "author": "Albert Bassili",
//     //     "title": "146 PS5 game Black Friday deals just went live at Best Buy — from $10 - Digital Trends",
//     //     "description": "There are a ton of awesome PS5 games on sale at Best buy for Black Friday right now.",
//     //     "url": "https://www.digitaltrends.com/gaming/best-buy-ps5-game-black-friday-sale-november-2023/",
//     //     "urlToImage": "https://www.digitaltrends.com/wp-content/uploads/2023/09/Digital-Trends-Best-Black-Friday-PS5-Game-Deals.jpg?resize=1200%2C630&p=1",
//     //     "publishedAt": "2023-11-24T14:15:36Z",
//     //     "content": "Digital Trends\r\nConsole games have gotten really expensive over the past few years, especially as the base price has moved up to $70 from the $60 it used to be. As such, for a lot of people, buying g… [+1934 chars]"
//     //     },
//     //     {
//     //     "source": {
//     //     "id": null,
//     //     "name": "WCVB Boston"
//     //     },
//     //     "author": "Phil Tenser",
//     //     "title": "Mashpee Wampanoag respond to disruption of Macy's Thanksgiving Day Parade - WCVB Boston",
//     //     "description": "\"His actions were not a Tribal decision,\" the Mashpee Wampanoag wrote.",
//     //     "url": "https://www.wcvb.com/article/mashpee-wampanoag-palestinian-flag-disruption-macys-thanksgiving-day-parade/45936508",
//     //     "urlToImage": "https://kubrick.htvapps.com/htv-prod-media.s3.amazonaws.com/images/2023-macy-s-thanksgiving-day-parade-ap26560a415ae477.jpg?crop=1.00xw:0.848xh;0,0.115xh&resize=1200:*",
//     //     "publishedAt": "2023-11-24T13:44:00Z",
//     //     "content": "NEW YORK —The Mashpee Wampanoag Tribe issued a statement Thursday responding to the unexpected political demonstration involving a Palestinian Flag that occurred on their float during the Macy's Than… [+4929 chars]"
//     //     },
//     //     {
//     //     "source": {
//     //     "id": null,
//     //     "name": "BBC News"
//     //     },
//     //     "author": null,
//     //     "title": "Wilders Dutch vote: Centre-right VVD rules out role in cabinet - BBC.com",
//     //     "description": "The decision by the Dutch VVD leader is a blow for Mr Wilders' bid to form a majority government.",
//     //     "url": "https://www.bbc.com/news/world-europe-67517742",
//     //     "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/17E09/production/_131810879_yesilgoz.jpg",
//     //     "publishedAt": "2023-11-24T13:07:00Z",
//     //     "content": "Dilan Yesilgöz, leader of the conservative-liberal VVD, said her party would support a centre-right government\r\nThe biggest party in the former Dutch government has ruled out a role in the next Dutch… [+4188 chars]"
//     //     }
//     //     ]


//         capitalizeFirstLetter(string) {
//             return string.charAt(0).toUpperCase() + string.slice(1);
//         }

//         constructor(props){
//             super(props);
//             console.log("Hello I am a constructor from news component")
//             this.state = {
//                 // articles: this.articles,
//                 articles: [],
//                 loading: false,
//                 page: 1,
//                 totalResults: 0
//             }
//             document.title = `${this.capitalizeFirstLetter(this.props.category)} - HeadlineHorizon`;
//         }

//         async updateNews(){
//             this.props.setProgress(10);
//             let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
//             // 5088e832799340d0b06bd492419a28b3
//             this.setState({loading: true});
//             let data = await fetch(url);
//             this.props.setProgress(30);           
//             let parsedData = await data.json()
//             this.props.setProgress(70); 

//             this.setState({articles: parsedData.articles,
//                 totalResults: parsedData.totalResults,
//                 loading: false,
//             })
//             this.props.setProgress(100);
//         }

//         async componentDidMount(){
//             this.updateNews();
//         }

//         handlePrevClick = async ()=>{
//             this.setState({page: this.state.page - 1});
//             this.updateNews();
//         }

//         handleNextClick = async ()=>{
//             // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
//             this.setState({page: this.state.page + 1});
//             this.updateNews();
//         }

//         fetchMoreData = async () => {
//             this.setState({page:this.state.page +1});
//             let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`; 
            
//             // this.setState({loading: true});
//             let data = await fetch(url);           
//             let parsedData = await data.json() 

//             this.setState({
//                 articles:this.state.articles.concat(parsedData.articles),
//                 totalResults: parsedData.totalResults,
//                 loading: false
//             })
//         };

//         // This is for loading the news page wise. 
//         // render() {
//         //     return (
//         //         <div className="All">
//         //             <div className="container">
//         //                 <h1 className="text-center pt-4 pb-4">HeadlineHorizon -Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>

//         //                 {this.state.loading && <Spinner/>}

//         //                 <div className="row">
//         //                 {!this.state.loading && this.state.articles.map((element)=>{
//         //                     return<div className="col-md-4" key={element.url}>
//         //                         <NewsItem  title ={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
//         //                          {/* slice is used for showing only some content to maintain uniformity   {element.title?element.title.slice(0,60):""} */}
//         //                     </div>                       
//         //                 })}  
//         //                 </div>
//         //                 <div className="container d-flex justify-content-between mt-5">

//         //                 <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;Previous</button> 

//         //                 <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>    
//         //                 </div>
//         //             </div>
//         //         </div>
//         //     )
//         // }
// //------------------------------------------------------------------------------------------------
//         //This is infinite scroll.
//     render() {
//         return (
//             <>
//                 <div className="All">
//                     {/* <div className="container"> */}
//                     <h1 className="text-center pt-4 pb-4">HeadlineHorizon -Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h1>

//                     {this.state.loading && <Spinner/>}

//                     <InfiniteScroll
//                         dataLength={this.state.articles.length}
//                         next={this.fetchMoreData}
//                         hasMore={this.state.articles.length !== this.state.totalResults}
//                         loader={<Spinner />}
//                     >                       
//                         <div className="container">
//                             <div className="row">
//                                 {this.state.articles.map((element) => {
//                                     return <div className="col-md-4" key={element.url}>
//                                         <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//                                     </div>
//                                 })}
//                             </div>
//                         </div>
//                     </InfiniteScroll>

//                     {/* </div> */}
//                 </div>
//             </>
//         )
//     }
// }

// export default News







//     constructor(){
//         super();
//         console.log("Hello I am a constructor from news component")
//         this.state = {
//             articles: this.articles,
//             loading: false
//         }
//     }
//     render() {
//         return (
//             <div className="container my-3">
//                 <h2>HeadlineHorizon -Top HeadLines</h2>
//                 <div className="row">
//                     <div className="col-md-4">
//                         <NewsItem title ="mytitle" description="mydesc" imageUrl="https://ichef.bbci.co.uk/news/1024/branded_news/AEEC/production/_131808744_acfff285b0a398a603b3322d06c0afa3671023fb.jpg" newsUrl="todo"/>
//                     </div>
//                     <div className="col-md-4">
//                         <NewsItem title ="mytitle" description="mydesc"/>
//                     </div>
//                     <div className="col-md-4">
//                         <NewsItem title ="mytitle" description="mydesc"/>
//                     </div>                   
//                 </div>
//             </div>

//         )
//     }
// }

// export default News