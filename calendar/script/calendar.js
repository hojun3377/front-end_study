'use strict'
// db json
const dbJSON = {
  // d_2021_9: '{"2":{"0":["sdf","dsf"],"2":["asd","ddd"]}}'
}

/////////////////////////////////////////////////////////////////////////

// Selector

// calendar
const calendarControler = document.getElementById("calendarControler");
const calendarTitle = calendarControler.getElementsByClassName("title")[0];
const calendarTable = document.getElementById("calendarTable");
const calendarDateEl = calendarTable.getElementsByTagName("td");
const calendarSchedule = calendarTable.getElementsByClassName("schedule");
const crtMonthIpt = calendarControler.getElementsByClassName("btn-container")[0].children[1];
const preMonthBtn = calendarControler.getElementsByClassName("btn-container")[0].children[0];
const nextMonthBtn = calendarControler.getElementsByClassName("btn-container")[0].children[2];
// modal
const calendarModal = document.getElementById("calendarModal");
const modalDate = calendarModal.getElementsByClassName("date")[0];
const modalForm = document.forms.modalForm;
const modalSchedule = modalForm.getElementsByClassName("modal-schedule")[0];

/////////////////////////////////////////////////////////////////////////

// js

// calendar constructor & function
const Calendar = function(year=new Date().getFullYear(),month=new Date().getMonth()+1) {
  this.year = year;
  this.month = month;
  this.firstDay = new Date(year,month-1,1).getDay();
  this.lastDate = new Date(year,month,0).getDate();
  this.preMonthStartDate = new Date(year,month,1-this.firstDay).getDate();
  this.title = `${year}년 ${month}월`;
  // this.value = year+"-"+(month<10 ? "0"+month : month);
  this.value = year+"-"+(month+"").padStart(2,0);
  this.preValue = `${month==1 ? year-1 : year}-${month==1 ? 12 : month-1}`;
  this.nextValue = `${year+(month==12 ? 1 : 0)}-${month==12 ? 1 : month+1}`;
  this.schedule = undefined;

  this.setCalendar = (year,month) => {
    year = Number(year);
    month = Number(month);

    this.year = year;
    this.month = month;
    this.firstDay = new Date(year,month-1,1).getDay();
    this.lastDate = new Date(year,month,0).getDate();
    this.preMonthStartDate = new Date(year,month,1-this.firstDay).getDate();
    this.title = `${year}년 ${month}월`;
    this.value = year+"-"+(month+"").padStart(2,0);
    this.preValue = `${month==1 ? year-1 : year}-${month==1 ? 12 : month-1}`;
    this.nextValue = `${year+(month==12 ? 1 : 0)}-${month==12 ? 1 : month+1}`;
  }
  this.setSchedule = schedule => {
    try {
      this.schedule = JSON.parse(schedule);
    }
    catch(e) {
      console.log(e);
      this.schedule = {};
      dbJSON[`d_${this.year}_${this.month}`] = JSON.stringify(this.schedule);
    }
  }
}
const calendarPrint = function(calendar) {
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
      item.value = { year:calendar.year, month:calendar.month, date:date.innerText };

      if(calendar.schedule[date.innerText]!==undefined) {
        for(let key in calendar.schedule[date.innerText]) {
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
      if(i<firstIdx) date.innerText = i+calendar.preMonthStartDate;
      else date.innerText = i-lastIdx;
      item.value = undefined;

      item.classList.remove("active");
      item.classList.add("disable");
      item.removeEventListener("click", calendarClickEventHandler.date);
    }
  });
};
const calendarClickEventHandler = {
  date : e => {
    let year = e.currentTarget.value.year,
        month = e.currentTarget.value.month,
        date = e.currentTarget.value.date;

    modalDate.innerText = `${year}년 ${month}월 ${date}일`;
    modalDate.value = date;
    modalForm.addTime.value = "00:00";
    modalForm.addSchedule.value = "";
    modalForm.addSchedule.placeholder = "추가 스케줄 입력";
    calendarModal.value = e.currentTarget;

    if(calendar.schedule[date]!==undefined) {
      for(let key in calendar.schedule[date]) {
        let scheduleList = document.createElement("li"),
            date = document.createElement("b"),
            schedule = document.createElement("span"),
            deleteBtn = document.createElement("button");

        date.classList.add("time");
        date.innerText = (Number.parseInt(key/60)+"").padStart(2,0)+":"+(key%60+"").padStart(2,0);

        schedule.innerText = calendar.schedule[date][key];

        deleteBtn.type = "button";
        deleteBtn.value = key;
        deleteBtn.classList.add("delete");
        deleteBtn.innerText="x";
        deleteBtn.onclick = calendarClickEventHandler.modalDltSchedule;

        scheduleList.append(date);
        scheduleList.append(schedule);
        scheduleList.append(deleteBtn);

        // schedule.name = "scheduleList";
        modalSchedule.append(scheduleList);
        modalSchedule.value = calendar.schedule[date];
      }
    }
    else modalSchedule.value = {};

    calendarModal.style.display = "block";
  },
  changeMonth : e => {
    let year = e.target.value.split("-")[0],
        month = e.target.value.split("-")[1];
    calendar.setCalendar(year,month);
    // ajax
    calendar.setSchedule(dbJSON[`d_${calendar.year}_${calendar.month}`]);
    calendarPrint(calendar);
  },
  modalAddSchedule : e => {
    let scheduleList = document.createElement("li"),
        time = document.createElement("b"),
        schedule = document.createElement("span"),
        deleteBtn = document.createElement("button");

    let hour = Number(modalForm.addTime.value.split(":")[0]),
        minute = Number(modalForm.addTime.value.split(":")[1]);
    let timeKey = hour*60+minute;

    if(modalSchedule.value[timeKey]===undefined) {
      modalSchedule.value[timeKey] = [];
    }
    modalSchedule.value[timeKey].push(modalForm.addSchedule.value);

    time.classList.add("time");
    time.innerText = modalForm.addTime.value;

    schedule.innerText = modalForm.addSchedule.value;

    deleteBtn.type = "button";
    deleteBtn.value = `{"time":${timeKey},"index":${modalSchedule.value[timeKey].length-1}}`;
    deleteBtn.classList.add("delete");
    deleteBtn.innerText="x";
    deleteBtn.onclick = calendarClickEventHandler.modalDltSchedule;

    scheduleList.append(time);
    scheduleList.append(schedule);
    scheduleList.append(deleteBtn);

    let timeArr = Array.from(modalForm.getElementsByClassName("time"));
    if(timeArr.length && time.innerText<timeArr[timeArr.length-1].innerText) {
      for(let el of timeArr) {
        if(time.innerText<el.innerText) {
          el.parentElement.before(scheduleList);
          break;
        }
      }
    }
    else modalSchedule.append(scheduleList);


    modalForm.addTime.value = "00:00";
    modalForm.addSchedule.value = "";
  },
  modalDltSchedule : e => {
    let timeKey = e.target.value;

    delete modalSchedule.value[timeKey];
    e.target.parentElement.remove();
  },
  modalSubmit : e => {
    let dateSchedule = calendarModal.value.getElementsByClassName("schedule")[0],
        dateKey = modalDate.value;

    Array.from(dateSchedule.children).forEach(item => {
      item.remove();
    });

    if(modalSchedule.value!==undefined){
      for(let key in modalSchedule.value) {
        let schedule = document.createElement("li");

        schedule.value = key;
        schedule.innerText = modalSchedule.value[key];

        dateSchedule.append(schedule);
      }

      if(Object.keys(modalSchedule.value).length) {
        calendar.schedule[dateKey] = modalSchedule.value;
      }
      else {
        delete calendar.schedule[dateKey];
      }
    }

    // ajax
    dbJSON[`d_${calendar.year}_${calendar.month}`] = JSON.stringify(calendar.schedule);

    calendarClickEventHandler.modalClose();
  },
  modalClose : () => {
    modalDate.innerText = "";
    Array.from(modalSchedule.children).forEach(el => {
      el.remove();
    });

    modalDate.value = undefined;
    modalSchedule.value = undefined;
    calendarModal.value = undefined;

    calendarModal.style.display = "none";
  }
}
// execute
const calendar = new Calendar();
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
