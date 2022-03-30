#!/usr/bin/env python
# coding: utf-8

# In[43]:


import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
import matplotlib.pyplot as plt


# In[44]:


data = pd.read_excel("GSE46579.xls")
data


# In[45]:


t = data.transpose()
t.columns = t.iloc[0]
t = t[1:]
t


# In[46]:


plt.figure(figsize = (10, 10))
plt.scatter(data.AD, data.control/.10, color = "green", alpha = 0.05)


# In[47]:


data.describe()


# In[48]:


scaler = MinMaxScaler()
data_norm = scaler.fit_transform(t)
data_norm


# In[49]:


dataframe = pd.DataFrame(data_norm)
dataframe.columns = t.columns
df2 = dataframe.set_index(t.index)
df2


# In[50]:


dataframe
dataframe.to_csv("filename.csv")

