from django.shortcuts import render
from django.template import RequestContext, loader
from webApp.models import *
from time import strftime
from datetime import *
from dateutil.relativedelta import relativedelta
from django.http import HttpResponse
from django.utils import simplejson
from django.core.serializers.json import DjangoJSONEncoder
import pycurl
import json
import StringIO
import os, csv

# Create your views here.

def chart1(request):
 return render(request, 'webApp/home.html')
 	

def chart2(request):
	return render(request, 'webApp/chart2.html')

def attendance(request):
	today = date.today()
	today = today -  relativedelta(days = 1)
	last_date = today - relativedelta(days = today.day - 1)
	# # print str(today)
	# module_dir = os.path.dirname(__file__) # get current directory
	# file_dir = os.path.join(module_dir,'token')
	# handle = open(file_dir,'r')
	# auth_token = handle.readline()
	# api_data_url = "https://192.168.1.40:9119/attendance?from=" + str(last_date) + "&to=" + str(today) + "&format=yyyy-mm-dd-hh24:mi:ss&token=" + auth_token
	# print api_data_url
	# c = pycurl.Curl()
	# c.setopt(pycurl.URL, api_data_url)
	# c.setopt(pycurl.SSL_VERIFYPEER, 0)
	# c.setopt(pycurl.SSL_VERIFYHOST, 0)
	# b = StringIO.StringIO()
	# c.setopt(pycurl.WRITEFUNCTION, b.write)
	# c.setopt(pycurl.FOLLOWLOCATION, 1)
	# c.setopt(pycurl.MAXREDIRS, 5)
	# c.perform()
	# api_data = b.getvalue()
	# api_to_json = json.loads(api_data)
	list = []
	final_json = {}
	temp_today = date.today()
	while(str(last_date) != str(temp_today)):
		objects = Attendance.objects.filter(date = last_date)
		print 
		for o in objects:
			dict = {}
			print o.roll_number
			dict["rollno"] = o.roll_number
			dict["date"] = o.date.strftime("%Y-%m-%d")
			list.append(dict)
		last_date = last_date + relativedelta(days = 1)
	final_json["attendance"] =  list
	send = json.dumps(final_json, cls=DjangoJSONEncoder)
	print send
	return render(request,'webApp/attendance.html',{'json': send	})
	


def past_week_data(request,time):
	# print time
	current_time = datetime.strptime(time,"%Y-%m-%d-%H:%M:%S")
	current_time= current_time - relativedelta(days = 7)
	# print current_time
	module_dir = os.path.dirname(__file__) # get current directory
	file_dir = os.path.join(module_dir,'token')
	handle = open(file_dir,'r')
	auth_token = handle.readline()
	i = 7
	list = []
	while i>0:
		current_time= current_time + relativedelta(days = 1)
		url_time=current_time.strftime("%Y-%m-%d-%H:%M:%S")
 		api_data_url = "https://192.168.1.40:9119/count?at="+url_time+"&format=yyyy-mm-dd-hh24:mi:ss&type=bfwr&token="+auth_token
 		print api_data_url
 		c = pycurl.Curl()
		c.setopt(pycurl.URL, api_data_url)
		c.setopt(pycurl.SSL_VERIFYPEER, 0)
		c.setopt(pycurl.SSL_VERIFYHOST, 0)
		b = StringIO.StringIO()
		c.setopt(pycurl.WRITEFUNCTION, b.write)
		c.setopt(pycurl.FOLLOWLOCATION, 1)
		c.setopt(pycurl.MAXREDIRS, 5)
		c.perform()
		api_data = b.getvalue()
		api_to_json = json.loads(api_data)
		# count = 0
		for j in range(0,int(api_to_json["size"])):
			dict = {}
			#count = count + int(api_to_json["occupancy_information"][j]["count"])
			dict["day"] = current_time.strftime("%m/%d/%Y")
			dict["building"] = api_to_json["occupancy_information"][j]["building"]
			dict["floor"] = api_to_json["occupancy_information"][j]["floor"]
			dict["wing"] = api_to_json["occupancy_information"][j]["wing"]
			dict["room"] = api_to_json["occupancy_information"][j]["room"]
			dict["count"] = api_to_json["occupancy_information"][j]["count"]
			list.append(dict)
		i = i -1
	keys = ['day','building','floor','wing','room','count']
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="past_week_data.csv"'
	dict_writer = csv.DictWriter(response, keys)
	dict_writer.writer.writerow(keys)
	dict_writer.writerows(list)
	return response

def past_same_day(request, time):
	current_time = datetime.strptime(time,"%Y-%m-%d-%H:%M:%S")
	current_time= current_time - relativedelta(days = 42)
	module_dir = os.path.dirname(__file__) # get current directory
	file_dir = os.path.join(module_dir,'token')
	handle = open(file_dir,'r')
	auth_token = handle.readline()
	i = 7
	list = []
	while i>0:
		url_time=current_time.strftime("%Y-%m-%d-%H:%M:%S")
 		api_data_url = "https://192.168.1.40:9119/count?at="+url_time+"&format=yyyy-mm-dd-hh24:mi:ss&type=bfwr&token="+auth_token
 		c = pycurl.Curl()
		c.setopt(pycurl.URL, api_data_url)
		c.setopt(pycurl.SSL_VERIFYPEER, 0)
		c.setopt(pycurl.SSL_VERIFYHOST, 0)
		b = StringIO.StringIO()
		c.setopt(pycurl.WRITEFUNCTION, b.write)
		c.setopt(pycurl.FOLLOWLOCATION, 1)
		c.setopt(pycurl.MAXREDIRS, 5)
		c.perform()
		api_data = b.getvalue()
		api_to_json = json.loads(api_data)
		for j in range(0,int(api_to_json["size"])):
			dict = {}
			#count = count + int(api_to_json["occupancy_information"][j]["count"])
			dict["day"] = current_time.strftime("%m/%d/%Y")
			dict["building"] = api_to_json["occupancy_information"][j]["building"]
			dict["floor"] = api_to_json["occupancy_information"][j]["floor"]
			dict["wing"] = api_to_json["occupancy_information"][j]["wing"]
			dict["room"] = api_to_json["occupancy_information"][j]["room"]
			dict["count"] = api_to_json["occupancy_information"][j]["count"]
			list.append(dict)
		current_time = current_time + relativedelta(days= 7)
		i = i -1
	keys = ['day','building','floor','wing','room','count']
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="past_same_day.csv"'
	dict_writer = csv.DictWriter(response, keys)
	dict_writer.writer.writerow(keys)
	dict_writer.writerows(list)
	return response

def month_average(request, time):
	current_time = datetime.strptime(time,"%Y-%m-%d-%H:%M:%S")
	current_time = current_time - relativedelta(days = 30, minutes=current_time.minute)
	module_dir = os.path.dirname(__file__) # get current directory
	file_dir = os.path.join(module_dir,'token')
	handle = open(file_dir,'r')
	auth_token = handle.readline()
	i=30
	list = []
	temp_array = ["Academic","Boy's Hostel","Girl's Hostel","Library","Residence","Service Block","Student Centre"]
	key_index = {"Academic":"Acad","Boy's Hostel":"BH","Girl's Hostel":"GH","Library":"L","Residence":"R","Service Block":"SB","Student Centre":"SC"}
	while(i>=0):
		temp_time = current_time + relativedelta(days = 30 - i,minutes = 15)
		j=0
		count = []
		count[0:7] = [0,0,0,0,0,0,0]
		for j in range(0,2):
			url_time=temp_time.strftime("%Y-%m-%d-%H:%M:%S")
	 		api_data_url = "https://192.168.1.40:9119/count?at="+url_time+"&format=yyyy-mm-dd-hh24:mi:ss&type=b&token="+auth_token
	 		# print api_data_url
	 		# kl
	 		c = pycurl.Curl()
			c.setopt(pycurl.URL, api_data_url)
			c.setopt(pycurl.SSL_VERIFYPEER, 0)
			c.setopt(pycurl.SSL_VERIFYHOST, 0)
			b = StringIO.StringIO()
			c.setopt(pycurl.WRITEFUNCTION, b.write)
			c.setopt(pycurl.FOLLOWLOCATION, 1)
			c.setopt(pycurl.MAXREDIRS, 5)
			c.perform()
			api_data = b.getvalue()
			api_to_json = json.loads(api_data)
			# print api_to_json["occupancy_information"][0]["count"]
			for k in range(0,int(api_to_json["size"])):
				index = temp_array.index(api_to_json["occupancy_information"][k]["building"])
				count[index] = count[index] + int(api_to_json["occupancy_information"][k]["count"])
			temp_time = temp_time + relativedelta(minutes = 30)
		temp_time = temp_time - relativedelta(minutes = 75)
		dict = {}
		dict["day"] = temp_time
		for j in range(0,int(api_to_json["size"])):
			index = temp_array.index(api_to_json["occupancy_information"][j]["building"])
			dict[key_index[api_to_json["occupancy_information"][j]["building"]]] = count[index]/2
		list.append(dict)
		i=i-1
	keys = ["day","Acad","BH","GH","L","R","SB","SC"]
	response = HttpResponse(content_type='text/csv')
	response['Content-Disposition'] = 'attachment; filename="month_average.csv"'
	dict_writer = csv.DictWriter(response, keys)
	dict_writer.writer.writerow(keys)
	dict_writer.writerows(list)
	return response

# def try1(request):
# 	module_dir = os.path.dirname(__file__)
# 	file_dir = os.path.join(module_dir,'token')
# 	handle = open(file_dir,'r')
# 	auth_token = handle.readline()
# 	i = 60
# 	time = date.today()
# 	time = time.strftime("%Y-%m-%d-%H:%M:%S")
# 	print "entered"
# 	while(i>=0):
# 		api_data_url = "https://192.168.1.40:9119/count?at=" + time + "&format=yyyy-mm-dd-hh24:mi:ss&type=b&token="+auth_token
# 		c = pycurl.Curl()
# 		c.setopt(pycurl.URL, api_data_url)
# 		c.setopt(pycurl.SSL_VERIFYPEER, 0)
# 		c.setopt(pycurl.SSL_VERIFYHOST, 0)
# 		b = StringIO.StringIO()
# 		c.setopt(pycurl.WRITEFUNCTION, b.write)
# 		c.setopt(pycurl.FOLLOWLOCATION, 1)
# 		c.setopt(pycurl.MAXREDIRS, 5)
# 		c.perform()
# 		api_data = b.getvalue()
# 		api_to_json = json.loads(api_data)
# 		i = i - 1
# 		print i
# 	print "done"
# 	return HttpResponse("done")