import pandas as pd
import pickle
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Import Data
metaData = pd.read_csv('./data/main_data.csv', engine='python');
metaData = metaData.drop(columns = 'Unnamed: 0')

# Remove Any Useless String
def cleaning(x):
    cleanFeatures = ['[', ']', "'", '"', ',']
    for feature in cleanFeatures:
        x = x.replace(feature, '')
    return x

# Clean data inside these 2 features
features = ['Cuisine Style', 'Reviews']

for feature in features:
    metaData[feature] = metaData[feature].apply(cleaning)
    
# Clean the data that has same name, keep the one that have higher rating
metaData['Rating'] = metaData['Rating'].round(1)
metaData = metaData.drop_duplicates(subset=['Name'], keep="first")

#Rename the Price Range into String
metaData['Price Range'] = metaData['Price Range'].replace(
    {1.0 : 'CheapPrice', 
     2.0 : 'MediumPrice', 
     3.0: 'ExpensivePrice'}
)

# Soup = Join of Strings of the features we wanted
# Weight (Descending): Cuisine Style, Price Range, Reviews 
def create_soup(x):
    soup =  (''.join(x['Cuisine Style']) + ' ' + 
             ''.join(x['Reviews']) + ' ' +
             ''.join(str(x['Rating'])) + ' ' +
             ''.join(x['Price Range'])
            )
    return soup;

def run(inputs, metaData):
    metaData['soup'] = metaData.apply(create_soup, axis=1)
    metaData['soup'].head()
    if (len(inputs) == 1):
        
        metaData = metaData.reset_index()
        # Identify metaData Index
        indices = pd.Series(metaData.index, index=metaData['Name'])
        count = CountVectorizer(stop_words="english")

        #Another Way: tfIdVectorizer => Weight instead of Count (Give weight to frequent word)

        # Return Matrix of count words
        count_matrix = count.fit_transform(metaData['soup'])
        cosine_sim2 = cosine_similarity(count_matrix, count_matrix)
        
        return give_rec(inputs[0], cosine_sim2, indices)
    else:
        indices = pd.Series(metaData.index, index=metaData['Name'])
        metaData =giveMultiRec(len(inputs), inputs, metaData, indices)
        
        metaData = metaData.reset_index()
        # Identify metaData Index
        indices = pd.Series(metaData.index, index=metaData['Name'])
        result, metaData = getRealRec(metaData, count)
        return result
    
def give_rec(title, sig, indices):
    #     Get the Index of Restaurant's name given
    idx = indices[title]
    
    sig_scores = list(enumerate(sig[idx]))

    print(sig_scores[:5])
    
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    
    print(sig_scores[:5])
    sig_scores = sig_scores[1:11]
    
    res_indices = [i[0] for i in sig_scores]
    
    resList = []
    resList = (metaData['Name'].iloc[res_indices].values)

    return resList

def giveMultiRec(userNum, Names, metaData, indices):
    if len(Names) != userNum:
        return False
    else:
        indexes = []
        for name in Names:
            indexes.append(indices[name])
        print(indexes)
        soup = ''
        print(metaData['soup'].iloc[0])
        for i in indexes:
            soup += (metaData['soup'].iloc[i])
#         return soup
        print(soup)
        print(type(metaData))
        
        metaData = metaData.append({'Name': 'Input','soup' : soup}, ignore_index=True)
        
        return metaData

def getRealRec(metaData, count):     
    count_matrix = count.fit_transform(metaData['soup'])
    count_matrix.shape

    cosine_sim3 = cosine_similarity(count_matrix, count_matrix)
    result = give_rec('Input', cosine_sim3)
    metaData = metaData[:-1]
    return result, metaData

result = run(['Il Padrino', 'Bollywood Brasserie', 'Banh Banh'], metaData)
