// -*- coding: utf-8 -*-
// title SimpleCalendar
// since 2009-11-03
// author AKIYAMA Kouhei
var moreInt=0;
// require holiday.js (function ktHolidayName)
// require calendar_db_*.js (function/class CalendarData)

var CalendarApp = {
	// Settings.

	cssPrefix : "calendar",
	weekDayNames : [ "日", "月", "火", "水", "木", "金", "土" ],
	holidayDaysOfWeek : (1 << 0) | (1 << 6),
	firstDayOfWeek : 0,
	displayWeeks : 5,

	// Date/Time Utilities

	getHolidayName : function(date) {
		return JapaneseHoliday.getHolidayName(date);
	},

	isHoliday : function(date) {
		return ((CalendarApp.holidayDaysOfWeek >> date.getDay()) & 1)
				|| !!CalendarApp.getHolidayName(date);
	},

	isPastDate : function(date, now) {
		if (!now) {
			now = new Date();
		}

		if (date.getFullYear() < now.getFullYear())
			return true;
		if (date.getFullYear() > now.getFullYear()) {
			return false;
		}
		if (date.getMonth() < now.getMonth()) {
			return true;
		}
		if (date.getMonth() > now.getMonth()) {
			return false;
		}
		if (date.getDate() < now.getDate()) {
			return true;
		}
		// if(date.getDate() > now.getDate()){
		// return false;
		// }
		return false;
	},

	addDate : function(date, delta) {
		date.setTime(date.getTime() + delta * (24 * 60 * 60 * 1000));
	},

	convertDateToYYYYMMDD : function(date) {
		return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100
				+ date.getDate();
	},

	// DOM Utilities

	getLastScriptNode : function() {
		var n = document;
		while (n && n.nodeName.toLowerCase() != "script") {
			n = n.lastChild;
		}
		return n;
	},
	/*
	 * createDomNode: function(obj) { if(!obj){ return null; }
	 *
	 * if(obj.elem){ var e = document.createElement(obj.elem);
	 *
	 * if(obj.children){ for(var i = 0; i < obj.children.length; ++i){ var child =
	 * CalendarApp.createDomNode(obj.children[i]); if(child){
	 * e.appendChild(child); } } }
	 *
	 * if(obj.atrs){ for(var key in obj.atrs){ e[key] = obj.atrs[key]; } }
	 * return e; } else if(obj.textnode){ var t =
	 * document.createTextNode(obj.textnode); return t; } else{ return null; } },
	 */

	addEventListener : function(elem, evname, func) {
		if (!elem) {
			return;
		}
		if (elem.addEventListener) { // for DOM
			elem.addEventListener(evname, func, false);
		} else if (elem.attachEvent) { // for IE
			switch (evname) {
			case "click":
				evname = "onclick";
				break;
			case "blur":
				evname = "onblur";
				break;
			default:
				evname = "";
				break;
			}
			if (evname != "") {
				elem.attachEvent(evname, func);
			}
		}
	},

	// Create Elements.

	createWeekRow : function(firstDate, func, rowClassName) {
		var date = new Date(firstDate);
		var row = document.createElement("tr"); //ここで一週間の一列を作成
		row.className = rowClassName;
		for (var d = 0; d < 7; ++d) {
			row.appendChild(func(date));
			CalendarApp.addDate(date, 1);
		}
		return row;
	},

	createWeekDayNamesRow : function(firstDate) {
		return CalendarApp.createWeekRow(firstDate, function(date) {
			var th = document.createElement("th");
			th.appendChild(document
					.createTextNode(CalendarApp.weekDayNames[date.getDay()]));
			return th;
		}, CalendarApp.cssPrefix + "-weekdaynames-row");
	},

	getDateClassName : function(date, now, suffix) {
		var classes = [];

		if (new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000).getMonth() != date
				.getMonth()) {
			classes.push(CalendarApp.cssPrefix + "-last-dayweek-of-month"
					+ suffix);
		}
		if (new Date(date.getTime() + 1 * 24 * 60 * 60 * 1000).getMonth() != date
				.getMonth()) {
			classes
					.push(CalendarApp.cssPrefix + "-last-date-of-month"
							+ suffix);
		}
		classes.push(CalendarApp.cssPrefix
				+ (CalendarApp.isPastDate(date, now) ? "-pastday" : CalendarApp
						.isHoliday(date) ? "-holiday" : "-normalday") + suffix);
		return classes.join(" ");
	},

	createDateHeaderCell : function(date, now) {
		var cell = document.createElement("td");//ここで一日分を作成
		cell.className = CalendarApp.getDateClassName(date, now, "-header");


		if (date.getDate() == 1) {
			var monthName = document.createElement("span");
			monthName.className = CalendarApp.cssPrefix + "-month-name";
			monthName.appendChild(document.createTextNode("("
					+ (1 + date.getMonth()) + ")"));
			cell.appendChild(monthName);
			cell.appendChild(document.createTextNode("/" + date.getDate()));
		} else {
			cell.appendChild(document.createTextNode(date.getDate()));
		}

		var holidayName = CalendarApp.getHolidayName(date);
		if (holidayName) {
			cell.appendChild(document.createTextNode(":" + holidayName));
		}
		//ここでカレンダーに予定をを追加
		// cell.append(<button>hoge</button>);
		var dateStr=date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);
		var addCalendarHtml="";
		addCalendarHtml+='<br><button id="addButton" class="btn btn-mini btn-default col-sm-6 " data-toggle="modal" data-target="#modal_'+dateStr+'">+</button>';
		addCalendarHtml+='<div class="modal" id="modal_'+dateStr+'" tabindex="-1">';
		addCalendarHtml+='<div class="modal-dialog">';
		addCalendarHtml+='<div class="modal-content">';
		addCalendarHtml+='<div class="modal-header">';
		addCalendarHtml+='<h4 class="modal-title" id="modal-label">予定入力フォーム</h4>';//ここヘッダー
		addCalendarHtml+='<button type="button" class="close" data-dismiss="modal">';
		addCalendarHtml+='<span aria-hidden="true">&times;</span>';//閉じるボタン(右上)
		addCalendarHtml+='</button>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='<div class="modal-body">';
		addCalendarHtml+='<span id="calendar_date_form_'+dateStr+'">'+dateStr+'</span><br>';
		addCalendarHtml+='<input type="text" id="calendar_content_form_'+dateStr+'" name="content" class="col-sm-12" placeholder="予定を入力してください。"/>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='<div class="modal-footer">';
		addCalendarHtml+='<button type="button" class="btn btn-default" data-dismiss="modal">閉じる</button>';
		addCalendarHtml+='<button type="button"  onClick="addCalendar('+date.getFullYear()+','+("0"+(date.getMonth()+1)).slice(-2)+','+("0"+date.getDate()).slice(-2)+');" class="btn btn-primary"  data-dismiss="modal">追加</button>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		addCalendarHtml+='</div>';
		$(cell).append(addCalendarHtml);
		return cell;
	},

	createDateContentCell : function(date, now, db, cellsDic) {
		var cell = document.createElement("td");
		cell.className = CalendarApp.getDateClassName(date, now, "-content");
		cell.id = date.getFullYear()+"-"+("0"+(date.getMonth()+1)).slice(-2)+"-"+("0"+date.getDate()).slice(-2);

		var ctrl = new CalendarApp.CalendarCellCtrl(cell, date, db);
		if (cellsDic) {
			cellsDic[CalendarApp.convertDateToYYYYMMDD(date)] = ctrl;
		}

		return cell;
	},

	createDateHeaderRow : function(firstDate, now) {
		return CalendarApp.createWeekRow(firstDate, function(date) {
			return CalendarApp.createDateHeaderCell(date, now);
		}, CalendarApp.cssPrefix + "-date-header-row");
	},

	createDateContentRow : function(firstDate, now, db, cellsArray) {
		return CalendarApp.createWeekRow(firstDate,
				function(date) {
					return CalendarApp.createDateContentCell(date, now, db,
							cellsArray);
				}, CalendarApp.cssPrefix + "-date-content-row");
	},

	readEventItemsToCells : function(db, firstDate, lastDate, cellsDic) {
		db.readEventItems(firstDate, lastDate, function(items) {
			if (!items) {
				alert("ERROR:failed to read calendar events.");
				return;
			}
			for (var i = 0; i < items.length; ++i) {
				var cell = cellsDic[CalendarApp
						.convertDateToYYYYMMDD(items[i].date)];
				if (cell) {
					cell.addEventItem(items[i].value, false);
				}
			}
		});
	},

	appendWeeks : function(firstDate, weekCount, db, table, cellsDic, now) {
		var date = new Date(firstDate);
		for (var week = 0; week < weekCount; ++week) {	//一週間分のヘッダーとコンテント部分を作成
			table.appendChild(CalendarApp.createDateHeaderRow(date, now));
			table.appendChild(CalendarApp.createDateContentRow(date, now, db,
					cellsDic));
			CalendarApp.addDate(date, 7);
		}

		CalendarApp.readEventItemsToCells(db, firstDate, date, cellsDic);

		return date;
	},

	createCalendarCtrl : function() {
		var db = new CalendarData();

		var now = new Date();
		var nowPosOnWeek = (7 + now.getDay() - CalendarApp.firstDayOfWeek) % 7;

		var firstDate = new Date(now.getFullYear(), now.getMonth(), now
				.getDate()
				- (nowPosOnWeek )); // /@todo ok?

		var table = document.createElement("table");
		table.className = CalendarApp.cssPrefix + "-table";

		table.appendChild(CalendarApp.createWeekDayNamesRow(firstDate));

		var cellsDic = new Object;
		var lastDate = CalendarApp.appendWeeks(firstDate,
				CalendarApp.displayWeeks, db, table, cellsDic, now);

		return new CalendarApp.CalendarCtrl(db, table, cellsDic, firstDate,
				lastDate, now);
	},

	placeCalendar : function() {
		$('table').after('<h1 class="col-sm-10">カレンダー</h1>');

		var parent = CalendarApp.getLastScriptNode().parentNode;

		parent.appendChild(CalendarApp.createCalendarCtrl().div);

	}

};

//
// calendar control.
//
CalendarApp.CalendarCtrl = function(db, table, cellsDic, firstDate, lastDate,
		now) {
	this.db = db;
	this.table = table;
	this.cellsDic = cellsDic;
	this.firstDate = firstDate;
	this.lastDate = lastDate;
	this.now = now;

	this.div = document.createElement("div");
	this.div.appendChild(table);

	this.div.appendChild(this.createButtonMore());
};
CalendarApp.CalendarCtrl.prototype = {
	createButtonMore : function() {
		var self = this;
		var more = document.createElement("input");
		more.setAttribute("type", "button");
		more.setAttribute("value", "more..");
		more.setAttribute("class","btn btn-defult col-sm-3");
		CalendarApp.addEventListener(more, "click", function() {
			self.onClickMore();
		});
		return more;
	},

	onClickMore : function() {
		moreInt++;
		var NowDate=new Date();
		var y=NowDate.getFullYear();
		var m="0"+(NowDate.getMonth()+moreInt);
		y=parseInt(y+(m/12));
		m=parseInt(m%12+1);
		var d=("0"+NowDate.getDate()).slice(-2);
		m=("0"+m).slice(-2);
		getCalendar(y+"-"+m+"-"+d);
		var getWeek=4;
		console.log(y+"-"+m+"-"+d);
		if(this.lastDate.getDate()<4){
			getWeek=5;
		}
		this.lastDate = CalendarApp.appendWeeks(this.lastDate, getWeek, this.db,
				this.table, this.cellsDic, this.now);
	}
};

//
// calendar cell control.
//
CalendarApp.CalendarCellCtrl = function(cell, date, db) {
	var self = this;
	this.date = new Date(date);
	this.db = db;
	this.cell = cell;
	CalendarApp.addEventListener(this.cell, "click", function() {
		self.onCellClick();
	});
	this.items = new Array();
};
CalendarApp.CalendarCellCtrl.prototype = {
	onCellClick : function() {
		for (var i = 0; i < this.items.length; ++i) {
			if (this.items[i].isEditing()) {
				return;
			}
		}

		this.addEventItem("", true);
	},

	addEventItem : function(value, editingMode) {
		// /@todo isEmptyな項目を削除する。
		// /@todo 個数制限を設ける。

		this.items.push(new CalendarApp.CalendarEventItemCtrl(this.cell, value,
				editingMode, this.date, this.db));
	}
};

//
// event item control.
// show/edit a event description.
//
CalendarApp.CalendarEventItemCtrl = function(cell, value, editingMode, date, db) {
	this.date = date;
	this.db = db;
	this.cell = cell;
	this.div = null;
	// this.textarea = null;
	this.msg = null;
	this.value = value;

	if (editingMode) {
		// this.textarea = this.createTextArea(value);
		// this.cell.appendChild(this.textarea);
		// this.textarea.focus();
	} else {
		this.div = this.createDiv(value);
		this.cell.appendChild(this.div);
	}
};
CalendarApp.CalendarEventItemCtrl.prototype = {
	isEmpty : function() {
		return !this.textarea && !this.div && !this.msg;
	},
	isEditing : function() {
		return !!this.textarea;
	},
	// isProcessing: function() { return !!this.msg; },

	createDiv : function(value) {
		var self = this;
		var div = document.createElement("div");
		div.className = CalendarApp.cssPrefix + "-event-item";
		div.appendChild(document.createTextNode(value));
		CalendarApp.addEventListener(div, "click", function() {
			self.onDivClick();
		});
		return div;
	},

	onDivClick : function() {
		if (!this.div) {
			return;
		}

		// this.textarea = this.createTextArea(this.value);
		// this.cell.insertBefore(this.textarea, this.div);
		// this.textarea.focus();
		//
		// this.cell.removeChild(this.div);
		// this.div = null;
	},

	createTextArea : function(value) {
		// var self = this;
		// var textarea = document.createElement("textarea");
		// textarea.className = CalendarApp.cssPrefix + "-event-item-input";
		// textarea.value = value;
		// CalendarApp.addEventListener(textarea, "blur", function() {
		// 	self.onTextAreaBlur();
		// });
		// return textarea;
	},

	onTextAreaBlur : function() {
		if (!this.textarea) {
			return;
		}

		var self = this;
		var oldValue = this.value;
		var newValue = this.textarea.value;
		// /@todo 値の検証が必要。
		if (newValue != oldValue) {
			this.value = newValue;

			this.msg = this.createMessageDiv("writing...");
			this.cell.insertBefore(this.msg, this.textarea);
			this.db.changeEventItem(this.date, oldValue, newValue, function(
					succeeded, currValue) {
				self.onCalendarDataChanged(succeeded, currValue);
			});
		} else {
			if (newValue == "") {
				// cancel to create a new item.
			} else {
				this.div = this.createDiv(this.value);
				this.cell.insertBefore(this.div, this.textarea);
			}
		}
		this.cell.removeChild(this.textarea);
		this.textarea = null;
	},

	createMessageDiv : function(value) {
		var msg = document.createElement("div");
		msg.className = CalendarApp.cssPrefix + "-event-item-msg";
		msg.appendChild(document.createTextNode(value));
		return msg;
	},

	onCalendarDataChanged : function(succeeded, currValue) {
		if (!this.msg) {
			return;
		}

		if (!succeeded) {
			alert("ERROR:failed to modify the event.");
		}

		this.value = currValue;
		if (this.value == "") {
			// remove this item.
		} else {
			this.div = this.createDiv(this.value);
			this.cell.insertBefore(this.div, this.msg);
		}

		this.cell.removeChild(this.msg);
		this.msg = null;
	}

};
