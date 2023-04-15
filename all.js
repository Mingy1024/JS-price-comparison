const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const search = document.querySelector(".search");
const input = document.querySelector("#crop");
const select = document.querySelector("#js-select");
const mobileSelect =document.querySelector("#js-moblie-select");
const sortAdvanced = document.querySelector(".js-sort-advanced");
const showResult = document.querySelector(".show-result");
let data = [];
let filterData = [];
let type = "";

// 串接 API & 顯示資料
function getData(){
    axios.get(url)
    .then((res)=>{
        // 過濾data中作物名稱為null或空字串的物件
        filterData = res.data.filter((item)=> item["作物名稱"] !== "" && item["作物名稱"] !== null);
        data = filterData;
        renderData();
    })
}
getData();

function renderData(){
    let str = "";
    filterData.forEach((item)=>{
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
    if(filterData.length === 0){
        showList.innerHTML = '<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>';
    }else{
        showList.innerHTML = str;  
    }
}

function getList(){
    switch(type){
        case "search":
            filterData = data.filter((item)=> item["作物名稱"].match(input.value.trim()));
            break;
        default:
            filterData = data.filter((item)=> item["種類代碼"] === type);
            break;
    }
    renderData();
}

// 篩選資料
buttonGroup.addEventListener("click",(e)=>{
    if(e.target.type === "button"){
       type = e.target.dataset.type;
       let sort = document.querySelectorAll(".button-group button");
       sort.forEach((item)=>{
        item.classList.remove("active");
       })
       e.target.classList.add("active");
       getList();
    }
})

// 搜尋資料
search.addEventListener("click",(e)=>{
    searchFunc();
})

// 鍵盤事件 - Enter 
input.addEventListener("keyup",(e)=>{
    if(e.key === "Enter"){
        searchFunc();
    }
})

function searchFunc(){
    if(input.value.trim() === ""){
        alert("請輸入作物名稱！");
        return;
    }
    type = "search";
    getList();
    showResult.innerHTML = `以下為關鍵字「${input.value}」的搜尋結果`;
    input.value = "";
}

// 排序資料
select.addEventListener("change",(e)=>{
    selectChange(e.target.value,"up");
})
mobileSelect.addEventListener("change",(e)=>{
    selectChange(e.target.value,"up");
})

// 進階排序資料
sortAdvanced.addEventListener("click",(e)=>{
    if(e.target.nodeName === "I"){
        let sortPrice = e.target.dataset.price;
        let sortCaret = e.target.dataset.sort;
        select.value = sortPrice;
        selectChange(sortPrice,sortCaret);
    }
})

function selectChange(sortPrice,sortCaret){
    switch (sortCaret){
        case "up":
            filterData.sort((a,b)=> b[sortPrice]-a[sortPrice]);
            break;
        case "down":
            filterData.sort((a,b)=> a[sortPrice]-b[sortPrice]);
            break;
    }
    renderData();
}