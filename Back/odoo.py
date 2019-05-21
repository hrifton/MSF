__author__ = 'AsbaguiHicham'
import xmlrpc.client
import json
import ssl

# connexion
url = 'https://trackmystuff-dev.ocb.msf.org'
db = 'MSF'
username = 'julien.van.de.casteele@brussels.msf.org'
password = 'TMS123'

server = xmlrpc.client.ServerProxy(url+'/xmlrpc/2/common',verbose=False, use_datetime=True,context=ssl._create_unverified_context())

common = xmlrpc.client.ServerProxy('{}/xmlrpc/2/common'.format(url)) 
print("server--------------")
print(server)
print("common//////////////////////////")
print (common)

uid = server.authenticate(db, username, password, {})

print (uid)
id=server.authenticate(db,username,password,{})
print (id)
models = xmlrpc.client.ServerProxy('{}/xmlrpc/object'.format(url))

models.execute_kw(db, uid, password,
    'product', 'check_access_rights',
    ['read'], {'raise_exception': False})