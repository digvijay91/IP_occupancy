from django.core.management.base import BaseCommand, CommandError
import os
import json,csv
from django.shortcuts import render
from time import strftime
from datetime import *
from dateutil.relativedelta import relativedelta
from django.http import HttpResponse

import pycurl
import StringIO


class Command(BaseCommand):
    help = 'Fetches the token from API'

    def handle(self, *args, **options):

        url = "https://192.168.1.40:9119/auth?username=ayush1&password=ayu.pass.123"
        c = pycurl.Curl()
        c.setopt(pycurl.URL, url)
        c.setopt(pycurl.SSL_VERIFYPEER, 0)
        c.setopt(pycurl.SSL_VERIFYHOST, 0)
        b = StringIO.StringIO()
        c.setopt(pycurl.WRITEFUNCTION, b.write)
        c.setopt(pycurl.FOLLOWLOCATION, 1)
        c.setopt(pycurl.MAXREDIRS, 5)
        c.perform()
        htmlsrc = b.getvalue()
        module_dir = os.path.dirname(__file__)
	file_dir = os.path.join("/media/ayush/@yush/engineering/django/IP/IP_occupancy/occupancy/webApp",'token')
	handle1 = open(file_dir,'w')
	handle1.write(htmlsrc)
	handle1.close()
	# self.stdout.write("%s",htmlsrc)
