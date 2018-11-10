import json

fp = open('/home/tjp/Desktop/python1809_Django/Django000/static/jsonp/goods.json', 'r', encoding='utf-8')
contents = fp.read()
# contents = json.loads(contents)
contents = eval(contents)
for content in contents:
    # jsonobj = Jsons()

    # jsonobj.title = content['title']
        # jsonobj.now_price = content['now_price']
        # jsonobj.old_price = content['old_price']
        # jsonobj.discount = content['discount']
        # jsonobj.price_discount = content['price_discount']
        # jsonobj.src = content['src']
        # jsonobj.save()
 print(content)