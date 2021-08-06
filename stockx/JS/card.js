const cmpInfoPanel = document.getElementById("CmpInfoPanel");
const cmpPriceSummary = document.getElementById("cmpPriceSummary");

window.onload = () => {
  var url = document.location.href,
      cmpName = url.split('?')[1].split('=')[1];
  
  cmpName = cmpName.replaceAll('%20',' ').trim().toString()
  fetchForData(cmpName);

}

const fetchForData = (companyName) => {
  console.log(companyName);
  const cmpData = JSON.parse(localStorage.getItem("CompanyData"));

  for(let i = 0 ; i < cmpData.data.length ; i++){

    let name = Object.keys(cmpData.data[i])[0];
    
    if(name.trim().toLowerCase() === companyName.trim().toLowerCase()){
        console.log(cmpData.data[i][name]);
        const code = cmpData.data[i][name].CODE
        const url = generateFetchUrl(code)

        fetch(url)
          .then(res => res.json())
          .then(res => {
            console.log(res.dataset.data[0][6]); 
            
            const cmpName = res.dataset.name;
            const cmpDesp = res.dataset.description;

            const newest_date = res.dataset.newest_available_date;
            
            const high = res.dataset.data[0][2];
            const low = res.dataset.data[0][3];
            const volume = res.dataset.data[0][6];

            updateCmpInfo(cmpName,cmpDesp);
            updatePriceSummary(newest_date,high,low,volume);

            console.log("END!")
          })
          .catch(err => console.log(err));

        break;
    }

  }

  // console.log(cmpData.data[0]["ABB India Limited "]);

}


const updateCmpInfo = (name,des) =>{

  let h = cmpInfoPanel.getElementsByTagName("h5")[0];
  h.innerHTML = name;

  let p = cmpInfoPanel.getElementsByTagName("p")[0];
  p.innerHTML = des;

}

const updatePriceSummary = (priceDate,high,low,volume) =>{
  let p0 = cmpPriceSummary.getElementsByTagName("p")[0];
  p0.innerHTML = priceDate;

  let p1 = cmpPriceSummary.getElementsByTagName("p")[1];
  p1.innerHTML = high;
  
  let p2 = cmpPriceSummary.getElementsByTagName("p")[2];
  p2.innerHTML = low;

  let p3 = cmpPriceSummary.getElementsByTagName("p")[3];
  p3.innerHTML = volume;
}


const generateFetchUrl = (code) => {
  return `https://www.quandl.com/api/v3/datasets/BSE/${code}.json?api_key=nrDExVreRioz8KxyZQmy&start_date=2021-04-20&end_date=2021-04-30`;
}

// fetch(
//   "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=BSE:TCS&apikey=VZU44PIX3D90D9RS"
// )
//   .then((res) => res.json())
//   .then((res) => {
//     // console.log(Object.keys(res["Time Series (Daily)"])[0]);
//     // console.log(res["Meta Data"]);
//     const first = Object.keys(res["Time Series (Daily)"])[0];
//     const dataNeeded = res["Time Series (Daily)"][first];

//     let stockDate = document.getElementById("StockDate");
//     let stockHigh = document.getElementById("StockHigh");
//     let stockLow = document.getElementById("StockLow");
//     let stockVolume = document.getElementById("StockVolume");

//     stockDate.innerHTML = first;
//     stockHigh.innerHTML = res["Time Series (Daily)"][first]["2. high"];
//     stockLow.innerHTML = res["Time Series (Daily)"][first]["3. low"];
//     stockVolume.innerHTML = res["Time Series (Daily)"][first]["5. volume"];

//     console.log(dataNeeded, "- testtest");
//   })
//   .catch((err) => console.log(err));


/*

RELIANCE :: BOM500325
https://www.quandl.com/api/v3/datasets/BSE/BOM500325.json?api_key=nrDExVreRioz8KxyZQmy&start_date=2021-04-01&end_date=2021-04-30


TATA :: BOM532540
https://www.quandl.com/api/v3/datasets/BSE/BOM532540.json?api_key=nrDExVreRioz8KxyZQmy&start_date=2021-04-01&end_date=2021-04-30


*/