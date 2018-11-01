import hashlib
import random
import time
import uuid
import json

from django.http import HttpResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.models import User, Jsons, Slideer


def index(request):
    # fp = open('/home/tjp/Desktop/python1809_Django/Django000/static/jsonp/goods.json', 'r', encoding='utf-8')
    # contents = fp.read()
    # contents = json.loads(contents)
    # for content in contents:
    #     jsonobj = Jsons()
    #     jsonobj.title = content['title']
    #     jsonobj.now_price = content['now_price']
    #     jsonobj.old_price = content['old_price']
    #     jsonobj.discount = content['discount']
    #     jsonobj.price_discount = content['price_discount']
    #     jsonobj.src = content['src']
    #     jsonobj.save()

    # fp = open('/home/tjp/Desktop/python1809_Django/Django000/static/jsonp/slideer.json', 'r', encoding='utf-8')
    # contents = fp.read()
    # contents = json.loads(contents)
    # for content in contents:
    #     slideers = Slideer()
    #     slideers.url = content['url']
    #     slideers.color = content['color']
    #     slideers.save()











    json_list = Jsons.objects.all()
    slideers = Slideer.objects.all()
    token = request.COOKIES.get('token')
    users = User.objects.filter(token=token)
    if users.exists():
        user = users.first()
        return render(request, 'index.html',context={'username':user.username,'json_list':json_list,'slideers':slideers})
    else:
        return render(request, 'index.html',context={'json_list':json_list,'slideers':slideers})

def generate_token():
        token = str(time.time()) + str(random.random())
        # MD5
        md5 = hashlib.md5()
        md5.update(token.encode('utf-8'))
        return md5.hexdigest()


def login(request):
    if request.method == 'GET':
        return render(request, 'login.html')
    elif request.method == 'POST':
        username = request.POST.get('mobile')
        # 验证
        password = request.POST.get('pwd')

        users = User.objects.filter(username=username, password=password)
        if users.exists():

            user = users.first()
            user.token = generate_token()
            user.save()
            response = redirect('app:index')
            response.set_cookie('token', user.token)

            return response
        else:
            return HttpResponse('用户名或密码错误')
def register(request):
    if request.method =='GET':
       return render(request,'login.html')
    elif request.method =='POST':
       username = request.POST.get('mobile')
       password = request.POST.get('pwd')
       try:
           user = User()
           user.username = username
           user.password = password
           user.token =uuid.uuid5(uuid.uuid4(), 'register')

           user.save()
           response = redirect('app:index')
           response.set_cookie('token',user.token)
           return response
       except Exception as e:
           return  HttpResponse('注册失败'+e)
def logout(request):
    response = redirect('app:index')
    response .delete_cookie('token')
    return response

def cart(request):
    token = request.COOKIES.get('token')
    users = User.objects.filter(token=token)
    if users.exists():
        user = users.first()
        return render(request, 'cart.html', context={'username': user.username})
    else:
        return render(request, 'cart.html')


def login1(request):
    if request.method == 'GET':
        return render(request, 'login1.html')
    elif request.method == 'POST':
        username = request.POST.get('mobile')
        # 验证
        password = request.POST.get('pwd')

        users = User.objects.filter(username=username, password=password)
        if users.exists():

            user = users.first()
            user.token = generate_token()
            user.save()
            response = redirect('app:cart')
            response.set_cookie('token', user.token)

            return response
        else:
            return HttpResponse('用户名或密码错误')


def register1(request):
    if request.method =='GET':
       return render(request,'login1.html')
    elif request.method =='POST':
       username = request.POST.get('mobile')
       password = request.POST.get('pwd')
       try:
           user = User()
           user.username = username
           user.password = password
           user.token =uuid.uuid5(uuid.uuid4(), 'register')

           user.save()
           response = redirect('app:cart')
           response.set_cookie('token',user.token)
           return response
       except Exception as e:
           return  HttpResponse('注册失败' + e)



# def json_read(request):
#     fp = open('/home/tjp/Desktop/python1809_Django/Django000/static/jsonp/goods.json', 'r', encoding='utf-8')
#     contents = fp.read()
#     contents = json.loads(contents)
#     jsonobj = Jsons()
#     for content in contents:
#         jsonobj.title = content['title']
#         jsonobj.now_price = content['now_price']
#         jsonobj.old_price = content['old_price']
#         jsonobj.discount = content['discount']
#         jsonobj.price_discount = content['price_discount']
#         jsonobj.src = content['src']
#         jsonobj.save()
#
#     return render(request,'json.html')


def detail(request):
    return render(request,'detail.html')