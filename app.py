#import Flask
from flask import Flask, render_template, request
from flask_restful import reqparse
from flask_cors import CORS #comment this on deployment
import pickle

import pandas as pd

#create an instance of Flask
app = Flask(__name__, static_folder='front-end/build')
app.config['JSON_SORT_KEYS'] = False
# app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
#Route to home page
@app.route('/')
def home():
    return render_template('home.html')
if __name__ == '__main__':
    app.run(host='localhost', debug=True)
    

@app.route('/predict/', methods=['POST'])
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
def getList():
    csv_data = pd.read_csv('./data/simple_data.csv')
    csv_data = csv_data[['value', 'label']]
    json_data = csv_data.to_json(orient='index')
    return json_data