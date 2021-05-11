type fetchOption = {
  method: string;
  body?: string | FormData;
};

enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

enum HttpStatus {
  OK = 200,
  NotModified = 304,
  BadRequest = 400,
  NotFound = 404,
  InternalServerError = 500,
}

type dataType = {
  [key: string]: any;
}

const ajax = async (method: string, path: string, data?: dataType) => {
  const option: fetchOption = { method };
  let url = 'https://codingtest.op.gg/api/' + path;
  if (data !== undefined) {
    if (method === Method.GET) {
      let queryString = "?";
      Object.keys(data).forEach((key, i, self) => {
        if (self.length === i + 1) {
          queryString += `${key}=${data[key]}`;
        } else {
          queryString += `${key}=${data[key]}&`;
        }
      });
      url += queryString;
    } else {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      option["body"] = formData;
    }
  }

  return await fetch(url, option).then((res) => {
    if (res.status === HttpStatus.OK) {
      return res.json();
    }
    return {
      result: "fail",
      data: null,
    };
  });
};


export const getSummoner = async (summonerName: string) => {
  return await ajax(Method.GET, `summoner/${summonerName}`);
}

export const getMostInfo = async (summonerName: string) => {
  return await ajax(Method.GET, `summoner/${summonerName}/mostInfo`);
}

export const getMatchList = async (summonerName: string) => {
  return await ajax(Method.GET, `summoner/${summonerName}/matches`);
}

export const getMatchDetail = async (summonerName: string, gameId: string) => {
  return await ajax(Method.GET, `summoner/${summonerName}/matchDetail/${gameId}`);
}

export const getItemInfo = async () => {
  return await fetch("http://ddragon.leagueoflegends.com/cdn/10.15.1/data/ko_KR/item.json").then((res) => {
    if (res.status === HttpStatus.OK) {
      return res.json();
    }
    return {
      result: "fail",
      data: null,
    };
  });
}