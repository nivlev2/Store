import axios from "axios"
// "https://shopniv.herokuapp.com"
export const API_URL = "http://localhost:3400" ;
// export const PER_PAGE = 5;

export const doApiGet = async (_url) => {
  try {
    let resp = await axios.get(_url);
    return resp.data;
  } catch (err) {
    throw err;
  }
}

export const doApiMethod = async (_url, _method, _bodyData) => {
  try {
    let resp = await axios({
      method: _method,
      url: _url,
      data: _bodyData,
      headers: {
        'content-type': "application/json",
        "x-auth-token": localStorage["token"]
      }
    })
    return resp.data;
  }
  catch (err) {
    throw err;
  }
}
