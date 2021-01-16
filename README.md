<img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=flat"> <img src="https://img.shields.io/badge/-Bootstrap-563D7C.svg?logo=bootstrap&style=flat"> <img src="https://img.shields.io/badge/-Linux-6C6694.svg?logo=linux&style=flat">

# Djamazon

## Site URL:[Djamazon](https://shinac.pythonanywhere.com/)

Memo to me:\
✅ Each image size should be less than 320px \* 320px.

Technique/Version:

- Python(local)==3.8.6
- Python(production)==3.6
- pip==20.2.1
- Django==3.0.10
- django-debug-toolbar==3.2
- Bootstrap==4.5.0
- SCSS
- Pythonanywhere
- Always SSL
- CircleCI
- GitGuardian

## How to SetUp with your local server

- [ ] Install Homebrew

```
$ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- [ ] Install pyenv

```
$ brew install pyenv
```

- [ ] Set the environment variable into your terminal.\
       If you are using zsh shell,

```
$ cd && sudo vi .zshrc
```

\
 If you are using bash shell,

```
# cd && sudo vi .bash_profile
```

- [ ] Type "i" and input below and then, type esc button and "ZZ"

```
$ export PYENV_ROOT=${HOME}/.pyenv
if [ -d "${PYENV_ROOT}" ]; then
    export PATH=${PYENV_ROOT}/bin:$PATH
    eval "$(pyenv init -)"
fi
```

- [ ] Install Python 3.8.6 and check it

```
$ pyenv install 3.8.6 && pyenv versions
```

- [ ] \(**Option but recommended**) Set Python3 to default

```
$ pyenv global 3.8.6 && python -V
```

- [ ] Install pip 20.2.1

```
$ brew install pip==20.2.1
```

- [ ] \(**Important!**) Make and enter your own virtual environment

```
$ python -m venv env && source env/bin/activate
```

- [ ] Input the environment variable into your terminal.

```
(If you need, I will tell you when it is okay for me.)
$ export ...
$ export ...
.
.
```

- [ ] Clone this Djamazon repo from GitHub

```
$ git init && git clone https://github.com/shin-carpediem/Djamazon.git
```

- [ ] Move to the Djamazon BASE_DIR

```
$ cd Djamazon
```

- [ ] Install every software

```
$ pip install -r requirements.txt
```

- [ ] Open settings.py and switch DEBUG False to True

```
$ cd ecsite && sudo vi settings.py
```

> > Please edit DEBUG from False to True.

- [ ] Migrate to your local database from our database

```
$ cd .. && python manage.py makemigrations
```

```
$ python manage.py migrate
```

- [ ] Go back to the BASE_DIR and run local server

```
$ python manage.py runserver
```

- [ ] Input "127.0.0.1" to your browser URL and you can see this site with developing mode!

### You cannot go well? Please check below!

- [ ] Did you designated the version of pip when installing ?\
       The newest version of pip might not work well because of dependencies of each software.
- [ ] Did you input the environment variable to your terminal ?
- [ ] Did you switched DEBUG False to True ? If not, you will see the 400 Error.
- [ ] If pip3 cannot work as python3 and do as python2, please try below instead of pip3.\
       It is offical grammer for python.

```
$ python3 -m pip install hogehoge
```

#### FYI

```
$ python manage.py showmigrations
```

- can show you the status of migrations to your local database.
- If you want to check the content of database(sqlite3) easily with GUI, try using "DB Browser for SQlite".

## How to SetUp with your remote server

https://tutorial.djangogirls.org/ja/deploy/

### How to optimaize the environment varoables to pythonanywere

https://help.pythonanywhere.com/pages/environment-variables-for-web-apps/
