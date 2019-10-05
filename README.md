The project structure has a backend and front-end. 
In the backend there is the Django Rest Framework to host a simple API. 
And the front-end uses React and queries data throughout Axios from the API. 
It includes a python script which contain two functions and that can be run to interact with the user to receive ether a 14-bit range -8192 to 8191 to encode to a 4 digits hexadecimal string or two hexadecimal numbers in the range of 00 to 7f and decode them to a decimal number.

It also include a file "ConvertedData.txt" with encoded and decoded values. It is also added a test unit file with methods to verify the accuracy of the values.

```
git init
git clone https://github.com/MGRuizDev/cipherkey.git
virtualenv env
pip install -r requirements.txt
npm i
npm run build
python manage.py runserver
```
