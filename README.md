The project structure has a backend and front-end. 
In the backend there is the Django Rest Framework to host a simple API. 
And the front-end uses React and queries data throughout Axios from the API. 
The interface will received three 16 bytes Hexadecimal numbers and one extra 8 bit hexadecimal number as a modifier. 
The front-end made a call to the api on Django, which will join the three 16 byte number, 
and for every 8th byte it will add a modifier instead, creating a cypher key.
If you want to work with the repository on your local environment. Create a local repository on your directory, clone the repository, create a virtual environment, install requirements for the backend and front-end, and start your applications.

'''
git init
git clone https://github.com/MGRuizDev/cipherkey.git
virtualenv env
pip install -r requirements.txt
npm i
npm run build
python manage.py runserver
'''
