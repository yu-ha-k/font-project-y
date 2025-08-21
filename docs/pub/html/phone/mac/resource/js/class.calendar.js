/**
 *	Calendar JS 
 */
(function() {
	var calendar = _attrM.extend({
		init : function(q, $e) {
			this._super(q, $e);
		}, onload : function() {
			var $calendar;
			if ($(".calendar").length > 0)	$calendar = $(".calendar");
			else 							{
				$calendar = $("	<div class='underpop modal w100p alert-box antiscroll calendar hide '>\r\n" + 
						"		<div class='calendar-middle pop-alert overh bg b-white radius03'>\r\n" + 
						"			<div class='calendar-inner'>\r\n" + 
						"				<div class='calendar-box'>\r\n" + 
						"					<div class='calendar-box-ym'>\r\n" + 
						"						<span class='prevYear cal-prev'></span>\r\n" + 
						"						<span class='YYYY text normal'></span>년\r\n" + 
						"						<span class='nextYear cal-next'></span>\r\n" + 
						"						<span class='prevMonth cal-prev'></span>\r\n" + 
						"						<span class='MM text normal'></span>월\r\n" + 
						"						<span class='nextMonth cal-next'></span>\r\n" + 
						"					</div>\r\n" + 
						"					<div class='calendar-box-tbl'>\r\n" + 
						"						<table class='table' cellpadding='0' cellspacing='0'>\r\n" + 
						"							<thead>\r\n" + 
						"								<tr><th class='text t-red'>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th class='text t-skyblue'>토</th></tr>\r\n" + 
						"							</thead>\r\n" + 
						"							<tbody>\r\n" + 
						"								<tr class='hide'>\r\n" + 
						"									<td class='e-data text t-red' data-td='0'><span data-td='0' data-jnf='calendar_day'></span></td>\r\n" + 
						"									<td class='e-data' data-td='1'><span data-td='1' data-jnf='calendar_day'></span></td>\r\n" + 
						"									<td class='e-data' data-td='2'><span data-td='2' data-jnf='calendar_day'></span></td>\r\n" + 
						"									<td class='e-data' data-td='3'><span data-td='3' data-jnf='calendar_day'></span></td>\r\n" + 
						"									<td class='e-data' data-td='4'><span data-td='4' data-jnf='calendar_day'></span></td>\r\n" + 
						"									<td class='e-data' data-td='5'><span data-td='5' data-jnf='calendar_day'></span></td>\r\n" + 
						"									<td class='e-data text t-skyblue' data-td='6'><span data-td='6' data-jnf='calendar_day'></span></td>\r\n" + 
						"								</tr>\r\n" + 
						"							</tbody>\r\n" + 
						"						</table>\r\n" + 
						"					</div>\r\n" + 
						"				</div>\r\n" + 
						"			</div>\r\n" + 
						"		</div>	\r\n" + 
						"	</div>");
				$calendar.appendTo(document.body);
				_setAttrM($calendar);
			}
		
			this.$calendar 	= $calendar;
			this.$dateTgt	= $(this.$e.attr("data-calendar-target"));
			
			var _this = this;
			if (!this.$dateTgt.val()) this.setCalendarValue(this.$dateTgt, this.dateToString(new Date()));
			this.$e.click(function() { _this.showCalendar($(this)); });
			
		}, clear : function() {
		}, getValue : function() {
		}, setValue : function(val) {
		}, setCalendarValue : function($e, val) {
			var fmt = $e.attr("data-date-format");
			fmt		= (!fmt)?"YYYY-MM-DD":fmt;
			fmt		= fmt.replace(/YYYY/, val.substring(0,4)).replace(/MM/, val.substring(4,6)).replace(/DD/, val.substring(6,8));
			$e.val(fmt);
		}, drawCalendar : function(date) {
			if (!date) date = this.dateToString(new Date());
			date = date.replace(/-|\.|\//g,'');
			this.baseDt = date;
			this.$calendar.find(".YYYY"	).html(date.substring(0,4));
			this.$calendar.find(".MM"	).html(parseInt(date.substring(4,6)));
			var $table	= this.$calendar.find("table");
			var calDat	= this.makeCalendarData(date);
			var _this	= this;
		
			this.$calendar.find(".prevYear"	).unbind('click');
			this.$calendar.find(".nextYear"	).unbind('click');
			this.$calendar.find(".prevMonth").unbind('click');
			this.$calendar.find(".nextMonth").unbind('click');
		
			this.$calendar.find(".prevYear"	).bind('click', function() { var year = parseInt(_this.$calendar.find(".YYYY").html())-1;	var month = parseInt(_this.$calendar.find(".MM").html());											_this.drawCalendar(year +""+ ((month<10)?"0"+month:month)); });
			this.$calendar.find(".nextYear"	).bind('click', function() { var year = parseInt(_this.$calendar.find(".YYYY").html())+1;	var month = parseInt(_this.$calendar.find(".MM").html());											_this.drawCalendar(year +""+ ((month<10)?"0"+month:month)); });
			this.$calendar.find(".prevMonth").bind('click', function() { var year = parseInt(_this.$calendar.find(".YYYY").html());		var month = parseInt(_this.$calendar.find(".MM").html())-1;	if (month <= 0)	{ month = 12; year--;}	_this.drawCalendar(year +""+ ((month<10)?"0"+month:month)); });
			this.$calendar.find(".nextMonth").bind('click', function() { var year = parseInt(_this.$calendar.find(".YYYY").html());		var month = parseInt(_this.$calendar.find(".MM").html())+1;	if (month >= 13){ month	= 1;  year++;}	_this.drawCalendar(year +""+ ((month<10)?"0"+month:month)); });
			
			$table.data("_nattr")[0].setValue(calDat);
			$table.find("tbody").find("tr").find("td").click(function() {
				_this.setCalendarValue(_this.$dateTgt, $(this).data("kkData"));
				_this.hideCalendar();
			});
			this.$calendar.click(function() { _this.hideCalendar(); });
			this.$calendar.find(".calendar-box").click(function(e) { return false; });
		}, showCalendar : function($inp) {
			this.$curInp = $inp;
			var inDate 	= this.$dateTgt.val();
			if (inDate.length < 6	) 	inDate = (this.dateToString(new Date()));
			else						inDate = (this.dateToString(this.stringToDate(inDate)));
			this.drawCalendar(inDate);
			this.$calendar.hasClass("hide")	&& this.$calendar.removeClass("hide");
		}, hideCalendar : function() {
			!this.$calendar.hasClass("hide") && this.$calendar.addClass("hide");
		}, stringToDate : function(strDate) {					// from	YYYYMMDD
			strDate		= strDate.replace(/-|\.|\//g,'');		// . - / 등의 문자열을 제거해준다.
			var yyyy		= parseInt(strDate.substring(0,4)),
				mm		= parseInt(strDate.substring(4,6)),
				dd		= parseInt(strDate.substring(6,8));
			return this.getDate(yyyy,mm,dd);
		}, getDate 		: function(yyyy,mm,dd) 	{				// to	YYYYMMDD
			var dt		= new Date();
			dt.setFullYear	(yyyy);
			dt.setMonth		(mm-1);
			dt.setDate		(dd);
			return dt;
		}, dateToString	: function(date) 		{				// to	YYYYMMDD
			var month	= (date.getMonth()+1);
			var sdate	= (date.getDate());
			month		= (month<10)?"0"+month:month;
			sdate		= (sdate<10)?"0"+sdate:sdate;
			return date.getFullYear() + "" + month + "" + sdate;
		}, makeCalendarData	: function(date) 		{			// to	YYYYMMDD
			var toDay	= this.dateToString(new Date());
			date		= date.replace(/-|\.|\//g,'');				// . - / 등의 문자열을 제거해준다.
			date		= date.substring(0,6);
			if (date.length == 6) date = date + "01";
			var dt	= this.stringToDate(date), calends = [], week ;
			var ct	= new Date();
			ct.setFullYear(dt.getFullYear());
			ct.setMonth(dt.getMonth()+1);
			ct.setDate	(0);
			var ch	= (this.dateToString(ct));
			dt.setDate((dt.getDay() * -1)  );					// start is pre month sunday
			var bfdt= (this.dateToString(dt));
			while ((ch >= bfdt) || dt.getDay() != 0)  {
				dt.setDate(dt.getDate() + 1);
				if (dt.getDay() == 0) var week = {'base': this.baseDt, "today":toDay};
				if ((ch <= bfdt)  && dt.getDay() == 0) break;
				(dt.getDay() == 0 && calends.push(week));
				bfdt				= (this.dateToString(dt));
				week[dt.getDay()]	= bfdt;
			}	
			return calends;
		}
	});

	_nattr['.dateInput'] = calendar;
})();
