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
    url(r'^detail/(\d+)/$',views.detail,name='detail')
]