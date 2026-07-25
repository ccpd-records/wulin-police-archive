
// =================================
// 霧林市警政檔案庫
// Archive System Script
// =================================



// =================================
// 案件資料庫
// =================================


const archiveCases = [

    {

        id:
        "WL-001",


        title:
        "紫藤花畫室失蹤事件",


        status:
        "調查中",


        date:
        "2026-07-01",


        level:
        "機密"


    },


    {

        id:
        "WL-002",


        title:
        "夜間無名電話紀錄",


        status:
        "已結案",


        date:
        "2026-06-15",


        level:
        "一般"


    },


    {

        id:
        "WL-003",


        title:
        "霧林舊城檔案遺失案",


        status:
        "封存",


        date:
        "2026-05-20",


        level:
        "機密"


    }


];






// =================================
// 系統初始化
// =================================


document.addEventListener(
"DOMContentLoaded",
()=>{


    loadDashboard();


    loadLatestCases();


    recordSession(
        "PAGE_VIEW",
        "首頁"
    );


    checkHiddenArchive();



});







// =================================
// Dashboard 數據
// =================================


function loadDashboard(){



    const total =
    document.getElementById(
        "caseCount"
    );



    const archive =
    document.getElementById(
        "archiveCount"
    );



    const open =
    document.getElementById(
        "openCount"
    );




    if(total){

        total.textContent =
        archiveCases.length;

    }



    if(archive){


        archive.textContent =
        archiveCases.filter(
        item=>
        item.status==="封存"
        )
        .length;


    }



    if(open){


        open.textContent =
        archiveCases.filter(
        item=>
        item.status==="調查中"
        )
        .length;


    }


}








// =================================
// 最新案件列表
// =================================


function loadLatestCases(){



    const table =
    document.getElementById(
        "latestCases"
    );



    if(!table){

        return;

    }



    table.innerHTML = "";



    archiveCases.forEach(
    item=>{


        const row =
        document.createElement(
            "tr"
        );



        row.innerHTML = `

        <td class="case-number">

        ${item.id}

        </td>


        <td>

        ${item.title}

        </td>


        <td>

        <span class="${getStatusClass(item.status)}">

        ${item.status}

        </span>

        </td>


        <td>

        ${item.date}

        </td>

        `;



        table.appendChild(
            row
        );


    });


}





// =================================
// 狀態樣式
// =================================


function getStatusClass(
status
){


    switch(status){


        case "調查中":

            return "status status-open";



        case "已結案":

            return "status status-closed";



        case "封存":

            return "status status-archive";



        default:

            return "status";


    }


}


// =================================
// Session 紀錄系統（GitHub Pages版）
// 使用 localStorage 模擬玩家操作紀錄
// =================================


function recordSession(
    action,
    detail
){


    const sessionData =
    JSON.parse(
        localStorage.getItem(
            "wulin_session"
        )
    )
    ||
    [];



    sessionData.push({

        time:
        new Date()
        .toLocaleString(
            "zh-TW"
        ),


        action:
        action,


        detail:
        detail


    });



    localStorage.setItem(

        "wulin_session",

        JSON.stringify(
            sessionData
        )

    );


}







// =================================
// 隱藏封存檔案入口
// ?archive=true
// =================================


function checkHiddenArchive(){


    const params =
    new URLSearchParams(
        window.location.search
    );



    if(
        params.get("archive")
        ===
        "true"
    ){


        showArchiveNotice();



    }


}





function showArchiveNotice(){


    const notice =
    document.createElement(
        "section"
    );



    notice.className =
    "document-box";



    notice.innerHTML = `


    <h2 class="document-title">

    封存檔案存取

    </h2>


    <div class="document-meta">

    FILE ACCESS:
    ARCHIVE MODE

    </div>



    <p>

    此資料並未列入公開案件列表。

    </p>



    <p>

    檔案編號：

    <span class="case-number">

    WL-000-ARCHIVE

    </span>

    </p>



    <p>

    狀態：

    <span class="classified">

    機密

    </span>

    </p>


    `;



    document
    .querySelector("main")
    .appendChild(
        notice
    );



    recordSession(
        "ACCESS_ARCHIVE",
        "開啟封存檔案"
    );


}








// =================================
// 關鍵字觸發
// ARG 隱藏機制
// =================================


document.addEventListener(
"keydown",
event=>{


    if(
        event.key === "/"
    ){


        const keyword =
        prompt(
            "輸入檔案搜尋關鍵字"
        );



        hiddenSearch(
            keyword
        );


    }


});







function hiddenSearch(
keyword
){


    if(
        !keyword
    ){

        return;

    }



    keyword =
    keyword.toLowerCase();



    recordSession(
        "SEARCH",
        keyword
    );





    switch(keyword){



        case "紫藤":


            alert(
            "搜尋結果異常：\n\n資料存在矛盾紀錄。"
            );


            break;





        case "0713":


            alert(
            "警告：\n此關鍵字無權限查詢。"
            );


            break;





        case "第七號":


            alert(
            "附錄資料已解鎖。"
            );


            break;





        default:


            alert(
            "查無相關公開資料。"
            );


    }


}






// =================================
// 取得玩家觀察紀錄
// Phase 6 使用
// =================================


function getSessionRecords(){


    return JSON.parse(

        localStorage.getItem(
            "wulin_session"
        )

    )
    ||
    [];

}






// =================================
// Debug
// =================================


console.log(
`
Wulin City Police Archive System
ONLINE

Session Tracking:
LOCAL MODE
`
);
