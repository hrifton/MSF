__author__ = 'AsbaguiHicham'
import xmlrpclib
import json
import ssl

# connexion
url = 'https://trackmystuff-dev.ocb.msf.org'
db = 'MSF'
username = 'julien.van.de.casteele@brussels.msf.org'
password = 'TMS123'

server = xmlrpclib.ServerProxy(url+'/xmlrpc/2/common',verbose=False, use_datetime=True,context=ssl._create_unverified_context())

common = xmlrpclib.ServerProxy('{}/xmlrpc/2/common'.format(url)) 
print("server--------------")
print(server)
print("common//////////////////////////")
print (common)

uid = server.authenticate(db, username, password, {})

print (uid)
id=server.authenticate(db,username,password,{})
print (id)
models = xmlrpclib.ServerProxy('{}/xmlrpc/object'.format(url))

models.execute_kw(db, uid, password,
                  'res.partner', 'check_access_rights',
                  ['read'], {'raise_exception': False})