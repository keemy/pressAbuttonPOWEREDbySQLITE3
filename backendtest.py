#!/usr/bin/python
print "Content-Type: text/html"
print


import cgi
import cgitb
import sqlite3
import os
import Cookie
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
    c.execute("UPDATE counter SET count=count+1 WHERE userName=?",(userName,))

c.execute("SELECT count FROM counters WHERE userName=?",(userName,))
count=c.fetchone()
print count[0]


conn.commit()
conn.close()

