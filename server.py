#!/usr/bin/env python3
"""
Flask server
"""

import os

from flask.helpers import make_response
from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash, jsonify

# configuration
PROJECT_ROOT = os.path.join(os.path.dirname(os.path.realpath(__file__)), 'demo')
TEMPLATES_AUTO_RELOAD = True

app = Flask(__name__,
    template_folder=os.path.join(PROJECT_ROOT, 'templates'),
    static_folder=os.path.join(PROJECT_ROOT, 'static'))
app.jinja_env.auto_reload = True
app.config.from_object(__name__)

@app.route('/')
def index():
    return render_template('index.html', type=None)


##### API #######


##### Other #####

@app.errorhandler(404)
def not_found(error):
    res = make_response(render_template('error.html'), 404)
    res.headers['X-Something'] = 'A value'
    return res



if __name__ == '__main__':
    app.run()
