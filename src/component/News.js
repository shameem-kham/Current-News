import React, { useEffect , useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import React, { memo } from 'react'
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

 

const News = (props)=>{
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
   
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    // constructor(props) {
    //     super(props);
    //     console.log("this is a constructor");
    //     this.state = {

    //         articles: [],
    //         loading: true,
    //         page: 1,
    //         totalResults: 0 
    //     }
    //     document.title = `${this.captalizeFirstLetter(props.category)} -NewsMonkey` ;
    // }

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
       
       
        // ruff note when i use class base componenet then i will use it 
        // console.log(parseData)
        // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults , loading:false })
        
         props.setProgress(100);
           
    }
   

    useEffect(() => {
        document.title = `${this.captalizeFirstLetter(props.category)} -NewsMonkey` ;
        updateNews();
        //eslint-disable-next-line
        
    
     
    }, [])
    

    // const componentDidMount = async () => {


    //     // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=56d11c3ab23f4fb3936546c37bf2b504&page=1&pageSize=${props.pageSize}`;
    //     // this.setState({loading:true})
    //     // let data = await fetch(url);
    //     // let parseData = await data.json();
    //     // console.log(parseData)
    //     // this.setState({ articles: parseData.articles, totalResults: parseData.totalResults , loading:false })
   
       

    // }

//    const handleNextClick = async() => {
     
//     //    if(!(this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize ))){

           
     
//     //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=56d11c3ab23f4fb3936546c37bf2b504&page=${this.state.page+1}&pageSize=${props.pageSize}`;
//     //     this.setState({loading:true})
//     //     let data = await fetch(url);
//     //     let parseData = await data.json();
      
//     //     this.setState({
             
//     //          page : this.state.page+1,
//     //          articles: parseData.articles,
//     //          loading:false
//     //     })
//     // }
//     // this.setState({page:this.state.page+1})
//     setPage(page+1)
//     updateNews();


//     }

//     const handlePrevClick = async() => {


//         // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=56d11c3ab23f4fb3936546c37bf2b504&page=${this.state.page-1}&pageSize=${props.pageSize} `;
//         // this.setState({loading:true})
//         // let data = await fetch(url);
//         // let parseData = await data.json();
//         // console.log(parseData)
       

//         // this.setState({
             
//         //      page : this.state.page-1,
//         //      articles: parseData.articles,
//         //      loading:false
//         // })
       
//         //  this.setState({page:this.state.page-1})
//         setPage(page-1)
//          updateNews();

           
//     }

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
        <h1 className="text-center" style={{ margin: '35px 0px', marginTop:'90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
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
            </> 
            //    {/* <div className='container d-flex justify-content-between'>

            //    <button disabled ={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            //    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

            //    </div> */
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