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
import os

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
