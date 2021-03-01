//create list
function createKey(str) {
    let hash = '';
    for (let key in str) {
        if (key >= 0 && key < str.length)
            hash += str.charCodeAt(key) * Math.pow(10, str.length - key);
    }
    return Math.log10(hash);
}

function createWork(title, ts, te, ds, de, mark) {
    let list = `
    <div class="list-work">
        <input type="checkbox" name="" id="${createKey(title)}">
        <label class="work-title" for="${createKey(title)}">${title}</label>
        <p class="work-start">START: <br> ${ts} <br> ${ds}</p>
        <p class="work-end">END: <br> ${te} <br> ${de}</p>
        <div class="remove" ><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg></div>
    </div>
    `;
    if (mark != true)
        document.querySelector('.content-main').insertAdjacentHTML('beforeend', list);
    else {
        list = list.substr(0, 44) + 'checked ' + list.substr(44);
        document.querySelector('.content-main').insertAdjacentHTML('beforeend', list);
    }
}

//store list
let LIST = [];

//create prototype to store list

Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
};

//show created list
LIST = LIST.concat(localStorage.getObj('list'));

for (let key of LIST) {
    if (key !== null)
        createWork(key["title"], key["tStart"], key["tEnd"], key["dStart"], key["dEnd"], key["mark"]);
};

//add
let submitButton = document.querySelector('.top-create>button[type="submit"]'); //submit button

function addWork() {
    let text = document.querySelector('#title').value;
    let timeStart = document.querySelector('#time-start').value;
    let timeEnd = document.querySelector('#time-end').value;
    let dateStart = document.querySelector('#date-start').value;
    let dateEnd = document.querySelector('#date-end').value;

    //obj list
    let list = {
        title: ``,
        tStart: ``,
        tEnd: ``,
        dStart: ``,
        dEnd: ``,
        mark: false
    };
    if (timeStart > timeEnd)
        window.alert("time not valid!!!");

    if (dateStart > dateEnd)
        window.alert("date not valid!!!");

    if (text != '' && dateStart <= dateEnd) {
        if (timeStart <= timeEnd) {
            createWork(text, timeStart, timeEnd, dateStart, dateEnd);
            list.title = text;
            list.tStart = timeStart;
            list.tEnd = timeEnd;
            list.dStart = dateStart;
            list.dEnd = dateEnd;
            LIST.push(list);
            localStorage.setObj('list', LIST);
        }
    } else {
        window.alert('Please fill in title-field!!!');
    }

    document.querySelector('#title').value = '';
}
submitButton.addEventListener('click', addWork);

//checkbox
var listCheck = document.querySelectorAll('input[type ="checkbox"]');
listCheck.forEach(function(e, index) {
    e.onclick = () => {
        LIST[index].mark = (LIST[index].mark == true) ? false : true;
        localStorage.setObj('list', LIST);
    }
});

//remove icon
let remove_icons = document.querySelectorAll('.remove');
remove_icons.forEach(function(event, index) {
    event.onclick = () => {
        event.parentNode.remove()
        LIST.splice(index, 1)
        localStorage.setObj('list', LIST)
    }
})

//check leapYear
function checkLeapYear(year) {
    return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}

function getDays(m, y) {
    switch (m) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 9:
        case 11:
            {
                return 31
                break;
            }
        case 2:
            {
                if (checkLeapYear(y)) return 29;
                else return 28;
                break;
            }
        default:
            {
                return 30;
                break;
            }

    }
}

//filte on day current
var day = document.querySelector('.date');
var week = document.querySelector('.week');
var month = document.querySelector('.month');
var year = document.querySelector('.year');

const now = new Date();
time_space = document.querySelectorAll('.time');

time_space.forEach(function(event, index) {
    event.onclick = (e) => {
        let list_work = document.querySelectorAll('.list-work');
        list_work.forEach((e) => e.remove())
        e.preventDefault();
        switch (index) {
            case 0:
                {
                    for (key of LIST) {
                        if (key.dStart != '' && key.dEnd != '') {
                            let yearN = now.getFullYear();
                            let yearE = Number(key.dEnd.substr(0, 4));
                            let monthN = now.getMonth();
                            let monthE = Number(key.dEnd.substr(5, 2));
                            let dateN = now.getDate();
                            let dateE = Number(key.dEnd.substr(8, 2));
                            if (yearN === yearE && monthN === (monthE - 1) && dateN === dateE) {
                                createWork(key.title, key.tStart, key.tEnd, key.dStart, key.dEnd, key.mark);
                            }
                        }
                    }
                    break;
                }
            case 1:
                {
                    for (key of LIST) {
                        if (key.dStart != '' && key.dEnd != '') {
                            let date = new Date(key.dEnd);
                            let dayInWeek = now.getDay();
                            var s = new Date();
                            s.setDate(s.getDate() - dayInWeek);
                            var e = new Date();
                            e.setDate(e.getDate() + (7 - dayInWeek));
                            if (
                                s <= date && date <= e
                            )
                                createWork(key.title, key.tStart, key.tEnd, key.dStart, key.dEnd, key.mark);
                        }
                    }
                    break;
                }
            case 2:
                {
                    for (key of LIST) {
                        if (key.dStart != '' && key.dEnd != '') {
                            let yearN = now.getFullYear();
                            let yearE = Number(key.dEnd.substr(0, 4));
                            let monthN = now.getMonth();
                            let monthE = Number(key.dEnd.substr(5, 2));
                            if (yearN == yearE && monthN == (monthE - 1)) {
                                createWork(key["title"], key["tStart"], key["tEnd"], key["dStart"], key["dEnd"], key["mark"]);
                            }
                        }
                    }
                    break;
                }
            case 3:
                {
                    for (key of LIST) {
                        if (key.dStart != '' && key.dEnd != '') {
                            let yearN = now.getFullYear();
                            let yearE = Number(key.dEnd.substr(0, 4));
                            if (yearN == yearE) {
                                createWork(key["title"], key["tStart"], key["tEnd"], key["dStart"], key["dEnd"], key["mark"]);
                            }
                        }
                    }
                    break;
                }
            default:
                {
                    window.location.reload();
                    break;
                }
        }
    }
})