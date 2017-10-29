showCalendar();

function showCalendar(){
	var text = '{"plan1":{"calendarId":"0001","date":"2017-11-01","contents":"contents1","name":"user1"},"plan2":{"calendarId":"0002","date":"2017-11-01","contents":"contents2","name":"user1"},"plan3":{"calendarId":"0003","date":"2017-11-01","contents":"contents3","name":"user2"},"plan4":{"calendarId":"0005","date":"2017-11-03","contents":"contents5","name":"user5"},"plan5":{"calendarId":"0007","date":"2017-11-04","contents":"contents6","name":"user1"}}';

	var planObj=$.parseJSON(text);
	console.dir(planObj);
}
