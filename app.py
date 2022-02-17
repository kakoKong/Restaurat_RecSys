#import Flask
from flask import Flask, render_template, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS #comment this on deployment
import pickle
from model import give_rec

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
        
        #get form data
        res_name= request.form.get('res_name')
        sepal_width = request.form.get('sepal_width')
        petal_length = request.form.get('petal_length')
        petal_width = request.form.get('petal_width')
        
        try:
            output = restaurant_prediction(res_name)
            return render_template('predict.html', prediction = output)
        
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