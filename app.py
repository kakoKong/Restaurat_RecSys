#import Flask
from flask import Flask, render_template, request, jsonify
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import pickle

from pandas import array
from model2 import run

#create an instance of Flask
app = Flask(__name__, static_folder='front-end/build')
# app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
#Route to home page
@app.route('/')
def home():
    return render_template('home.html')
if __name__ == '__main__':
    app.run(host='localhost', debug=True)
    

@app.route('/predict/', methods=['GET','POST'])
def predict():
    
    if request.method == "POST":
        parser = reqparse.RequestParser()
        parser.add_argument('type', type=str)
        parser.add_argument('message', type=str, action='append')

        args = parser.parse_args()
        print(args)
        
        request_type = args['type']
        request_json = args['message']
        # ret_status, ret_msg = ReturnData(request_type, request_json)
        # currently just returning the req straight
        ret_status = request_type
        ret_msg = request_json
        #get form data
        print('eueu')
        print(type(ret_msg))
        
        try:
            output = restaurant_prediction(ret_msg)
            result = {}
            i = 1
            for value in output:
                result[str(i)] = value
                i += 1
            print(result)
            return jsonify(result)
        
        except ValueError:
            return 'invalid Value'
        pass
    
    elif request.method == 'GET':
        return 'Hello from flask'
    pass 

def restaurant_prediction(name):
    #Load Machine Learning Model
    model = pickle.load(open('model.pkl','rb'))
    print(name)
    result = model(name)
    
    return result