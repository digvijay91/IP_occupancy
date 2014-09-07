// var text ='{"size":"60","occupancy_information":[{"building":"Academic","floor":"0","wing":"C","room":"C01","count":"93"},{"building":"Academic","floor":"0","wing":"C","room":"C02","count":"13"},{"building":"Academic","floor":"0","wing":"C","room":"C03","count":"13"},{"building":"Academic","floor":"0","wing":"Cafeteria","room":"CCD","count":"1"},{"building":"Academic","floor":"0","wing":"Cafeteria","room":"GlassRoom","count":"2"},{"building":"Academic","floor":"1","wing":"A","room":"","count":"2"},{"building":"Academic","floor":"1","wing":"B","room":"","count":"4"},{"building":"Academic","floor":"1","wing":"C","room":"C11","count":"53"},{"building":"Academic","floor":"1","wing":"C","room":"C12","count":"11"},{"building":"Academic","floor":"1","wing":"C","room":"C13","count":"7"},{"building":"Academic","floor":"1","wing":"Middle","room":"","count":"8"},{"building":"Academic","floor":"2","wing":"A","room":"","count":"9"},{"building":"Academic","floor":"2","wing":"B","room":"","count":"6"},{"building":"Academic","floor":"2","wing":"C","room":"C21","count":"39"},{"building":"Academic","floor":"2","wing":"C","room":"C22","count":"6"},{"building":"Academic","floor":"2","wing":"C","room":"C23","count":"8"},{"building":"Academic","floor":"2","wing":"C","room":"C24","count":"11"},{"building":"Academic","floor":"2","wing":"Middle","room":"","count":"1"},{"building":"Academic","floor":"3","wing":"A","room":"","count":"10"},{"building":"Academic","floor":"3","wing":"B","room":"","count":"9"},{"building":"Academic","floor":"3","wing":"Middle","room":"","count":"1"},{"building":"Academic","floor":"4","wing":"A","room":"","count":"15"},{"building":"Academic","floor":"4","wing":"B","room":"","count":"4"},{"building":"Academic","floor":"5","wing":"A","room":"","count":"4"},{"building":"Academic","floor":"5","wing":"B","room":"","count":"2"},{"building":"Boy sHostel","floor":"0","wing":"A","room":"","count":"1"},{"building":"Boy sHostel","floor":"0","wing":"C","room":"","count":"6"},{"building":"Boy sHostel","floor":"1","wing":"A","room":"","count":"10"},{"building":"Boy sHostel","floor":"1","wing":"C","room":"","count":"1"},{"building":"Boy sHostel","floor":"2","wing":"A","room":"","count":"2"},{"building":"Boy sHostel","floor":"2","wing":"B","room":"","count":"9"},{"building":"Boy sHostel","floor":"2","wing":"C","room":"","count":"12"},{"building":"Boy sHostel","floor":"3","wing":"A","room":"","count":"2"},{"building":"Boy sHostel","floor":"3","wing":"B","room":"","count":"8"},{"building":"Boy sHostel","floor":"3","wing":"C","room":"","count":"16"},{"building":"Boy sHostel","floor":"4","wing":"A","room":"","count":"4"},{"building":"Boy sHostel","floor":"4","wing":"B","room":"","count":"4"},{"building":"Boy sHostel","floor":"4","wing":"C","room":"","count":"11"},{"building":"Boy sHostel","floor":"5","wing":"A","room":"","count":"7"},{"building":"Boy sHostel","floor":"5","wing":"C","room":"","count":"15"},{"building":"Boy sHostel","floor":"6","wing":"A","room":"","count":"15"},{"building":"Boy sHostel","floor":"6","wing":"C","room":"","count":"10"},{"building":"Girl sHostel","floor":"0","wing":"A","room":"","count":"2"},{"building":"Girl sHostel","floor":"1","wing":"A","room":"","count":"2"},{"building":"Girl sHostel","floor":"1","wing":"B","room":"","count":"10"},{"building":"Girl sHostel","floor":"1","wing":"C","room":"","count":"2"},{"building":"Girl sHostel","floor":"2","wing":"A","room":"","count":"2"},{"building":"Girl sHostel","floor":"2","wing":"B","room":"","count":"4"},{"building":"Girl sHostel","floor":"3","wing":"A","room":"","count":"7"},{"building":"Girl sHostel","floor":"3","wing":"B","room":"","count":"6"},{"building":"Girl sHostel","floor":"3","wing":"C","room":"","count":"6"},{"building":"Girl sHostel","floor":"4","wing":"A","room":"","count":"2"},{"building":"Library","floor":"0","wing":"","room":"","count":"12"},{"building":"Library","floor":"1","wing":"","room":"","count":"8"},{"building":"Library","floor":"2","wing":"","room":"","count":"7"},{"building":"Library","floor":"3","wing":"","room":"","count":"4"},{"building":"Residence","floor":"","wing":"","room":"","count":"3"},{"building":"ServiceBlock","floor":"0","wing":"","room":"","count":"4"},{"building":"StudentCentre","floor":"0","wing":"","room":"","count":"7"},{"building":"StudentCentre","floor":"3","wing":"","room":"","count":"2"}]}';

// obj = JSON.parse(text);
var obj;
$(document).ready(function(){
  
  displaychart();

});

// window.onload = displaychart;
function print_filter(filter){
  var f=eval(filter);
  if (typeof(f.length) != "undefined") {}
  else{}
  if (typeof(f.top) != "undefined") {f=f.top(Infinity);}
  else{}
  if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}
  else{}
  console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}
//function initCounts(){
var curr_building;
var curr_floor;
var all_building;
var all_floor;
var buildingDim;
var floorDim;
var wingDim;
var FloorChart;
var WingChart;
var class_count;
var classDim;
var classChart;
var filter_again = false;
function building_helper(chart,filter){
    var elem = document.getElementById("building-helper");
    var sum = buildingDim.groupAll().reduceSum(function(d){
      for(i=0;i<chart.filters().length;i++){
        if(d.building == chart.filters()[i])
          return d.count;
      }
      return 0;
    }).value();
    if(sum == 0) sum = all_building;
    elem.innerHTML= "Building: "+ sum; 
    console.log(sum);
    curr_building = sum;
    floor_helper(FloorChart,filter);
};
function floor_helper(chart,filter){
  var elem = document.getElementById("floor-helper");
  var sum = floorDim.groupAll().reduceSum(function(d){
    for(i=0;i<chart.filters().length;i++){
      if(d.floor == chart.filters()[i] || (chart.filters()[i] == 'N/A' && d.floor == ''))
        return d.count;
    }
    return 0;
  }).value();
  if(sum == 0) sum = curr_building;
  elem.innerHTML= "Floor: "+ sum; 
  curr_floor = sum;
  wing_helper(WingChart,filter);
};
function wing_helper(chart,filter){
    var elem = document.getElementById("wing-helper");
    var sum = wingDim.groupAll().reduceSum(function(d){
      for(i=0;i<chart.filters().length;i++){
        if(d.wing == chart.filters()[i] || (chart.filters()[i] == 'N/A' && d.wing == ''))
          return d.count;
      }
      return 0;
    }).value();
    if(sum == 0) sum = curr_floor;
    elem.innerHTML= "Wing: "+ sum; 
    curr_floor = sum;
};

function displaychart(){
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var t = $('input[name=userTime]');
  // console.log(t.val());
  var current_time = new Date();
  var month = parseInt(current_time.getMonth()) + 1;
  if (t.val() == ""){
    var param_time = current_time.getFullYear()+'-'+ month+'-'+current_time.getDate()+'-'+current_time.getHours()+':'+current_time.getMinutes()+':'+current_time.getSeconds();
  }
  else {
    var param_time = t.val();
    param_time = param_time.replace('T','-');
    param_time = param_time + ":00";
  }
  console.log(param_time);
  // document.getElementById("showdate").innerHTML = param_time +"\n" + weekday[current_time.getDay()];
  // console.log(weekday[current_time.getDay()]);
  d3.csv("/template/past/"+param_time, function(error, data){

      // console.log(data);
      var ndx = crossfilter(data);
      var dayDim = ndx.dimension(function(d) {return d.day;});
      var day_count = dayDim.group().reduceSum(function(d){return d.count;});
      var past_linechart = dc.barChart("#past-linechart");
      buildingDim = ndx.dimension(function(d){ return d.building;});
      var total_count = buildingDim.group().reduceSum(function(d){ return d.count;});
      var BuildingChart = dc.pieChart("#chart-building");
      // var tempDim = ndx.dimension(function(d){return d.building; });
      // var temp = tempDim.filter(weekday[current_time.getDay()]);
      // print_filter(temp);
      // var all = temp.groupAll().reduceSum(function(d){return d.count;}).value();
      // buildingDim.filterAll();
      // console.log(day_count.top(1)[0].value);
      floorDim = ndx.dimension(function(d){ if (d.wing=="")return "N/A";return d.floor;});
      var floor_count = floorDim.group().reduceSum(function(d){return d.count;});
      FloorChart = dc.pieChart("#chart-floor");

      wingDim = ndx.dimension(function(d){ if(d.wing == "") return "N/A";return d.wing;});
      var wing_count = wingDim.group().reduceSum(function(d){return d.count;});
      WingChart = dc.pieChart("#chart-wing");

      classDim = ndx.dimension(function(d){ if(d.room == "") return "N/A"; return d.room;});
      class_count = classDim.group().reduceSum(function(d){return d.count;});
      classChart = dc.pieChart("#chart-room");
      d3.select('#past-linechart').selectAll("rect.bar").append("text").text(function(d){return d.count;})

      // document.getElementById("building-helper").innerHTML = "Building: " + all;
      // document.getElementById("floor-helper").innerHTML = "Floor: " + all ;
      // document.getElementById("wing-helper").innerHTML = "Wing: " + all ;
      // document.getElementById("room-helper").innerHTML = "Room: " + all ;

      past_linechart
      .xUnits(dc.units.ordinal)
      //.xUnits(d3.time.hours)
      //.xUnits(dc.units.ordinal)
      .width(1000).height(300)
      .dimension(dayDim)
      .group(day_count)
      .filter(weekday[current_time.getDay()])
       // .x(d3.time.scale().domain([minDate,maxDate]))
      .x(d3.scale.ordinal().domain(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]))
      .y(d3.scale.linear())
      //.brushOn(false)
      // .onClick(function(chart){chart.filter("Monday")})
      .xAxisLabel("Date")
      .yAxisLabel("People in campus on average")
      .transitionDuration(500)
      .centerBar(true)    
      .gap(65)
      .elasticY(true)
      .elasticX(true)
      .xAxisPadding(10)
      .on("filtered",function(chart,filter){
            if(filter != null){
              console.log(chart.filters());
              if(chart.filters().length == 0){
                chart.filterAll();
              }
              else if(!filter_again){
                filter_again = true;
                chart.filterAll();
                chart.filter(filter);
              }
              else{
                filter_again = false;
              }
            }
              // chart.filter(filter);
              // console.log(filter);
              // console.log(chart.filter());
            // dc.events.trigger(function(){
            //   chart.filter(filter);
            // })
            // chart.filter(null);
            // chart.filter(filter);
      })
      // .renderlet(function(chart) {
      //             chart.selectAll('rect.bar').on("click", function (d) {
      //                 chart.filter(null);
      //                 chart.filter(d.value);
      //                 // chart.title("ayush");
      //       })
      //    })
      .xAxis().tickFormat();
      // .selectAll("rect.bar").append("text").text(function(d){return d;});
      var filter_again_building = false;

      BuildingChart
        .width(200).height(200)
        .dimension(buildingDim)
        .group(total_count)
        .innerRadius(50)
        .renderLabel(true)
        .label(function (d){
          label = d.value;
          return label;
        })
        .legend(dc.legend().x(205).y(20).itemHeight(200/9).gap(2))
        .ordinalColors(["#ffcccc", "#ff9999", "#ff6666", "#ff3333","#ff0000","#cc0000","#990000"])
        .on("filtered",function(chart,filter){
            if(filter != null){
              console.log(chart.filters());
              if(chart.filters().length == 0){
                chart.filterAll();
              }
              else if(!filter_again_building){
                filter_again_building = true;
                chart.filterAll();
                chart.filter(filter);
              }
              else{
                filter_again_building = false;
              }
            }
          });
        var filter_again_floor = false;

        FloorChart
          .width(200).height(200)
          .dimension(floorDim)
          .group(floor_count)
          .innerRadius(50)
          .renderLabel(true)
          .label(function (d){ return d.value;})
          //.label(buildingDim)
          .legend(dc.legend().x(205).y(10).itemHeight(200/9).gap(1))
          .ordinalColors(["#99ccff", "#66b3ff", "#3399ff", "#0080ff","#0066cc","#004d99","#003366"])
          .on("filtered",function(chart,filter){
            if(filter != null){
              console.log(chart.filters());
              if(chart.filters().length == 0){
                chart.filterAll();
              }
              else if(!filter_again_floor){
                filter_again_floor = true;
                chart.filterAll();
                chart.filter(filter);
              }
              else{
                filter_again_floor = false;
              }
            }
          });
          var filter_again_wing = false;

          WingChart
            .width(200).height(200)
            .dimension(wingDim)
            .group(wing_count)
            .innerRadius(50)
            .renderLabel(true)
            //.label(buildingDim)
            .label(function (d){ return d.value;})
            .legend(dc.legend().x(205).y(30).itemHeight(200/9).gap(2))
            .ordinalColors(["#1a3300", "#336600", "#4c9900", "#66cc00","#339900","#008000"])
            .on("filtered",function(chart,filter){
            if(filter != null){
              console.log(chart.filters());
              if(chart.filters().length == 0){
                chart.filterAll();
              }
              else if(!filter_again_wing){
                filter_again_wing = true;
                chart.filterAll();
                chart.filter(filter);
              }
              else{
                filter_again_wing = false;
              }
            }
          });
            var filter_again_class = false;
            classChart
             .width(200).height(260)
             .dimension(classDim)
             .group(class_count)
             .innerRadius(50)
             .renderLabel(true)
             //.label(buildingDim)
             .label(function (d){ return d.value;})
             .legend(dc.legend().x(205).y(10).itemHeight(200/9).gap(1))
             .on("filtered",function(chart,filter){
              if(filter != null){
                console.log(chart.filters());
                if(chart.filters().length == 0){
                  chart.filterAll();
                  }
                  else if(!filter_again_class){
                    filter_again_class = true;
                    chart.filterAll();
                    chart.filter(filter);
                  }
                  else{
                    filter_again_class = false;
                  }
                }
              });
             // .colors(d3.scale.category10());
             // .ordinalColors(["#1a3300", "#336600", "#4c9900", "#66cc00","#339900","#008000"]);

      dc.renderAll();
  });
}
function myonload() {
  displaychart();
  // var api_data = document.getElementById("api_data").value;
  // obj = JSON.parse(api_data);
  // var ndx = crossfilter(obj.occupancy_information); 
  // buildingDim = ndx.dimension(function(d){ return d.building;});
  // var total_count = buildingDim.group().reduceSum(function(d){ return d.count;});
  // var BuildingChart = dc.pieChart("#chart-building");
  // console.log(total_count.top(1)[0].value);

  // floorDim = ndx.dimension(function(d){ if(d.floor == "") return "N/A"; return d.floor;});
  // var floor_count = floorDim.group().reduceSum(function(d){return d.count;});
  // FloorChart = dc.pieChart("#chart-floor");
  // console.log(FloorChart);

  // wingDim = ndx.dimension(function(d){ if(d.wing == "") return "N/A";return d.wing;});
  // var wing_count = wingDim.group().reduceSum(function(d){return d.count;});
  // WingChart = dc.pieChart("#chart-wing");

  // classDim = ndx.dimension(function(d){ if(d.room == "") return "N/A"; return d.room;});
  // class_count = classDim.group().reduceSum(function(d){return d.count;});
  // classChart = dc.pieChart("#chart-room");
  // console.log(classChart);
 
  // var legend_height = 200 / 7;
  // var all = ndx.groupAll().reduceSum(function(d){ return d.count;}).value();
  // all_floor = floorDim.groupAll().reduceSum(function(d){ return d.count;}).value();
  // all_building = buildingDim.groupAll().reduceSum(function(d){ return d.count;}).value();
  // curr_building = all_building;
  // curr_floor = all_floor;
  // document.getElementById("building-helper").innerHTML = "Building: " + all ;
  // document.getElementById("floor-helper").innerHTML = "Floor: " + all ;
  // document.getElementById("wing-helper").innerHTML = "Wing: " + all ;
  // document.getElementById("room-helper").innerHTML = "Room: " + all ;
//  initCounts(floorDim,);
// console.log(all);
  // BuildingChart.on("filtered",building_helper);
  // FloorChart.on("filtered",floor_helper);
  // WingChart.on("filtered",wing_helper);

 
 // BuildingChart
 //  .width(200).height(200)
 //  .dimension(buildingDim)
 //  .group(total_count)
 //  .innerRadius(50)
 //  .renderLabel(true)
 //  .label(function (d){
 //    label = d.value;
 //    return label;
 //  })
 //  .legend(dc.legend().x(205).y(20).itemHeight(200/9).gap(2))
 //  .ordinalColors(["#ffcccc", "#ff9999", "#ff6666", "#ff3333","#ff0000","#cc0000","#990000"]);

  // FloorChart
  // .width(200).height(200)
  // .dimension(floorDim)
  // .group(floor_count)
  // .innerRadius(50)
  // .renderLabel(true)
  // .label(function (d){ return d.value;})
  // //.label(buildingDim)
  // .legend(dc.legend().x(205).y(10).itemHeight(200/9).gap(1))
  // .ordinalColors(["#99ccff", "#66b3ff", "#3399ff", "#0080ff","#0066cc","#004d99","#003366"]);
  // WingChart
  // .width(200).height(200)
  // .dimension(wingDim)
  // .group(wing_count)
  // .innerRadius(50)
  // .renderLabel(true)
  // //.label(buildingDim)
  // .legend(dc.legend().x(205).y(30).itemHeight(200/9).gap(2))
  // .ordinalColors(["#1a3300", "#336600", "#4c9900", "#66cc00","#339900","#008000"]);

   // classChart
   // .width(200).height(200)
   // .dimension(classDim)
   // .group(class_count)
   // .innerRadius(50)
   // .renderLabel(true)
   // //.label(buildingDim)
   // .legend(dc.legend().x(205).y(30).itemHeight(200/9).gap(2))
   // .ordinalColors(["#1a3300", "#336600", "#4c9900", "#66cc00","#339900","#008000"]);

  // dc.renderAll();
}

