from django.db import models

# Create your models here.
class Attendance(models.Model):
	roll_number = models.CharField(max_length=20)
	date = models.DateTimeField()
