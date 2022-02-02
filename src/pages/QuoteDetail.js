import { Fragment, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Link, Route, useParams } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

// const DUMMY_QUOTES = [
//   { id : 'q1' , author : 'Max' , text : 'Learning react is fun!' },
//   { id : 'q2' , author : 'Maxmillian' , text : 'Learning react is great!' }
// ]

const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();
  const { quoteId } = params

  const {sendRequest, status , data: loadedQuotes, error } = useHttp(getSingleQuote, true);

  // console.log(match);

  // const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return <div className="centered">
      <LoadingSpinner/>
    </div>
  }

  if (error) {
    return <p className="centered">
      {error}
    </p>
  } 

  if (!loadedQuotes.text) {
    return <p>No quote found!</p>
  }

  // if (!quote) {
  //   return <p>No quote found!</p>
  // }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      {/* <HighlightedQuote text={quote.text} author={quote.author} /> */}
      {/* <Route path={`/quotes/${params.quoteId}`} exact> */}
      <Route path={match.path} exact>
        <div className="centered">
          {/* <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`} >Load Comments</Link> */}
          <Link className="btn--flat" to={`${match.url}/comments`} >Load Comments</Link>
        </div>
      </Route>
      
      {/* <h1>Quotes Details Page</h1>
      <p>{params.quoteId}</p> */}
      {/* <Route path="/quotes/some-id/comments" > */}
      {/* <Route path={`/quotes/${params.quoteId}/comments`} > */}
      <Route path={`${match.path}/comments`} >
        <Comments/>
      </Route>
    </Fragment>
  )
};

export default QuoteDetail;