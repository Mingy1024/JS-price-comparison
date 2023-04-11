const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.querySelector(".showList");
const buttonGroup = document.querySelector(".button-group");
const search = document.querySelector(".search");
const input = document.querySelector("#crop");
const select = document.querySelector("#js-select");
const sortAdvanced = document.querySelector(".js-sort-advanced");
let data = [];

// 串接 API & 顯示資料
function getData(){
    axios.get(url)
    .then((res)=>{
        // 過濾data中作物名稱為null或空字串的物件
        data = res.data.filter((item)=> item["作物名稱"] !== "" && item["作物名稱"] !== null);
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
    let filterData  = [];
    filterData = data.filter((item)=> item["作物名稱"].match(input.value));
    input.value = "";

    if(filterData.length === 0){
        showList.innerHTML = '<tr><td colspan="6" class="text-center p-3">查詢不到交易資訊QQ</td></tr>';
    }else{
        renderData(filterData);
    }
}

// 排序資料
select.addEventListener("change",(e)=>{
    switch (e.target.value) {
        case "依上價排序":
            selectChange("上價");
            break;
        case "依中價排序":
            selectChange("中價");
            break;
        case "依下價排序":
            selectChange("下價");
            break;
        case "依平均價排序":
            selectChange("平均價");
            break;
        case "依交易量排序":
            selectChange("交易量");
            break;
        default:
    }
})

function selectChange(value){
    data.sort((a,b)=> a[value]-b[value]);
    renderData(data);
}

// 進階排序資料
sortAdvanced.addEventListener("click",(e)=>{
    if(e.target.nodeName === "I"){
        let sortPrice = e.target.dataset.price;
        let sortCaret = e.target.dataset.sort;
        if(sortCaret === "up"){
            data.sort((a,b)=> b[sortPrice]-a[sortPrice]);
        }else{
            data.sort((a,b)=> a[sortPrice]-b[sortPrice]);
        }
        renderData(data);
    }
})