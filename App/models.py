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
class Cart(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 商品
    goods = models.ForeignKey(Jsons)
    # 商品数量(选择)
    number = models.IntegerField()
    # 是否选中
    isselect = models.BooleanField(default=True)


class Order(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 创建时间
    createtime = models.DateTimeField(auto_now_add=True)
    # 状态
    # -1 过期
    # 1 未付款
    # 2 已付款，未发货
    # 3 已发货，快递
    # 4 已签收，未评价
    # 5 已评价
    # 6 退款....
    status = models.IntegerField(default=1)
    # 订单号
    identifier = models.CharField(max_length=256)



class OrderGoods(models.Model):
    # 订单
    order = models.ForeignKey(Order)
    # 商品
    goods = models.ForeignKey(Jsons)
    # 个数
    number = models.IntegerField(default=1)
