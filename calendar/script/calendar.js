'use strict'
const dbJSON = {
  d_2021_9 : '{"13":{"430":["기상","커피마시기"],"450":["에이콘아카데미"],"1080":["퇴근"],"1170":["집 도착"],"1328":["취침"]},"15":{"360":["자차","카","타파하"]}}'
  // d_2021_9 : {
  //   13: {
  //     430: ["기상","커피마시기"],
  //     450: ["에이콘아카데미"],
  //     1080: ["퇴근"],
  //     1170: ["집 도착"],
  //     1328: ["취침"]
  //   },
  //   15: {
  //     360: ["자차","카","타파하"]
  //   }
  // }
}
// Selector
const calendarControler = document.getElementById("calendarControler");
const calendarTitle = calendarControler.getElementsByClassName("title")[0];
const calendarTable = document.getElementById("calendarTable");
const calendarDateEl = calendarTable.getElementsByTagName("td");
const calendarSchedule = calendarTable.getElementsByClassName("schedule");
const crtMonthIpt = calendarControler.getElementsByClassName("btn-container")[0].children[2];
const preMonthBtn = calendarControler.getElementsByClassName("btn-container")[0].children[0];
const nextMonthBtn = calendarControler.getElementsByClassName("btn-container")[0].children[1];
// modal
const calendarModal = document.getElementById("calendarModal");
const modalDate = calendarModal.getElementsByClassName("date")[0];
const modalForm = document.forms.modalForm;
const modalSchedule = modalForm.getElementsByClassName("modal-schedule")[0];

/////////////////////////////////////////////////////////////////////////

// js

// calendar constructor & function
const Calendar = function (year=0, month=1, scheduler=new Scheduler(year, month)) {
  this.year = year;
  this.month = month;
  this.firstDay = new Date(year, month-1, 1).getDay();
  this.lastDate = new Date(year, month, 0).getDate();
  this.preMonthStartDate = new Date(year, month, 1-this.firstDay).getDate();
  this.title = `${year}년 ${month}월`;
  // this.value = year+"-"+(month<10 ? "0"+month : month);
  this.value = year + "-" + (month + "").padStart(2, 0);
  this.preValue = `${month==1 ? year-1 : year}-${month==1 ? 12 : month-1}`;
  this.nextValue = `${year + (month==12 ? 1 : 0)}-${month==12 ? 1 : month+1}`;
  this.schedule = undefined;
  this.scheduler = scheduler;
  
  this.setCalendar = (year, month) => {
    year = Number(year);
    month = Number(month);
    
    this.year = year;
    this.month = month;
    this.firstDay = new Date(year, month-1, 1).getDay();
    this.lastDate = new Date(year, month, 0).getDate();
    this.preMonthStartDate = new Date(year, month, 1-this.firstDay).getDate();
    this.title = `${year}년 ${month}월`;
    this.value = year+"-" +(month+"").padStart(2, 0);
    this.preValue = `${month==1 ? year-1 : year}-${month==1 ? 12 : month-1}`;
    this.nextValue = `${year+(month==12 ? 1 : 0)}-${month==12 ? 1 : month+1}`;
  };
  this.setSchedule = schedule => {
    try {
      this.schedule = JSON.parse(schedule);
    }
    catch(e) {
      console.log(e);
      this.schedule = {};
      // dbJSON[`d_${this.year}_${this.month}`] = JSON.stringify(this.schedule);
    }
  };
  this.setScheduler = scheduler => {
    this.scheduler = scheduler;
  };
}
const Scheduler = function(year=0, month=1, date=1) {
  this.year = year;
  this.month = month;
  this.date = date;
  this.title = `${this.year}년 ${this.month}월 ${this.date}일`;
  this.schedule = undefined;
  this.target = undefined;

  this.setScheduler = (year=0, month=1, date=1) => {
    this.year = year;
    this.month = month;
    this.date = date;
    this.title = `${this.year}년 ${this.month}월 ${this.date}일`;
    this.schedule = undefined;
    this.target = undefined;
  };
  this.setDate = date => {
    this.date = date;
    this.title = `${this.year}년 ${this.month}월 ${this.date}일`;
  }
  this.setSchedule = schedule => {
    try {
      this.schedule = JSON.parse(schedule);
    }
    catch (e) {
      console.log(e);
      this.schedule = {};
    }
  }
  this.setTarget = target => {
    this.target = target;
  };
};
const calendarPrint = function (calendar) {
  calendarTitle.innerText = calendar.title;
  
  crtMonthIpt.value = calendar.value;
  preMonthBtn.value = calendar.preValue;
  nextMonthBtn.value = calendar.nextValue;
  
  let activeFlag,
    firstIdx = calendar.firstDay,
      lastIdx = calendar.firstDay+calendar.lastDate-1;

  Array.from(calendarDateEl).forEach((item, i) => {
    let date = item.getElementsByClassName("date")[0];

    activeFlag = (i<firstIdx || i>lastIdx) ? false : true;

    if(calendarSchedule[i].children.length) {
      Array.from(calendarSchedule[i].children).forEach(item => {
        item.remove();
      });
    }

    if(activeFlag) {
      date.innerText = i-calendar.firstDay+1;
      item.value = i-calendar.firstDay+1;

      if (calendar.schedule[date.innerText] !== undefined) {
        for (let key in calendar.schedule[date.innerText]) {
          let scheduleList = document.createElement("li");
          scheduleList.innerText = calendar.schedule[date.innerText][key];
          calendarSchedule[i].append(scheduleList);
        }
      }

      item.classList.remove("disable");
      item.classList.add("active");
      item.addEventListener("click", calendarClickEventHandler.date);
    }
    else {
      if (i < firstIdx) date.innerText = i + calendar.preMonthStartDate;
      else date.innerText = i - lastIdx;
      item.value = undefined;

      item.classList.remove("active");
      item.classList.add("disable");
      item.removeEventListener("click", calendarClickEventHandler.date);
    }
  });
};
const calendarClickEventHandler = {
  date: e => {
    calendar.scheduler.setTarget(e.currentTarget);
    calendar.scheduler.setDate(e.currentTarget.value);
    
    let date = calendar.scheduler.date;
    calendar.scheduler.setSchedule(JSON.stringify(calendar.schedule[date]));
    
    modalForm.addTime.value = "00:00";
    modalForm.addSchedule.value = "";
    modalForm.addSchedule.placeholder = "추가 스케줄 입력";
    modalDate.innerText = calendar.scheduler.title;

    let dateSchedule = calendar.scheduler.schedule;
    if (dateSchedule !== undefined) {
      for(let time in dateSchedule) {
        dateSchedule[time].forEach((todo,i) => {
          let scheduleList = document.createElement("li"),
              date = document.createElement("b"),
              schedule = document.createElement("span"),
              deleteBtn = document.createElement("button");
  
          date.classList.add("time");
          date.innerText = (Number.parseInt(time/60)+"").padStart(2,0)+":"+ (time%60+"").padStart(2,0);
  
          schedule.innerText = todo;
  
          deleteBtn.type = "button";
          deleteBtn.value = `{"time":${time},"index":${i}}`;
          deleteBtn.classList.add("delete");
          deleteBtn.innerText = "x";
          deleteBtn.onclick = calendarClickEventHandler.modalDltSchedule;
  
          scheduleList.append(date);
          scheduleList.append(schedule);
          scheduleList.append(deleteBtn);
  
          modalSchedule.append(scheduleList);
        });
      }
    }
    else calendar.scheduler.setSchedule({});

    calendarModal.style.display = "block";
  },
  changeMonth: e => {
    let year = e.target.value.split("-")[0],
        month = e.target.value.split("-")[1];
    calendar.setCalendar(year, month);
    calendar.scheduler.setScheduler(year,month);
    // ajax
    calendar.setSchedule(dbJSON[`d_${calendar.year}_${calendar.month}`]);
    calendarPrint(calendar);
  },
  modalAddSchedule: () => {
    let scheduleList = document.createElement("li"),
        time = document.createElement("b"),
        schedule = document.createElement("span"),
        deleteBtn = document.createElement("button");

    let hour = Number(modalForm.addTime.value.split(":")[0]),
        minute = Number(modalForm.addTime.value.split(":")[1]);
    let dateSchedule = calendar.scheduler.schedule,
        timeKey = hour*60+minute;

    if (dateSchedule[timeKey]===undefined) {
      dateSchedule[timeKey] = [];
    }
    dateSchedule[timeKey].push(modalForm.addSchedule.value);

    time.classList.add("time");
    time.innerText = modalForm.addTime.value;

    schedule.innerText = modalForm.addSchedule.value;

    deleteBtn.type = "button";
    deleteBtn.value = `{"time":${timeKey},"index":${dateSchedule[timeKey].length-1}}`;
    deleteBtn.classList.add("delete");
    deleteBtn.innerText = "x";
    deleteBtn.onclick = calendarClickEventHandler.modalDltSchedule;

    scheduleList.append(time);
    scheduleList.append(schedule);
    scheduleList.append(deleteBtn);

    let timeArr = Array.from(modalForm.getElementsByClassName("time"));
    if (timeArr.length&&time.innerText < timeArr[timeArr.length-1].innerText) {
      for (let el of timeArr) {
        if (time.innerText<el.innerText) {
          el.parentElement.before(scheduleList);
          break;
        }
      }
    }
    else modalSchedule.append(scheduleList);


    modalForm.addTime.value = "00:00";
    modalForm.addSchedule.value = "";
  },
  modalDltSchedule: e => {
    let key = JSON.parse(e.target.value),
        el = e.target.parentElement,
        schedule = calendar.scheduler.schedule;
    
    schedule[key.time].splice(key.index, 1);
    if (!schedule[key.time].length) {
      delete schedule[key.time];
    }

    let nextEl = el.nextElementSibling;
    while(nextEl!==null) {
      let nextBtn = nextEl.lastElementChild;
      let nextKey = JSON.parse(nextBtn.value);

      if(key.time!=nextKey.time) break;
      
      nextKey.index--;
      nextBtn.value = JSON.stringify(nextKey);
      
      nextEl = nextEl.nextElementSibling;
    }

    el.remove();
  },
  modalSubmit: () => {
    let scheduler = calendar.scheduler;
    let schedule_ul = scheduler.target.getElementsByClassName("schedule")[0];

    Array.from(schedule_ul.children).forEach(item => {
      item.remove();
    });

    if (scheduler.schedule!==undefined) {
      for (let time in scheduler.schedule) {
        scheduler.schedule[time].forEach(todo => {
          let scheduleList = document.createElement("li");

          scheduleList.innerText = todo;

          schedule_ul.append(scheduleList);
        });
      }

      calendar.schedule[scheduler.date] = scheduler.schedule;
      if (!Object.keys(calendar.schedule[scheduler.date]).length) {
        delete calendar.schedule[scheduler.date];
      }
    }

    // ajax
    dbJSON[`d_${calendar.year}_${calendar.month}`] = JSON.stringify(calendar.schedule);

    calendarClickEventHandler.modalClose();
  },
  modalClose: () => {
    modalDate.innerText = "";
    Array.from(modalSchedule.children).forEach(el => {
      el.remove();
    });

    calendar.scheduler.setScheduler(calendar.year,calendar.month);

    calendarModal.style.display = "none";
  }
}
// execute
const calendar = new Calendar(new Date().getFullYear(), new Date().getMonth()+1);
// ajax
calendar.setSchedule(dbJSON[`d_${calendar.year}_${calendar.month}`]);
calendarPrint(calendar);
// event
preMonthBtn.onclick = calendarClickEventHandler.changeMonth;
nextMonthBtn.onclick = calendarClickEventHandler.changeMonth;
crtMonthIpt.onchange = calendarClickEventHandler.changeMonth;
modalForm.addBtn.onclick = calendarClickEventHandler.modalAddSchedule;
modalForm.submitBtn.onclick = calendarClickEventHandler.modalSubmit;
modalForm.closeBtn.onclick = calendarClickEventHandler.modalClose;
window.onclick = function(e) {
  if(e.target == calendarModal) {
    // initModal();
    calendarClickEventHandler.modalClose();
  }
}