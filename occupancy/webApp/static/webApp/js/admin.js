var json_data;
$(document).ready( function () {

	var temp = document.getElementById("json").value;
	json_data = JSON.parse(temp);
	console.log(json_data);
	createTable();
    $('#table_id').DataTable({
    	// ordering: false
    });
 	// $('td').click( function() {
  //   console.log("clicked");
  // } );   
    
} );


function createTable(){
	var table = document.getElementById("table_id");
	var header = table.createTHead();
	var row1 = header.insertRow(0);
	row1.insertCell(0).innerHTML = "List of TAs";
	row1.insertCell(1).innerHTML = "M.A.C addresses";
	row1.insertCell(2).innerHTML = "Modify";
	row1.insertCell(3).innerHTML = "Delete";
	var body = table.appendChild(document.createElement('tbody'));
	var mod = document.createElement("input");
	mod.type = "submit";
	mod.value = "modify";
	for(i=0;i<json_data.TA.length;i++){
		var row = body.insertRow(i);
		row.insertCell(0).innerHTML = json_data.TA[i].TA;
		row.insertCell(1).innerHTML = json_data.TA[i].mac;
		row.insertCell(2).innerHTML = '<button type = "submit" id =' + i +', class="btn btn-default" onClick = "modifyForm(event, this.id)">modify</button>';
		row.insertCell(3).innerHTML = '<button type = "submit" id =' + i +', class="btn btn-default" onClick = "deleteTA(this.id)">delete</button>';

	}
}
var min_tags = 2;
function addMAC(){
	var form_element = document.getElementById("TAform");
	var input = document.createElement("input");
	input.type = "text";
	input.setAttribute("class", "form-control")
	input.placeholder = "M.A.C address";
	// input.required = true;
	form_element.appendChild(input);
	min_tags = min_tags + 1;
	// $('.dropdown-toggle').dropdown().addClass('open');
	// e.stopPropagation();
	
}

function removeMAC(){
	if (min_tags < 3) return;
	var form_element = document.getElementById("TAform");
	form_element.removeChild(form_element.lastChild);
	min_tags = min_tags - 1;	
	// e.stopPropagation();
}

function submitForm(){
		var form_element = document.getElementById("TAform");
		// console.log(form_element.getElementsByTagName("input").length);
		var mac = "";
		for (i=0;i<form_element.getElementsByTagName("input").length;i++){
			if (form_element.getElementsByTagName("input")[i].value == "" || form_element.getElementsByTagName("input")[i].value.length < 4  ){
				alert("Insufficient Data");
				return;
			}
			else{
				if (i==0)
					var roll_number = form_element.getElementsByTagName("input")[i].value;
				else{
					 mac = mac + form_element.getElementsByTagName("input")[i].value;
					 mac = mac + ",";
					}
			}
			
		}
		mac = mac.substring(0, mac.length - 1);
		console.log(roll_number);
		console.log(mac);
		var r = confirm("Submit TA details?");
		if (r == true) {
			window.open("/template/admin_insert/" + roll_number + "/" + mac, "_self");
			// location.href = "/template/admin_insert/" + roll_number + "/" + mac;
			
		}
		else{
			return;
		}
	
}

function modifyForm(e, id){
	//console.log(json);
	var dropdown = document.getElementById("TAdropdown");
	// $("a.dropdown-toggle").dropdown("toggle");
	// $('.dropdown-menu').show();
	// $('.dropdown-toggle').addClass('open');
     // $('.dropdown-toggle').dropdown();  
     // e.stopPropagation();
     // $('[data-toggle="dropdown"]').parent().dropdown('toggle');
     // $('.dropdown-menu').dropdown('toggle');
     // $('#TAdropdown').trigger('click.bs.dropdown');
     console.log(json_data.TA[parseInt(id)]);
     console.log(id);
     var form_element = document.getElementById("TAform");
     form_element.getElementsByTagName("input")[0].value = json_data.TA[parseInt(id)].TA;
     var mac = json_data.TA[parseInt(id)].mac;
     var split_ar = mac.split(",");
     console.log(split_ar.length);
     form_element.getElementsByTagName("input")[1].value = split_ar[0];
     for(i=1;i<split_ar.length;i++){
     	if (split_ar.length +1 != min_tags)
     		addMAC(event);
     	form_element.getElementsByTagName("input")[i+1].value = split_ar[i];
     }
 
     $('.dropdown-toggle').dropdown().dropdown('toggle');
    e.stopPropagation();

}

// $('button').on('click', function (e) {
//     e.stopPropagation();
//     $(this).next('.dropdown').find('[data-toggle=dropdown]').dropdown('toggle');
// });

function deleteTA(id){
	var r = confirm("Do you want remove this TA from database(can be restored later)");
	if (r == true) {
		var ta = json_data.TA[parseInt(id)].TA;
		window.open("/template/admin_delete/" + ta, "_self");
		// window.open("www.google.com", "_self");
	    
	} else {
	    return;
	}
		

}

function testMac(mystring){
	var regex = /^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$/;

	console.log(regex.test(mystring));
}