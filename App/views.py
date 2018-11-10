import hashlib
import random
import time
import uuid
import json

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from App.models import *


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
    if token:
        user = User.objects.get(token=token)

        carts = Cart.objects.filter(user=user).exclude(number=0)
        return render(request, 'cart.html', context={'username': user.username,'carts':carts})
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


def detail(request,id):
    jsoner = Jsons.objects.get(id=id)
    token = request.COOKIES.get('token')
    users = User.objects.filter(token=token)
    if users.exists():
        user = users.first()
        return render(request, 'detail.html',
                      context={'username': user.username,'jsoner':jsoner})
    else:
        return render(request, 'detail.html',context={'jsoner':jsoner})




#添加购物车操作
def addcart(request):
    goodsid = request.GET.get('goodsid')
    token = request.COOKIES.get('token')
    responseData = {
        'msg': '添加购物车成功',
        'status': 1
    }

    if token:
        user = User.objects.get(token=token)
        goods = Jsons.objects.get(pk=goodsid)
        carts = Cart.objects.filter(user=user).filter(goods=goods)
        if carts.exists():
            cart = carts.first()
            cart.number = cart.number + 1
            cart.save()
            responseData['number'] = cart.number
        else:
            cart = Cart()
            cart.user = user
            cart.goods = goods
            cart.number = 1
            cart.save()
            responseData['number'] = cart.number

        return JsonResponse(responseData)
    else:
        responseData['msg'] = '未登录，请登录后操作'
        responseData['status'] = -1
        return JsonResponse(responseData)

#下单界面改变数量操作
def addcart_num(request):
    goodsid = request.GET.get('goodsid')
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    goods = Jsons.objects.get(pk=goodsid)
    responseData = {
        'msg': '添加购物车成功',
        'status': 1
    }
    carts = Cart.objects.filter(user=user).filter(goods=goods)
    cart = carts.first()
    cart.number = cart.number + 1
    cart.save()
    responseData['number'] = cart.number
    return JsonResponse(responseData)
#减操作
def subcart_num(request):
    goodsid = request.GET.get('goodsid')
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    goods = Jsons.objects.get(pk=goodsid)
    responseData = {
        'msg': '操作成功',
        'status': 1
    }
    carts = Cart.objects.filter(user=user).filter(goods=goods)
    cart = carts.first()
    cart.number = cart.number - 1
    cart.save()
    responseData['number'] = cart.number
    # if cart.number ==0 :
    #     cart.delete()
    return JsonResponse(responseData)

#单选
def changecartstatus(request):
    goodsid = request.GET.get('goodsid')
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    goods = Jsons.objects.get(pk=goodsid)
    carts = Cart.objects.filter(user=user).filter(goods=goods)
    cart = carts.first()
    if cart.isselect ==1:
       cart.isselect =False
       cart.save()

    else:
        cart.isselect=True
        cart.save()
    responseData = {
        'msg': '操作成功',
        'status': 1
    }
    return JsonResponse(responseData)


def allchangeadd(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    carts = Cart.objects.filter(user=user)
    for cart in carts:
        cart.isselect=True
        cart.save()
    responseData = {
        'msg': '操作成功',
        'status': 1
    }

    return JsonResponse(responseData)


def allchangere(request):
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    carts = Cart.objects.filter(user=user)
    for cart in carts:
        cart.isselect = False
        cart.save()
    responseData = {
        'msg': '操作成功',
        'status': 1
    }

    return JsonResponse(responseData)


def del_the(request):
    goodsid = request.GET.get('goodsid')
    token = request.COOKIES.get('token')
    user = User.objects.get(token=token)
    goods = Jsons.objects.get(pk=goodsid)
    carts = Cart.objects.filter(user=user).filter(goods=goods)
    cart = carts.first()
    cart.delete()
    responseData = {
        'status': 1
    }
    return JsonResponse(responseData)