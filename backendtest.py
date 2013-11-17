#!/usr/bin/python
print "Content-Type: text/html"
print


import cgi
import cgitb
import sqlite3
import os
import Cookie
import json
cgitb.enable()
conn = sqlite3.connect('test.db')
c=conn.cursor()


cookie= Cookie.SimpleCookie(os.environ["HTTP_COOKIE"])

if "userName" not in cookie:
    print "fuck u"
    os.exit()

userName=cookie["userName"].value

form=cgi.FieldStorage()

c.execute("INSERT or IGNORE INTO counters VALUES (?,0)",(userName,))

if "readonly" not in form:
    c.execute("UPDATE counters SET count=count+1 WHERE userName=?",(userName,))

c.execute("SELECT count FROM counters WHERE userName=?",(userName,))
count=c.fetchone()
c.execute("SELECT sum(count) FROM counters")
total=c.fetchone()
ar=count+total

print json.dumps(ar)



conn.commit()
conn.close()

