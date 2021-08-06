console.log("In index.js!");

const searchInput = document.getElementById("SearchID");
const searchList = document.getElementById("SearchList");
const searchForm = document.getElementById("searchForm");

// form search funcationality 
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let searchWord = searchInput.value.toLowerCase();

    if(searchWord.length === 0) return;

    console.log("Search word : "+searchWord);

    const cmpData = JSON.parse(localStorage.getItem("CompanyData"));

    // const cmpNames = Object.keys(cmpData.data[0])[0];
    let cmpNames = [];

    for(let i = 0 ; i < cmpData.data.length ; i++){
        let name = Object.keys(cmpData.data[i])[0];

        if( name.toLowerCase().indexOf(searchWord) > -1 )
            cmpNames.push(name);

    }
    // console.log(cmpNames);
    createCustomList(cmpNames)
})

const createCustomList = (cmpList) => {
    searchList.innerHTML = '';
    for(let i = 0 ; i < cmpList.length ; i++){
        createListItem(cmpList[i]);
    }
}

const createListInitial = () => {
    const cmpData = JSON.parse(localStorage.getItem("CompanyData"));
    // console.log(cmpData.data[0]);
    searchList.innerHTML = '';
    for(let i = 0; i < 12 ; ++i){
        let name = Object.keys(cmpData.data[i])[0].toString();
        createListItem(name);
    }

}

// creating a list item of provided company name and adding it tho the list
const createListItem = (cmpName) =>{
    let li = document.createElement("li");
    let a = document.createElement("a");
    
    a.innerHTML = cmpName;
    a.href = generateUrl(cmpName);

    li.appendChild(a);
    searchList.appendChild(li);
}

// generate a url to be linked in 'a' tag 
const generateUrl = (name) => {
    const PORT = '5501';
    return `http://localhost:${PORT}/card.html?name=${name}`
}


createListInitial();