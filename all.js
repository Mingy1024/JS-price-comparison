const url = "https://hexschool.github.io/js-filter-data/data.json";
const showList = document.querySelector(".showList");
let data = [];

// 串接 API & 顯示資料
function getData(){
    axios.get(url)
    .then((res)=>{
        data = res.data;
        renderData();
    })
}
getData();

function renderData(){
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