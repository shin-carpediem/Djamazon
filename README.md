<img src="https://img.shields.io/badge/-Django-092E20.svg?logo=django&style=flat"> <img src="https://img.shields.io/badge/-Bootstrap-563D7C.svg?logo=bootstrap&style=flat"> <img src="https://img.shields.io/badge/-Linux-6C6694.svg?logo=linux&style=flat"> <img src="https://img.shields.io/badge/-Sass-CC6699.svg?logo=sass&style=flat"> <img src="https://img.shields.io/badge/-CircleCI-343434.svg?logo=circleci&style=flat">

# [Djamazon](https://djamazonapp.pythonanywhere.com/)

## Feature

- [x] **Djamazon:** Experience of e-commerce with imaginary money(= We call it "Point")
- [x] **Djamazon Games:** Lots of games will make you excited. Some games' levels are rumdam, and other games' levels you can set on purpose. Also, if you will these games, you will be able to get points for shopping.
- [x] **Djamazon Study:** If you are a beginner for Django, you can learn the process of developing this whole application.

## Production Policy

- Securest
- highly restricted namespace/scope at css/js

Memo for me:\
✅ Each "product" image size should be less than 320px \* 320px.

Technique/Version:

local

- python==3.8.6
- venv
- pip==20.2.1
- django==3.0.10
- django-compressor==2.4.0
- django-debug-toolbar==3.2.0
- bootstrap(cdn)==4.5.0
- jquery(cdn)==3.5.1
- scss
- sass compiler(vscode plugin)
- minifer(vscode plugin)
- darkmode.js(cdn)==1.5.7
- chart.js(cdn)==2.9.4
- sqlite==3.32.3
- circleci==0.2.1

unique to production

- pythonanywhere(free plan)
- python==3.8.0
- mysql==5.7.48(switching to sqlite now)

## Branch Rule

- **master:** is only used for deployment to the production environment(=Pythonanywhere).
- **staging:** is used to optimize dev branch for production environment.
- **dev:** is used for every development.

### Work Flow

- [ ] **(For other developer)** Create new branch from dev branch and clone to your local repository.

```
$ git clone -b dev-hogehoge
```

- [ ] **(For other developer)** After development, Minifer all css/js with VS code plugin at your branch, then update your branch.

```
$ git commit -am "Write messages."
```

```
$ git push origin dev-hogehoge
```

- [ ] **(For other developer)** Then, make pull request(=PR) from your branch to dev branch at GitHub.
- [ ] (For develop manager) Swtich to staging branch and merge update of dev branch.

```
$ git switch staging
```

```
$ git pull origin dev
```

- [ ] (For develop manager) Delete all remained original css/js after miniferd at staging branch and upgrade your local staging repositry,then push to staging branch.

```
$ git commit -am "hogehoge"
```

```
$ git push origin staging
```

- [ ] Make PR from staging branch to master branch at GitHub.

## How to SetUp with your local server?

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

- [ ] \(**Important!**) Make and enter your own virtual environment with venv

```
$ python -m venv env && source env/bin/activate
```

- [ ] Input the environment variable into your terminal

```
(If you need, I will tell you when it is okay for me.)
$ export SECRET_KEY="hogehoge"
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

- [ ] Migrate to your local database from our database

```
$ python manage.py makemigrations
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

## How to SetUp with your remote server?

https://tutorial.djangogirls.org/ja/deploy/

### How to optimaize the environment variables to pythonanywhere?

https://help.pythonanywhere.com/pages/environment-variables-for-web-apps/

- [ ] Make ”.env” file at base directory.

```
$ touch .env && vi .env
```

- [ ] Write environment variables into .env file.

```
export SECRET_KEY="hogehoge"
export ...
.
.
```

- [ ] Check ”dotenv” has already installed, and if not, install it.

```
$ pip install dotenv
```

- [ ] Write some code at wsgi file uniqe to pythonanywhere

```
import os
from dotenv import load_dotenv
project_folder = os.path.expanduser('~/my-project-dir')  # adjust as appropriate
load_dotenv(os.path.join(project_folder, '.env'))
```

- [ ] To avairable environment variables, do not forget to type this command.

```
$ set -a; source ~/djamazonapp.pythonanywhere.com/.env; set +a
```

- [ ] and do not forget to optimize static files to production.

```
$ python manage.py collectstatic
```

..unless you would see admin page with non decorated by css.

### How to avairable lanugage translation at pythonanywhere?

```
$ python manage.py compilemessages
```

### How to migrate from sqlite3 to MySQL of pythonanywhere?

https://qiita.com/nnsnodnb/items/9e99e7f0ca3f82bf2171

＊Each word of Every method should be CAPITAL.

To connect with mysql, use this command.

```
$ mysql -u djamazonapp -h djamazonapp.mysql.pythonanywhere-services.com -p
```
