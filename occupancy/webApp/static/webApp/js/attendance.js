$(document).ready( function () {
	dynamictable();
    $('#table_id').DataTable();
    
} );

var header_dates = new Array();
var rollno = new Array();
var attendance;
var uniquerollno;
var length_col;
var numberdays;

function dynamictable(){
	generate_header();
	var table = document.getElementById("table_id");
	var header = table.createTHead();
	var row1 = header.insertRow(0);
	row1.insertCell(0).innerHTML = "Roll No";
	for(i=0;i<header_dates.length;i++){
		row1.insertCell(i+1).innerHTML = header_dates[i];
	}
	var temp = document.getElementById("json").value;
	var json_data = JSON.parse(temp);
	for(i=0;i<json_data.attendance.length;i++){
		rollno.push(json_data.attendance[i].rollno);
	}
	uniquerollno = new Array();
	$.each(rollno, function(i, el){
    	if($.inArray(el, uniquerollno) === -1) uniquerollno.push(el);
	});
	uniquerollno.sort();
	console.log(uniquerollno);
	create_2d();
	console.log(attendance);
	var body = table.appendChild(document.createElement('tbody'));
	for(i=0;i<attendance.length;i++){
		var row_b = body.insertRow(i);
		row_b.insertCell(0).innerHTML = uniquerollno[i];
		for(j=0;j<numberdays;j++){
			if (inArray(attendance[i],header_dates[j]))
				row_b.insertCell(j + 1).innerHTML = "Present";
			else 
				row_b.insertCell(j + 1).innerHTML = "Absent";
		}
	}
}

function generate_header(){
	var long_months = new Array(0,2,4,6,7,9,11);
	var head_date = new Date();
	numberdays = head_date.getDate() - 1;
	head_date.setDate(1);
	// if (inArray(long_months,head_date.getMonth()))
	// 	length_col = 31;
	// else length_col = 30;
	for (i=0;i<numberdays;i++){
		header_dates.push(date_to_string(head_date));
			if (head_date.getDate() == length_col){
				head_date.setMonth(parseInt(head_date.getMonth()) + 1);
				head_date.setDate(1);
			}
			else head_date.setDate(parseInt(head_date.getDate()) + 1 );
		

	}
	console.log(header_dates);
	

}

function date_to_string(date){
	var month = parseInt(date.getMonth()) + 1;
	if (String(month).length == 1)
		month = "0" + month
	var date_t = date.getDate();
	if (String(date_t).length == 1)
		date_t = "0" + date_t 
	var ret =date.getFullYear()+'-'+ month+'-'+ date_t;
	return ret;
}

function inArray(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return true;
    }
    return false;
}

function create_2d(){
	var temp = document.getElementById("json").value;
	var json_data = JSON.parse(temp);
	attendance = new Array(uniquerollno.length);
	for(i=0;i<uniquerollno.length;i++){
		attendance[i] = new Array();
	}
	for(i=0;i<json_data.attendance.length;i++){
		var index = uniquerollno.indexOf(json_data.attendance[i].rollno);
		attendance[index].push(json_data.attendance[i].date);
	}
	console.log(attendance);
}