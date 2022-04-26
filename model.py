import pickle
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Import Data
metaData = pd.read_csv('./data/main_data.csv', engine='python');
metaData = metaData.drop(columns = 'Unnamed: 0')

# StringSet = Join of Strings of the features we wanted
def create_stringSet(x):
    stringSet =  (
            ''.join(x['Cuisine Style']) + ' ' + 
            ''.join(x['Cuisine Style']) + ' ' + 
            ''.join(x['Cuisine Style']) + ' ' + 
            ''.join(x['Price Range']) + ' ' +
            ''.join(x['Price Range']) + ' ' +
            ''.join(x['Reviews']) + ' ' +
            ''.join(str(x['Rating']))
            )
    return stringSet;

metaData = metaData.reset_index()
indices = pd.Series(metaData.index, index=metaData['Name'])
count = CountVectorizer(stop_words="english")

def run(inputs):
    global metaData
    global indices
    global count
    
    metaData['stringSet'] = metaData.apply(create_stringSet, axis=1)
    metaData['stringSet'].head()
    
    if (len(inputs) == 1):
        
#         metaData = metaData.reset_index()
        # Identify metaData Index
        indices= pd.Series(metaData.index, index=metaData['Name'])

        #Another Way: tfIdVectorizer => Weight instead of Count (Give weight to frequent word)

        # Return Matrix of count words
        count_matrix = count.fit_transform(metaData['stringSet'])
        cosine_sim2 = cosine_similarity(count_matrix, count_matrix)
        
        return give_rec(inputs[0], cosine_sim2)
    else:
        # indices = pd.Series(metaData.index, index=metaData['Name'])
        metaData =giveMultiRec(len(inputs), inputs, metaData)
        
#         metaData = metaData.reset_index()
        # Identify metaData Index
        indices = pd.Series(metaData.index, index=metaData['Name'])
        result, metaData = getRealRec(metaData, count)
        return result
    
def give_rec(title, sig):
    #     Get the Index of Restaurant's name given
    idx = indices[title]
    
    sig_scores = list(enumerate(sig[idx]))
    
    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    
    sig_scores = sig_scores[1:11]
    
    res_indices = [i[0] for i in sig_scores]

    resList = (metaData[['Name', 'Cuisine Style', 'Rating', 'URL_TA']].iloc[res_indices])

    return resList

def giveMultiRec(userNum, Names, metaData):
    if len(Names) != userNum:
        return False
    else:
        indexes = []
        for name in Names:
            indexes.append(indices[name])

        stringSet = ''
        for i in indexes:
            stringSet += (metaData['stringSet'].iloc[i])
        
        metaData = metaData.append({'Name': 'Input','stringSet' : stringSet}, ignore_index=True)
        
        return metaData

def getRealRec(metaData, count):
    count_matrix = count.fit_transform(metaData['stringSet'])

    cosine_sim3 = cosine_similarity(count_matrix, count_matrix)
    result = give_rec('Input', cosine_sim3)
    metaData = metaData[:-1]
    return result, metaData

# result = run(['Kinkao', 'Rosa\'s Thai Cafe Soho', 'Tootoomoo Whetstone'])
# result
# print(result)
# pickle.dump(run, open('model.pkl','wb'))
# model = pickle.load(open('model.pkl','rb'))
# output = (model(['Bollywood Brasserie', 'Bar 61 Restaurant']))
# print(output)
# pickle.dump(run, open('model.pkl','wb'))
# model = pickle.load(open('model.pkl','rb'))
# output = (model(['Bollywood Brasserie', 'Bar 61 Restaurant']))
# print(output)