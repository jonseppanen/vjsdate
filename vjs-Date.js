function vjsDate(pickerElement) {

    /* Build Modal elements and classnames. */

    var modal = document.createElement('DIV');
    modal.classList.add('vjsDate-modal');

    var frame = document.createElement('DIV');
    frame.classList.add('vjsDate-frame');

    var btnClose = document.createElement('DIV');
    btnClose.classList.add('vjsDate-btnClose');

    var tabs = document.createElement('DIV');
    tabs.classList.add('vjsDate-tabs');

    var controlYear = document.createElement('DIV');
    controlYear.classList.add('vjsDate-controlYear');

    var btnYearPrev = document.createElement('DIV');
    btnYearPrev.classList.add('vjsDate-btnYearPrev');

    var listYear = document.createElement('SELECT');
    listYear.classList.add('vjsDate-listYear');

    var btnYearNext = document.createElement('DIV');
    btnYearNext.classList.add('vjsDate-btnYearNext');

    var controlMonth = document.createElement('DIV');
    controlMonth.classList.add('vjsDate-controlMonth');

    var btnMonthPrev = document.createElement('DIV');
    btnMonthPrev.classList.add('vjsDate-btnMonthPrev');

    var listMonth = document.createElement('SELECT');
    listMonth.classList.add('vjsDate-listMonth');

    var btnMonthNext = document.createElement('DIV');
    btnMonthNext.classList.add('vjsDate-btnMonthNext');

    var toggleTimeCal = document.createElement('DIV');
    toggleTimeCal.classList.add('vjsDate-toggleTimeCal');

    var panelMain = document.createElement('DIV');
    panelMain.classList.add('vjsDate-panelMain');

    var panelMonth = document.createElement('DIV');
    panelMonth.classList.add('vjsDate-panelMonth');

    var namedDays = document.createElement('DIV');
    namedDays.classList.add('vjsDate-namedDays');

    var calendar = document.createElement('DIV');
    calendar.classList.add('vjsDate-calendar');

    var panelTime = document.createElement('DIV');
    panelTime.classList.add('vjsDate-panelTime');

    var listHour = document.createElement('SELECT');
    listHour.classList.add('vjsDate-listHour');

    var spacerTime = document.createElement('DIV');
    spacerTime.classList.add('vjsDate-spacerTime');

    var listMinute = document.createElement('SELECT');
    listMinute.classList.add('vjsDate-listMinute');

    var wrapperAMPM = document.createElement('label');
    wrapperAMPM.classList.add('vjsDate-wrapperAMPM');

    var inputAMPM = document.createElement('input');
    inputAMPM.classList.add('vjsDate-inputAMPM');

    var switchAMPM = document.createElement('div');
    switchAMPM.classList.add('vjsDate-switchAMPM');

    /*Put the children in the parents. Oh dear.*/
    modal.appendChild(frame);

    frame.appendChild(btnClose);
    frame.appendChild(tabs);
    frame.appendChild(panelMain);

    tabs.appendChild(controlYear);
    tabs.appendChild(controlMonth);
    tabs.appendChild(toggleTimeCal);

    controlYear.appendChild(btnYearPrev);
    controlYear.appendChild(listYear);
    controlYear.appendChild(btnYearNext);

    controlMonth.appendChild(btnMonthPrev);
    controlMonth.appendChild(listMonth);
    controlMonth.appendChild(btnMonthNext);

    panelTime.appendChild(listHour);
    panelTime.appendChild(spacerTime);
    panelTime.appendChild(listMinute);
    panelTime.appendChild(wrapperAMPM);
    wrapperAMPM.appendChild(inputAMPM);
    wrapperAMPM.appendChild(switchAMPM);

    panelMonth.appendChild(namedDays);
    panelMonth.appendChild(calendar);
    panelMain.appendChild(panelMonth);
    panelMain.appendChild(panelTime);

    document.body.appendChild(modal);

    /*Toggle between time entry and date entry. Defaults to date entry as 90%+ of people wont need to enter time.*/
    function switchTimeCal(event, bgUpdate) {
        document.activeElement.blur();
        var currentTime = new Date(pickerElement.value);
        if (toggleTimeCal.classList.contains('calActive') && !bgUpdate) {
            toggleTimeCal.innerHTML = (currentTime.getHours() > 12 ? currentTime.getHours() - 12 : currentTime.getHours()) + ':' + (currentTime.getMinutes() > 9 ? currentTime.getMinutes() : '0' + currentTime.getMinutes()) + (currentTime.getHours() > 12 ? '<sup>PM</sup>' : '<sup>AM</sup>');
            toggleTimeCal.classList.remove('calActive');
            panelMain.style.transform = 'translate3d(0,0,0)';
        } else {
            var newDate = currentTime.getDate().toString();
            var dateString;
            switch (newDate.slice(-2)) {
                case "1":
                case "21":
                case "31":
                    dateString = newDate + '<sup>st</sup>';
                    break;
                case "2":
                case "22":
                    dateString = newDate + '<sup>nd</sup>';
                    break;
                case "3":
                case "23":
                    dateString = newDate + '<sup>rd</sup>';
                    break;
                default:
                    dateString = newDate + '<sup>th</sup>';
            }
            toggleTimeCal.innerHTML = dateString;
            toggleTimeCal.classList.add('calActive');
            panelMain.style.transform = 'translate3d(-100%,0,0)';
        }
    }


    /* Close the modal and kill everything. Your new date/time values should be live. */
    function closeModal(event) {
        if (event.target !== this) return;
        modal.classList.add('inactive');
        document.documentElement.removeAttribute('style');
        setTimeout(function () { modal.remove() }, 300);
    }

    /* Helper to fill a selection list from an array. DRY etc.*/
    function fillSelectList(selectObject, listArr) {
        selectObject.innerHTML = "";
        for (var i = 0; i < listArr.length; i++) {
            var newOption = document.createElement("option");
            newOption.text = listArr[i];
            selectObject.add(newOption);
        }
    }

    /* Disable menu options outside of defined date range */
    function setListDisables() {
        inputAMPM.disabled = false;
        var selectedDate = getRootDate();

        function listDisabler(selectedDate, listObject) {
            for (var i = 0; i < listObject.length; i++) {
                var disablerDate = new Date(selectedDate);
                var valCheck = isNaN(listObject.options[i].innerText) ? i : parseInt(listObject.options[i].innerText);
                listObject == listMonth ? disablerDate.setMonth(valCheck) : listObject == listHour ? disablerDate.setHours(inputAMPM.checked ? valCheck + 12 : valCheck) : disablerDate.setMinutes(valCheck);
                listObject.options[i].disabled = (disablerDate < startDate || disablerDate > endDate) ? true : false;
            }
        }

        listDisabler(selectedDate, listMonth);
        listDisabler(selectedDate, listHour);
        listDisabler(selectedDate, listMinute);

        var startDateCheck = new Date(selectedDate);
        if (inputAMPM.checked) { startDateCheck.setHours(startDateCheck.getHours() - 12); } else { startDateCheck.setHours(startDateCheck.getHours() + 12); }
        if (startDateCheck < startDate || startDateCheck > endDate) {
            inputAMPM.disabled = true;
        }

    }

    /* Build the initial list of years selectable, and select the current year. You can modify the range with yearsBack and yearsForward. */
    function renderYearList(selectedDate) {
        var yearArr = [];
        for (var i = 0; i < ((endDate.getFullYear() + 1) - startDate.getFullYear()); i++) {
            yearArr.push(startDate.getFullYear() + i);
        }
        fillSelectList(listYear, yearArr);
        listYear.selectedIndex = yearArr.indexOf(selectedDate.getFullYear());
    }

    /* This one is easy. Just months in a list. */
    function renderMonthList(selectedDate) {
        fillSelectList(listMonth, ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
        listMonth.selectedIndex = selectedDate.getMonth();
    }

    /* Build the list of minutes, with padding 0's.*/
    function renderMinuteList(selectedDate) {
        var minArr = [];
        for (var i = 0; i < 60; i++) {
            minArr.push(i > 9 ? i.toString() : '0' + i);
        }
        fillSelectList(listMinute, minArr);
        listMinute.selectedIndex = minArr.indexOf(selectedDate.getMinutes() > 9 ? selectedDate.getMinutes().toString() : '0' + selectedDate.getMinutes());
    }

    /* Build hours list programmatically, instead of writing out a massive array like a peasant. */
    function renderHourList(selectedDate) {
        var hourArr = [];
        for (var i = 0; i < 12; i++) {
            hourArr.push(i + 1);
        }
        fillSelectList(listHour, hourArr);
        listHour.selectedIndex = hourArr.indexOf(selectedDate.getHours() > 12 ? selectedDate.getHours() - 12 : selectedDate.getHours());
    }

    /* God damn. Magic happens here. Here we could the days in the month, and as we do it, spit out the element for that day. Also put in spacers for leading date offset. */
    function renderCalendar() {
        calendar.innerHTML = '';
        var dateCounter = new Date(pickerElement.value);
        var month = dateCounter.getMonth();

        dateCounter.setDate(1);

        while (dateCounter.getMonth() === month) {
            var dayObject = document.createElement('SPAN');
            dayObject.classList.add('vjsDate-day' + dateCounter.getDate());
            if (dateCounter < startDate || dateCounter > endDate) dayObject.classList.add('vjsDate-day-disabled');
            dayObject.innerHTML = dateCounter.getDate();
            calendar.appendChild(dayObject);
            if (new Date(pickerElement.value).getDate() === dateCounter.getDate()) dayObject.classList.add('vjsDate-day-selected');

            if (parseInt(dayObject.innerHTML) == 1) {
                /*If we are the first date, we need to make N spacers for Nth day of the week*/
                for (i = 0; i < dateCounter.getDay(); i++) {
                    var daySpacer = document.createElement('SPAN');
                    daySpacer.classList.add('vjsDate-day');
                    dayObject.parentElement.insertBefore(daySpacer, dayObject);
                }
            }
            dateCounter.setDate(dateCounter.getDate() + 1);
        }
    }


    /* List increment button function. If there is a list before it, then this button is next. If after it, this button is previous.*/
    function incrementList(event) {
        var listObject;
        var dateTest;
        if (event.target.previousElementSibling) {
            listObject = event.target.previousElementSibling;
            if (!listObject.childNodes[listObject.selectedIndex + 1]) {
                if (listObject == listMonth && listYear.selectedIndex + 1 != listYear.options.length) {
                    listYear.selectedIndex++;
                    listObject.selectedIndex = 0;
                    listYear.dispatchEvent(new Event('change'));
                    listObject.dispatchEvent(new Event('change'));
                }
                return;
            }
            if (listObject.childNodes[listObject.selectedIndex + 1].disabled === true) return;
            ++listObject.selectedIndex;
            listObject.dispatchEvent(new Event('change'));
        } else if (event.target.nextElementSibling) {
            listObject = event.target.nextElementSibling;
            if (!listObject.childNodes[listObject.selectedIndex - 1]) {
                if (listObject == listMonth && listYear.selectedIndex != 0) {
                    listYear.selectedIndex--;
                    listObject.selectedIndex = 11;
                    listYear.dispatchEvent(new Event('change'));
                    listObject.dispatchEvent(new Event('change'));
                }
                return;
            }
            if (listObject.childNodes[listObject.selectedIndex - 1].disabled === true) return;
            --listObject.selectedIndex;
            listObject.dispatchEvent(new Event('change'));
        }
    }


    /* Create a shadow variable of the input value */
    function setRootDate(newDate) {
        pickerElement.date = newDate;
        pickerElement.value = newDate.toLocaleDateString("en-US", pickerElement.dateFormat);
    }

    /* Get the shadow variable of the input value, or make it and get it if it's not there */
    function getRootDate() {
        if (pickerElement.date) return pickerElement.date;
        else {
            pickerElement.date = new Date(pickerElement.value);
            return pickerElement.date;
        }
    }


    /* Once a year has been selected, set it live and update calendar*/
    function selectYear(event) {
        setRootDate(safeSetYear(listYear.value));
        listMonth.dispatchEvent(new Event('change'));
    }

    function safeSetYear(yearValue) {
        var dateTest = new Date(getRootDate());
        dateTest.setFullYear(yearValue);
        if (dateTest < startDate) dateTest = startDate;
        if (dateTest > endDate) dateTest = endDate;
        return dateTest;
    }


    /* Once a month has been selected, set it live and update calendar*/
    function selectMonth(event) {
        if (toggleTimeCal.classList.contains('calActive')) { switchTimeCal(event, true) }
        setRootDate(safeSetMonth(listMonth.selectedIndex));
        renderCalendar();
        calendar.dispatchEvent(new Event('click'));
    }

    function safeSetMonth(monthValue) {
        var dateTest = new Date(getRootDate());
        dateTest.setMonth(monthValue + 1);
        dateTest.setDate(0);
        if (getRootDate().getDate() < dateTest.getDate()) dateTest.setDate(getRootDate().getDate());
        if (dateTest < startDate) dateTest = startDate;
        if (dateTest > endDate) dateTest = endDate;
        listMonth.selectedIndex = dateTest.getMonth();
        return dateTest;
    }


    /* Clicking a date will set it live. No need to update calendar*/
    function selectDate(event) {   
        if (event.target !== this){
            var newDate = new Date(getRootDate());
            newDate.setDate(event.target.textContent);
            setRootDate(newDate);
            calendar.getElementsByClassName('vjsDate-day-selected')[0].classList.remove('vjsDate-day-selected');
            calendar.getElementsByClassName('vjsDate-day' + newDate.getDate())[0].classList.add('vjsDate-day-selected');
        }
        listHour.dispatchEvent(new Event('change'));
    }

    /* Once time has been selected, set it live. No need to update calendar*/
    function selectHour(event) {
        var newDate = new Date(getRootDate());
        newDate.setHours(inputAMPM.checked ? parseInt(listHour.value) + 12 : listHour.value);
        setRootDate(newDate);
        listMinute.dispatchEvent(new Event('change'));
    }

    function selectMinute(event) {
        var newDate = new Date(getRootDate());
        newDate.setMinutes(listMinute.value);
        setRootDate(newDate);
        setListDisables();
    }

    function getStartDate(){
        if(pickerElement.getAttribute('data-vjsDateStart')) return new Date(pickerElement.getAttribute('data-vjsDateStart'));
        pickerElement.setAttribute('data-vjsDateStart', new Date(defaultDate));
        return defaultDate();
    }

    function getEndDate(){
        if(pickerElement.getAttribute('data-vjsDateEnd')) return new Date(pickerElement.getAttribute('data-vjsDateEnd'));
        var endDate = new Date(defaultDate);
        endDate.setFullYear(endDate.getFullYear + 2);
        pickerElement.setAttribute('data-vjsDateEnd', endDate);
        return endDate;
    }

    /* Meat and potatoes. Set all various default attributes and content. I'm sure you can follow it.*/
    
    var defaultDate = pickerElement.defaultDate ? pickerElement.defaultDate : pickerElement.defaultDate = new Date(pickerElement.value);
    var startDate = getStartDate();
    var endDate = getEndDate();
    var currentDate = new Date(getRootDate());
    spacerTime.innerText = ":";

    renderYearList(currentDate);
    renderMonthList(currentDate);
    renderHourList(currentDate);
    renderMinuteList(currentDate);
    setListDisables();

    toggleTimeCal.innerHTML = listHour.value + ":" + listMinute.value + (defaultDate.getHours() > 12 ? '<sup>PM</sup>' : '<sup>AM</sup>');
    namedDays.innerHTML = '<span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>';
    inputAMPM.type = "checkbox";
    if (defaultDate.getHours() > 12) inputAMPM.checked = true;
    btnClose.innerHTML = 'Close';
    modal.classList.add('active');

    /* Small trick to prevent parent from scrolling while modal is open for Apple devices. Because apple says Fuck you.000*/
    document.documentElement.style.height = "100%";
    document.documentElement.style.overflowY = 'hidden';
    modal.addEventListener('touchmove', function (event) { event.preventDefault(); }, false);

    /* Listen for all the things! Seriously though, sorry. Date pickers are complicated.*/
    btnYearPrev.addEventListener("click", incrementList, false);
    listYear.addEventListener("change", selectYear, false);
    btnYearNext.addEventListener("click", incrementList, false);
    btnMonthPrev.addEventListener("click", incrementList, false);
    listMonth.addEventListener("change", selectMonth, false);
    btnMonthNext.addEventListener("click", incrementList, false);
    toggleTimeCal.addEventListener("click", switchTimeCal, false);
    calendar.addEventListener("click", selectDate, false);
    listHour.addEventListener("change", selectHour, true);
    listMinute.addEventListener("change", selectMinute, true);
    inputAMPM.addEventListener("change", selectHour, true);
    btnClose.addEventListener("click", closeModal, false);

    /* Start it all up!*/
    renderCalendar();
}

/* Assigns main function and formats date/time*/
function createVjsDateObject(vjsInput) {
    /* Config for the format of the date. Has to be in english (already set) for javascript to read it back. */
    var dateFormat;
    if (vjsInput.getAttribute('data-vjsDateFormat') !== "") { dateFormat = JSON.parse(vjsInput.getAttribute('data-vjsDateFormat')) } else {
        dateFormat = {
            "weekday": "long",
            "year": "numeric",
            "month": "long",
            "day": "numeric",
            "hour": "numeric",
            "minute": "numeric"
        };
    }
    vjsInput.value = new Date(vjsInput.value).toLocaleDateString("en-US", dateFormat);
    vjsInput.dateFormat = dateFormat;
    vjsInput.addEventListener("focus", function () {
        vjsDate(this);
        this.blur();
    });
}

(function () {

    /*Self executor to tag all your date/time inputs. Feel free to do it manually where required*/
    var inputs = document.querySelectorAll('[data-vjsDate]');
    for (var i = 0; i < inputs.length; i++) {
        createVjsDateObject(inputs[i]);
    }
})();