import axios from "axios"
export const API_URL = "https://shopniv.herokuapp.com" ;

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
