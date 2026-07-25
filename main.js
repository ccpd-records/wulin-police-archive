

// =========================
// 霧林市警政檔案庫
// Main System Script
// =========================



// =========================
// Database
// =========================


const cases = [

    {
        id: "WL-001",

        title: "紫藤花畫室失蹤事件",

        status: "open",

        description:
        "一名市民於霧林山區畫室失蹤，目前仍持續調查中。",

        persons:
        [
            "葉瑄",
            "白色檔案人物A"
        ],

        evidence:
        [
            "E-001 畫室殘留筆記",
            "E-002 紫藤花瓣樣本"
        ],

        date:
        "2026-07-01"

    },


    {

        id:
        "WL-002",

        title:
        "夜間無名電話紀錄",

        status:
        "closed",

        description:
        "多起匿名電話事件已確認來源。",

        persons:
        [
            "未知聯絡者"
        ],

        evidence:
        [
            "E-003 通話紀錄"
        ],

        date:
        "2026-06-15"

    },


    {

        id:
        "WL-003",

        title:
        "霧林舊城檔案遺失案",

        status:
        "unknown",

        description:
        "部分歷史資料缺失，原因不明。",

        persons:
        [
            "前任管理員"
        ],

        evidence:
        [
            "E-004 損毀文件"
        ],

        date:
        "2026-05-20"

    }

];





const persons = [


    {

        name:
        "葉瑄",

        role:
        "關係人物",

        description:
        "與多起案件存在關聯，目前資料限制公開。",

        cases:
        [
            "WL-001"
        ]

    },


    {

        name:
        "白色檔案人物A",

        role:
        "調查對象",

        description:
        "身份資料尚未完全確認。",

        cases:
        [
            "WL-001"
        ]

    },


    {

        name:
        "未知聯絡者",

        role:
        "匿名人物",

        description:
        "曾留下多筆通訊紀錄。",

        cases:
        [
            "WL-002"
        ]

    }


];





const evidences = [


    {

        id:
        "E-001",

        name:
        "畫室殘留筆記",

        related:
        "WL-001",

        description:
        "發現於紫藤花畫室內的手寫文件。"

    },


    {

        id:
        "E-002",

        name:
        "紫藤花瓣樣本",

        related:
        "WL-001",

        description:
        "採集於案發現場。"

    },


    {

        id:
        "E-003",

        name:
        "通話紀錄",

        related:
        "WL-002",

        description:
        "匿名電話相關資料。"

    },


    {

        id:
        "E-004",

        name:
        "損毀文件",

        related:
        "WL-003",

        description:
        "部分無法辨識的舊資料。"

    }


];





// =========================
// Initialize
// =========================


document.addEventListener(
"DOMContentLoaded",
()=>{


    updateDashboard();


    renderCases();


    renderPersons();


    renderEvidence();


    renderRecent();


    setupNavigation();


    setupSearch();


    setupModal();


});


// =========================
// Dashboard
// =========================


function updateDashboard(){


    const caseCount =
    document.getElementById("caseCount");


    const personCount =
    document.getElementById("personCount");


    const evidenceCount =
    document.getElementById("evidenceCount");



    if(caseCount){

        caseCount.textContent =
        cases.length;

    }



    if(personCount){

        personCount.textContent =
        persons.length;

    }



    if(evidenceCount){

        evidenceCount.textContent =
        evidences.length;

    }


}





// =========================
// Render Cases
// =========================


function renderCases(
    filter = cases
){


    const container =
    document.getElementById(
        "caseList"
    );


    if(!container){

        return;

    }



    container.innerHTML = "";



    filter.forEach(
    item => {


        const div =
        document.createElement(
            "div"
        );


        div.className =
        "archive-item";



        div.innerHTML = `


            <h3>
            ${item.title}
            </h3>


            <p class="case-number">
            案件編號：
            ${item.id}
            </p>


            <p>
            日期：
            ${item.date}
            </p>


            <span class="status ${item.status}">
            ${getStatusText(item.status)}
            </span>


        `;



        div.addEventListener(
        "click",
        ()=>{

            openCaseModal(item);

        });



        container.appendChild(div);


    });


}





function getStatusText(status){


    switch(status){


        case "open":

            return "調查中";


        case "closed":

            return "已結案";


        default:

            return "未分類";


    }

}





// =========================
// Render Persons
// =========================


function renderPersons(
    filter = persons
){


    const container =
    document.getElementById(
        "personList"
    );


    if(!container){

        return;

    }



    container.innerHTML = "";



    filter.forEach(
    person=>{


        const div =
        document.createElement(
            "div"
        );



        div.className =
        "archive-item";



        div.innerHTML = `


        <h3>
        ${person.name}
        </h3>


        <p>
        身份：
        ${person.role}
        </p>


        `;



        div.addEventListener(
        "click",
        ()=>{

            openPersonModal(person);

        });



        container.appendChild(div);



    });


}





// =========================
// Render Evidence
// =========================


function renderEvidence(){


    const container =
    document.getElementById(
        "evidenceList"
    );



    if(!container){

        return;

    }



    container.innerHTML = "";



    evidences.forEach(
    evidence=>{


        const div =
        document.createElement(
            "div"
        );



        div.className =
        "archive-item";



        div.innerHTML = `


        <h3>
        ${evidence.name}
        </h3>


        <p>
        證物編號：
        ${evidence.id}
        </p>


        <p>
        關聯案件：
        ${evidence.related}
        </p>


        `;



        container.appendChild(div);


    });


}





// =========================
// Recent Update
// =========================


function renderRecent(){


    const list =
    document.getElementById(
        "recentList"
    );


    if(!list){

        return;

    }



    list.innerHTML = "";



    cases
    .slice(0,5)
    .forEach(
    item=>{


        const li =
        document.createElement(
            "li"
        );


        li.textContent =
        `${item.date} - ${item.title}`;



        list.appendChild(li);


    });


}


// =========================
// Navigation
// =========================


function setupNavigation(){


    const buttons =
    document.querySelectorAll(
        ".main-nav button"
    );


    const pages =
    document.querySelectorAll(
        ".page"
    );



    buttons.forEach(
    button=>{


        button.addEventListener(
        "click",
        ()=>{


            const target =
            button.dataset.page;



            pages.forEach(
            page=>{


                page.classList.remove(
                    "active"
                );


            });



            const targetPage =
            document.getElementById(
                target
            );



            if(targetPage){

                targetPage.classList.add(
                    "active"
                );

            }



            buttons.forEach(
            btn=>{

                btn.classList.remove(
                    "active"
                );

            });



            button.classList.add(
                "active"
            );



        });


    });


}







// =========================
// Search System
// =========================


function setupSearch(){



    const caseSearch =
    document.getElementById(
        "caseSearch"
    );


    const caseStatus =
    document.getElementById(
        "caseStatus"
    );



    if(caseSearch){


        caseSearch.addEventListener(
        "input",
        filterCases
        );


    }



    if(caseStatus){


        caseStatus.addEventListener(
        "change",
        filterCases
        );


    }





    const personSearch =
    document.getElementById(
        "personSearch"
    );



    if(personSearch){


        personSearch.addEventListener(
        "input",
        ()=>{


            const keyword =
            personSearch.value
            .toLowerCase();



            const result =
            persons.filter(
            person=>{


                return (

                    person.name
                    .toLowerCase()
                    .includes(keyword)

                    ||

                    person.role
                    .toLowerCase()
                    .includes(keyword)

                );


            });



            renderPersons(result);



        });


    }







    const globalSearch =
    document.getElementById(
        "globalSearch"
    );



    if(globalSearch){


        globalSearch.addEventListener(
        "input",
        ()=>{


            performGlobalSearch(
                globalSearch.value
            );


        });


    }



}






function filterCases(){


    const keyword =
    document
    .getElementById(
        "caseSearch"
    )
    .value
    .toLowerCase();



    const status =
    document
    .getElementById(
        "caseStatus"
    )
    .value;




    const result =
    cases.filter(
    item=>{


        const matchText =
        item.title
        .toLowerCase()
        .includes(keyword);



        const matchStatus =
        status === "all"

        ||

        item.status === status;



        return (
            matchText
            &&
            matchStatus
        );


    });



    renderCases(result);


}








function performGlobalSearch(
    keyword
){


    const container =
    document.getElementById(
        "searchResult"
    );



    if(!container){

        return;

    }



    keyword =
    keyword
    .toLowerCase();



    container.innerHTML = "";



    if(keyword.trim()===""){

        return;

    }





    const results = [];



    cases.forEach(
    item=>{


        if(
            item.title
            .toLowerCase()
            .includes(keyword)
        ){


            results.push(
            `案件：
            ${item.title}`
            );


        }


    });




    persons.forEach(
    person=>{


        if(
            person.name
            .toLowerCase()
            .includes(keyword)
        ){


            results.push(
            `人物：
            ${person.name}`
            );


        }


    });





    evidences.forEach(
    evidence=>{


        if(
            evidence.name
            .toLowerCase()
            .includes(keyword)
        ){


            results.push(
            `證物：
            ${evidence.name}`
            );


        }


    });





    if(results.length===0){


        container.innerHTML =
        "<p>沒有找到相關資料。</p>";


        return;


    }





    results.forEach(
    text=>{


        const p =
        document.createElement(
            "p"
        );


        p.className =
        "archive-item";


        p.textContent =
        text;


        container.appendChild(p);


    });


}


// =========================
// Modal System
// =========================


function setupModal(){


    const caseModal =
    document.getElementById(
        "caseModal"
    );


    const personModal =
    document.getElementById(
        "personModal"
    );



    const closeCase =
    document.querySelector(
        ".close-modal"
    );


    const closePerson =
    document.querySelector(
        ".close-person-modal"
    );




    if(closeCase){


        closeCase.addEventListener(
        "click",
        ()=>{


            caseModal.classList.remove(
                "show"
            );


        });


    }





    if(closePerson){


        closePerson.addEventListener(
        "click",
        ()=>{


            personModal.classList.remove(
                "show"
            );


        });


    }






    window.addEventListener(
    "click",
    event=>{


        if(event.target === caseModal){


            caseModal.classList.remove(
                "show"
            );


        }



        if(event.target === personModal){


            personModal.classList.remove(
                "show"
            );


        }


    });


}







// =========================
// Case Modal
// =========================


function openCaseModal(item){


    const modal =
    document.getElementById(
        "caseModal"
    );



    document.getElementById(
        "modalCaseTitle"
    )
    .textContent =
    item.title;




    document.getElementById(
        "modalCaseId"
    )
    .textContent =
    item.id;




    document.getElementById(
        "modalCaseStatus"
    )
    .textContent =
    getStatusText(
        item.status
    );




    document.getElementById(
        "modalCaseDescription"
    )
    .textContent =
    item.description;




    const personsList =
    document.getElementById(
        "modalCasePersons"
    );



    personsList.innerHTML = "";



    item.persons.forEach(
    person=>{


        const li =
        document.createElement(
            "li"
        );


        li.textContent =
        person;


        personsList.appendChild(
            li
        );


    });






    const evidenceList =
    document.getElementById(
        "modalCaseEvidence"
    );



    evidenceList.innerHTML = "";



    item.evidence.forEach(
    evidence=>{


        const li =
        document.createElement(
            "li"
        );


        li.textContent =
        evidence;


        evidenceList.appendChild(
            li
        );


    });





    modal.classList.add(
        "show"
    );


}







// =========================
// Person Modal
// =========================


function openPersonModal(person){


    const modal =
    document.getElementById(
        "personModal"
    );




    document.getElementById(
        "modalPersonName"
    )
    .textContent =
    person.name;





    document.getElementById(
        "modalPersonRole"
    )
    .textContent =
    person.role;





    document.getElementById(
        "modalPersonDescription"
    )
    .textContent =
    person.description;





    const caseList =
    document.getElementById(
        "modalPersonCases"
    );



    caseList.innerHTML = "";



    person.cases.forEach(
    item=>{


        const li =
        document.createElement(
            "li"
        );


        li.textContent =
        item;


        caseList.appendChild(
            li
        );


    });





    modal.classList.add(
        "show"
    );


}








// =========================
// System Message
// =========================


function showAlert(
    message
){


    const alert =
    document.getElementById(
        "systemAlert"
    );



    if(!alert){

        return;

    }



    alert.textContent =
    message;



    alert.classList.add(
        "show"
    );



    setTimeout(
    ()=>{


        alert.classList.remove(
            "show"
        );


    },
    2500
    );


}





// =========================
// Developer Console
// =========================


console.log(
`
霧林市警政檔案庫系統已啟動。
Wulin Police Archive System Online.
`
);
