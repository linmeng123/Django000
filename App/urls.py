from django.conf.urls import url

from App import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^login/$',views.login,name='login'),
    url(r'^register/$',views.register,name='register'),
    url(r'^logout/$',views.logout,name='logout'),
    url(r'^register1/$',views.register1,name='register1'),
    url(r'^login1/$',views.login1,name='login1'),
    url(r'^cart/$',views.cart,name='cart'),
    url(r'^detail/(\d+)/$',views.detail,name='detail'),
    url(r'^addcart/$',views.addcart,name='addcart'),
    url(r'^addcart_num/$',views.addcart_num,name='addcart_num'),
    url(r'^subcart_num/$',views.subcart_num,name='subcart_num'),
    url(r'^changecartstatus/$',views.changecartstatus,name='changecartstatus'),
    url(r'^allchangeadd/$',views.allchangeadd,name='allchangeadd'),
    url(r'^allchangere/$',views.allchangere,name='allchangere'),
    url(r'^del_the/$',views.del_the,name='del_the')
]