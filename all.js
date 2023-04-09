const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
let data = [];

// 串接 API & 顯示資料
function getData(){
    axios.get(url)
    .then((res)=>{
        data = res.data;
        renderData(data);
    })
}
getData();

function renderData(data){
    let str = "";
    data.forEach((item)=>{
        str += `<tr>
                    <td>${item["作物名稱"]}</td>
                    <td>${item["市場名稱"]}</td>
                    <td>${item["上價"]}</td>
                    <td>${item["中價"]}</td>
                    <td>${item["下價"]}</td>
                    <td>${item["平均價"]}</td>
                    <td>${item["交易量"]}</td>
                </tr>`;
    })
    showList.innerHTML = str;
}

// 篩選資料
buttonGroup.addEventListener("click",(e)=>{
    if(e.target.type === "button"){
       let type = e.target.dataset.type;
       let filterData = [];
       if(type === "N04"){
        filterData = data.filter((item)=> item["種類代碼"] === "N04");
       }else if(type === "N05"){
        filterData = data.filter((item)=> item["種類代碼"] === "N05");
       }else if(type === "N06"){
        filterData = data.filter((item)=> item["種類代碼"] === "N06");
       }

       let sort = document.querySelectorAll(".button-group button");
       sort.forEach((item)=>{
        item.classList.remove("active");
       })
       e.target.classList.add("active");
       renderData(filterData);
    }
})