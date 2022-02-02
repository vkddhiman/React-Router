import { useHistory } from "react-router-dom";
import useHttp from '../hooks/use-http';
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
  const {sendRequest, status} = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === 'comleted'){
      history.push('/quotes')
    }
  }, [status, history]);

  const addQuoteHandler = (quoteData) => {
    // console.log(addQuoteHandler)
    sendRequest(quoteData);

    // history.push('/quotes');
  }

  return (
    <QuoteForm isLoading = {status === 'pending'} onAddQuote={addQuoteHandler} />
    // <h1>New Quote Page</h1>
  )
};

export default NewQuote;