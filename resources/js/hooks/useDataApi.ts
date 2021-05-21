import { useEffect, useState } from 'react';
import axios from 'axios';

import { Payload } from 'qna-types'

const validEndpoint = (path: string): boolean => {
  // regexps should allow for optional preceding and trailing slashes
  if (/^\/?api\/questions\/?$/.test(path)) return true
  if (/^\/?api\/questions\/\b[1-9][0-9]*\/?$/.test(path)) return true
  return false
}

const useDataApi = <Response>(url: string): Payload<Response> => {
  const [dataState, setDataState] = useState<Payload<Response>>({ data: null, isLoading: true })
  const [endpointUrl] = useState(url);

useEffect(() => {
  let unmounted = false;
  let source = axios.CancelToken.source()

  validEndpoint(endpointUrl) && axios.get(endpointUrl, {
      cancelToken: source.token,
  })
    .then(res => !unmounted && setDataState({ data: res.data, isLoading: false }))
    .catch(e => {
      if (!unmounted) {
        setDataState({ data: null, error: e.message, isLoading: false })
        axios.isCancel(e) && console.log(`request cancelled:${e.message}`)
      }
    }) || setDataState({ 
      data: null, 
      error: `Internal Error useDataApi hook: Illegal Endpoint: ${endpointUrl}`, 
      isLoading: false });

  return function cleanup () {
      unmounted = true
      source.cancel("canceled during cleanup")
  }
}, [url]);

  return dataState
};

export default useDataApi