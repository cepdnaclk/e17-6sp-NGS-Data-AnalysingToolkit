___
# Next Generation Sequencing Data Analysing Toolkit
___


#### Table of Contents
1. [Introduction](#Introduction)
3. [High Level Architecture](#High-Level-Architecture)
4. [Software Model](#software-design)
5. [Mechine Learning Model](#ML-Model)
6. [Use case Diagram](#Use-case-Diagram)
7. [Team](#Developers)
8. [Links](#Links)



## Introduction
Alzheimer’s disease (AD) has now been identified as the sixth most leading death cause in world. According to the Alzheimer’s Association, no cure has still been found for AD.
there is even no way to weaken the progress of spreading the AD in patient’s body. It also mentions that the only available treatment in the medical field is for reducing its symptoms, like memory loss and confusion. Over the last few decades, doctors have used few methods like medical tests for checking memory and scans like positron emission tomography (PET) for scanning the patient’s brain. But, it is not possible to diagnose Alzheimer’s disease for certain from those methods. microRNAs (miRNAs) are small non coding
RNAs which mainly help for regulating gene expressions. The potential of miRNAs as biomarkers for disease diagnosis has been emphasized by several researchers, and miRNA biomarkers can be recognized as a set of biomarkers which could benefit not only diagnosis procedure but also the treatments.

The development of next-generation sequencing (NGS) technology has resulted in a rapid growth in the synthesis of large genomic datasets of miRNAs,and we are developing user-friendly tools for finding biomarkers of genes and visualizing this data have not kept pace. 

Our project is to develop a web application which can provide a user-friendly interface for Alzheimer disease prediction and finding biomarker genes for particular disease using differential expression analysis of human mRNA sequence data. We improve on available tools by offering a range of normalization, feature selection and classification methods and a simple to use interface.


## High Level Architecture


## Software design

Our application can be used to analyze the provided RNA-Seq datasets or users can upload their own human RNA-seq data for finding biomarkers for particular disease and disease prediction. Dataset should have the form that genes as rows and samples as columns which should include both control and AD samples. Files can be uploaded as a .csv or .xls file.

In our application, User can:
1.	browse a table of provided data or upload their own, then apply various normalization, feature selection algorithms, and classifiers to it.
2.	use the single field search bar, which can be used to find genes in the table.
3.	By selecting a gene from the table, the user can view a box plot that shows whether or not the sample has an impact on a specific disease.

### Features of our application:
- Tool will be keep stable and hosted online, independent for web browser, and not work with local installation.
-	High quality analysis tools should be packaged in a way that does not require expert knowledge of programming, but be accessed via a graphical user interface (GUI).
-	Users can choose from different data normalization, feature selection, classification methods, giving them more options for data analysis.
-	The output and results should be available in an easy-to-use format for data tables and plots.
-	The ability to select a good data processing pipeline and NO need for programming skills to put it in place.

### UI Designs

#### LogIn/SignUp
<center> <img src='docs/images/UIDesigns/Login_SignUp.png'> </img> </center>

#### Upload File
<center> <img src='docs/images/UIDesigns/Upload_File.png'> </img> </center>

#### Data Visualise
<center> <img src='docs/images/UI Designs/Data Visualise.png'> </img> </center>

#### Boxplot Visualise
<center> <img src='docs/images/UIDesigns/BoxPlot_Visualise.png'> </img> </center>

## ML Model


## Use case Diagram
<center> <img src='docs/images/use-case-diagram.PNG'> </img> </center>

## Developers
1. E/17/015 Arshad MRM.  [[Email]](mailto:e17015@eng.pdn.ac.lk)
2. E/17/230 Nishankar S. [[Email]](mailto:e17230@eng.pdn.ac.lk)
3. E/17/159 Kavinaya Y. [[Email]](mailto:e17159@eng.pdn.ac.lk)

## Scrum Master
1. Mr. Imesh Ekanayake [[Email](mailto:)]

## Product Owner
1. Dr. Damayanthi Herath [[Email](mailto:damayanthiherath@eng.pdn.ac.lk)]


## Links
- [Project Page](https://cepdnaclk.github.io/e17-co328-NGS-Data-AnalysingToolkit/)
- [Department Web Site](http://www.ce.pdn.ac.lk/)
- [University of Peradeniya](https://eng.pdn.ac.lk/)




