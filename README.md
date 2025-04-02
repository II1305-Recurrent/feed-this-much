# feed-this-much
## How to feed your pets?  
II1305 Project 

# Windows
If you are using Windows, you can install WSL and follow the rest of instructions. 

# Folder structure

**backend**: all the code regarding the django backend
**frontend**: all the code regarding the react frontend

# How to set up local env
Project has some dependencies that need to be installed. We use `uv` package manager to handle the dependencies. 

**uv**: Use the link (https://github.com/astral-sh/uv) to install

Create the virtual environment by running `uv venv`
Activate the virtual environment by running `source .venv/bin/activate` and run `uv sync` to install the dependencies

Navigate to `frontend/feed-this-much-client` and run `npm i` and `npm install next`

## How to run django development server locally
Navigate to `backend/feed-this-much` folder and open `settings.py` file, change `DEBUG=False` to `DEBUG=True`.

Navigate to `backend` folder and run `python manage.py runserver`

### How to run backend unit tests locally
Navigate to `backend` directory and run `python manage.py test`

## How to run NextJS (ReactJS) development server locally
Navigate to `frontend/feed-this-much-client` folder and run `npm run dev`
