#import Flask
from flask import Flask, render_template

#create an instance of Flask
app = Flask(__name__)
#Route to home page
@app.route('/')
def home():
    return render_template('home.html')
if __name__ == '__main__':
    app.run(debug=True)