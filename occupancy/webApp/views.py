from django.shortcuts import render
from django.template import RequestContext, loader
from time import strftime
from datetime import *
from dateutil.relativedelta import relativedelta
from django.http import HttpResponse
from django.utils import simplejson
import pycurl
import json
import StringIO
import os, csv

# Create your views here.

def index(request):
 ### Code to read token from file ###
 module_dir = os.path.dirname(__file__) # get current directory
 file_dir = os.path.join(module_dir,'token')
 handle = open(file_dir,'r')
 auth_token = handle.readline()
 ### END - Code to read token - END ###
 current_time = datetime.now()
 current_time=current_time.strftime("%Y-%m-%d-%H:%M:%S")
 api_data_url = "https://192.168.1.40:9119/count?at="+current_time+"&format=yyyy-mm-dd-hh24:mi:ss&type=bfwr&token="+auth_token
 print api_data_url
 try:
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
 except Exception:
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
 # api_data = json.loads(api_data)
 # return HttpResponse(api_data, mimetype = 'application/json')
 # template = loader.get_template('webApp/home.html')
 context =  {'api_data': api_data, }
 return render(request, 'webApp/index.html', context)

# def index(request):
#  api_data = json.loads(api_data)
#  context =  {'api_data': api_data, }
#  return render(request, 'webApp/index.html', context)

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
	list = [];
	while i>0:
		current_time= current_time + relativedelta(days = 1)
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
