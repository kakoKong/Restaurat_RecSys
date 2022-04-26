#import Flask
from audioop import cross
from flask import Flask, render_template, request, send_from_directory
from flask_restful import reqparse
from flask_cors import CORS, cross_origin #comment this on deployment
import pickle

import pandas as pd

#create an instance of Flask
app = Flask(__name__, static_folder='front-end/build', static_url_path='')
app.config['JSON_SORT_KEYS'] = False
# app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)

@app.route('/predict/', methods=['POST'])
@cross_origin
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
        
        try:
            output = restaurant_prediction(ret_msg)
            output = output[['Name', 'Cuisine Style', 'Rating', 'URL_TA']]
            # print(type(output))
            result = output.to_json(orient="records")

            print(result)
            return result
        
        except ValueError:
            return 'invalid Value'
    pass

def restaurant_prediction(name):
    #Load Machine Learning Model
    model = pickle.load(open('model.pkl','rb'))
    result = model(name)
    return result

@app.route('/list/', methods=['GET'])
@cross_origin
def getList():
    csv_data = pd.read_csv('./data/simple_data.csv')
    csv_data = csv_data[['value', 'label']]
    json_data = csv_data.to_json(orient='index')
    return json_data

@app.route('/')
@cross_origin
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run()