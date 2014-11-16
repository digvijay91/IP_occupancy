from django.db import models

# Create your models here.
class Attendance(models.Model):
	roll_number = models.CharField(max_length=20)
	date = models.DateTimeField()

class Admin(models.Model):
	TA = models.CharField(max_length=20)
	mac = models.CharField(max_length=100)
	deleted = models.IntegerField()
