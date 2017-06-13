import json
import urllib2

# people

person1 = {'personId': 'PID:101', 'firstName': 'Alice', 'lastName': 'Armstrong'}
req_person1 = urllib2.Request('http://localhost:3000/api/Person')
req_person1.add_header('Content-Type', 'application/json')
urllib2.urlopen(req_person1, json.dumps(person1))

person2 = {'personId': 'PID:102', 'firstName': 'Bob', 'lastName': 'Bradley'}
req_person2 = urllib2.Request('http://localhost:3000/api/Person')
req_person2.add_header('Content-Type', 'application/json')
urllib2.urlopen(req_person2, json.dumps(person2))

person3 = {'personId': 'PID:103', 'firstName': 'Chris', 'lastName': 'Caldwell'}
req_person3 = urllib2.Request('http://localhost:3000/api/Person')
req_person3.add_header('Content-Type', 'application/json')
urllib2.urlopen(req_person3, json.dumps(person3))

# properties

property1 = {'titleId': 'LID:1001', 'owner': 'resource:net.biz.digitalPropertyNetwork.Person#PID:101', 'information': 'Nice house in the mountains'}
req_property1 = urllib2.Request('http://localhost:3000/api/LandTitle')
req_property1.add_header('Content-Type', 'application/json')
urllib2.urlopen(req_property1, json.dumps(property1))

property2 = {'titleId': 'LID:1002', 'owner': 'resource:net.biz.digitalPropertyNetwork.Person#PID:102', 'information': 'Small house in a village'}
req_property2 = urllib2.Request('http://localhost:3000/api/LandTitle')
req_property2.add_header('Content-Type', 'application/json')
urllib2.urlopen(req_property2, json.dumps(property2))
