<img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=flat"> <img src="https://img.shields.io/badge/-Bootstrap-563D7C.svg?logo=bootstrap&style=flat"> <img src="https://img.shields.io/badge/-Linux-6C6694.svg?logo=linux&style=flat">

# Djamazon

## Site URL:[Djamazon](https://shinac.pythonanywhere.com/)

Memo to me:\
✅ Each image size should be less than 320px \* 320px.

Technique/Version:

- Python(local) 3.8.6
- Python(production) 3.6
- pip 20.2.1
- Django 3.0.10
- Bootstrap 4.5.0
- SCSS
- Font Awesome
- Pythonanywhere
- VS code
- Always SSL
- CircleCI
- Mailtrap API
- Google API

## How to SetUp

- [ ] Install Homebrew
- [ ] Install Python 3.8.6
- [ ] (Option) Set Python3 to global used
- [ ] Install pip 20.2.1
- [ ] (Important) Make and enter your own virtual environment with **'python3 -m venv env | source env/bin/activate'**
- [ ] Input the environment variable to your terminal. (If you need, I will tell you when it is okay for me.)
- [ ] Clone this Djamazon repo from GitHub with **'git init | git clone urlhogehoge'**
- [ ] Move to the Djamazon BASE_DIR with **'cd Djamazon'**
- [ ] Install every software with **'pip3 install -r requirements.txt'**
- [ ] Open settings.py and switch DEBUG False to True with **'cd ecsite | sudo vi settings.py'** >> Please edit like DEBUG=False to DEBUG=True.
- [ ] Migrate to your local database from our database with **'python3 manage.py makemigrations | python3 manage.py migrate'**
- [ ] Go back to the BASE_DIR and run local server with **'cd .. | python3 run server'**
- [ ] Input 127 to your browser and you can see this site with developing mode!\

### You cannot go well? Please check below!

- [ ] Did you designated the version of pip when installing ?\
       The newest version of pip might not work well because of dependencies of each software.
- [ ] Did you input the environment variable to your terminal ?
- [ ] Did you switched DEBUG False to True ?\
       If not, you will see the 400 Error.
- [ ] If pip3 cannot work as python3 and do as python2, please try with **'python3 -m pip hogehoge'** instead of pip3. It is offical grammer for python.

#### FYI

- **'python manage.py showmigrations'** can show you the status of migrations to your local database.
- If you want to check the content of database(sqlite3) easily with GUI, try using "DB Browser for SQlite".
