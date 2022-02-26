let searchInput = document.getElementById("query");
let sugDiv = document.getElementById("suggestions");
let arrowKeyCount = -1;


searchInput.onkeyup = inputNow;

function inputNow(event){
    let searchText = searchInput.value;
    let totalSuggestions = sugDiv.children.length;

    switch (event.keyCode) {
        case 13:
            event.preventDefault();
            clean();
            window.open("https://www.google.com/search?q="+searchText,"_blank");
            break;
        case 38://Up
            if(arrowKeyCount>0){
                arrowKeyCount--;
                searchInput.value = sugDiv.children[arrowKeyCount].innerHTML;
                console.log(arrowKeyCount);
            }
            break;

        case 40://Down
            if(arrowKeyCount<totalSuggestions-1){
                arrowKeyCount++;
                searchInput.value =  sugDiv.children[arrowKeyCount].innerHTML;
                console.log(arrowKeyCount);
            }
            break;

        default:
            arrowKeyCount = -1;
            sugDiv.style.display = "block";
            if(document.getElementsByTagName("script")[1])
                document.getElementsByTagName("script")[1].remove();
            
            script = document.createElement('script');
            script.src = 'https://suggestqueries.google.com/complete/search?client=chrome&q='+searchText+'&callback=searchData';
            document.body.appendChild(script);        
            break;
    }
}


function clean(){
    searchInput.value = "";
    sugDiv.style.display= "none";
}
function searchData(data){
    sugDiv.innerHTML = '';
    let searchData = data[1];
    let searchType = data[4]["google:suggesttype"];
    for(let i=0;i<searchData.length;i++){
        let searchElem = document.createElement("p");

        if(searchType[i] == 'NAVIGATION'){
            searchElem.onclick = ()=>{
                clean();
                window.open(searchData[i],"_blank");
            }
            searchElem.style.color = "dodgerBlue";
        }else{
            searchElem.onclick = ()=>{
                searchInput.focus();
                searchInput.value = searchData[i] + " ";
                inputNow(event);
            }
        }
        searchElem.innerText = searchData[i];
        sugDiv.appendChild(searchElem);
    }

}

document.body.onclick = ()=>{
    searchInput.focus();
}

function lucky(){
    window.open("https://google.com/search?btnI=I&q=" + searchInput.value,"_blank");
}