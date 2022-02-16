import pandas as pd

metaData = pd.read_csv('./data/main_data.csv', engine='python');
metaData = metaData.drop(columns = 'Unnamed: 0')

def cleaning(x):
    cleanFeatures = ['[', ']', "'", '"', ',']
    for feature in cleanFeatures:
        x = x.replace(feature, '')
    return x

features = ['Cuisine Style', 'Reviews']

for feature in features:
    metaData[feature] = metaData[feature].apply(cleaning)

metaData['Rating'] = metaData['Rating'].round(1)
metaData = metaData.drop_duplicates(subset=['Name'], keep="first")

metaData['Price Range'] = metaData['Price Range'].replace(
    {1.0 : 'CheapPrice', 
     2.0 : 'MediumPrice', 
     3.0: 'ExpensivePrice'}
)

def create_soup(x):
    soup =  (''.join(x['Cuisine Style']) + ' ' + 
             ''.join(x['Reviews']) + ' ' +
             ''.join(str(x['Rating'])) + ' ' +
             ''.join(x['Price Range'])
            )
    return soup;

#Making a Soup
metaData['soup'] = metaData.apply(create_soup, axis=1)
metaData['soup'].head()

from sklearn.feature_extraction.text import CountVectorizer
count = CountVectorizer(stop_words="english")

count_matrix = count.fit_transform(metaData['soup'])
count_matrix.shape

metaData = metaData.reset_index()
indices = pd.Series(metaData.index, index=metaData['Name'])

from sklearn.metrics.pairwise import cosine_similarity

cosine_sim2 = cosine_similarity(count_matrix, count_matrix)

def give_rec(title, sig=cosine_sim2):
    idx = indices[title]
#     print(sig[idx])
    sig_scores = list(enumerate(sig[idx]))
#     print(sig_scores)

    sig_scores = sorted(sig_scores, key=lambda x: x[1], reverse=True)
    
    sig_scores = sig_scores[1:11]
    
    res_indices = [i[0] for i in sig_scores]
    
    resList = []
    resList = (metaData['Name'].iloc[res_indices].values)
#     print(metaData['Name'].)
    return resList



print(give_rec('Bollywood Brasserie'))