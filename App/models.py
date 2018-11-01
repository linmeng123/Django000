from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=60)
    password = models.CharField(max_length=50)
    token = models.CharField(max_length=256)

class Slideer(models.Model):
    url = models.CharField(max_length=100)
    color = models.CharField(max_length=40)

class Jsons(models.Model):
    title = models.CharField(max_length=256)
    now_price = models.CharField(max_length=60)
    old_price = models.CharField(max_length=60)
    discount = models.CharField(max_length=30)
    price_discount = models.CharField(max_length=11)
    src = models.CharField(max_length=90)
