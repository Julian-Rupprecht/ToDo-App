from flask import Blueprint, render_template, request, flash, redirect, url_for
from .models import User
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_login import login_user, login_required, logout_user, current_user

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

        if len(email) < 4:
            flash('Email must contain atleast 4 characters', category='error')
        elif len(password) < 9:
            flash('Password must contain atleast 9 characters', category='error')
        else: 
            user = User.query.filter_by(email=email).first()
            if user:
                if check_password_hash(user.password, password):
                    flash('Logged in successfully', category='success')
                    login_user(user, remember=True)
                    return redirect(url_for('views.home'))
            flash('Invalid credentials, please try again', category='error')

    return render_template('login/login.html', user=current_user)

@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('auth.login'))

@auth.route('signup', methods=['GET', 'POST'])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        name = request.form.get('name')
        password = request.form.get('password')
        confirmPassword = request.form.get('confirm-password')

        user = User.query.filter_by(email=email).first()
        if user:
            flash('Email address already exists', category='error')
        elif len(email) < 4:
            flash('Email must contain atleast 4 characters', category='error')
        elif len(name) < 2:
            flash('Name must contain atleast 2 character', category='error')
        elif password != confirmPassword:
            flash('Passwords do not match', category='error')
        elif len(password) < 9: 
            flash('Password must contain atleast 9 characters', category='error')
        else:
            new_user = User(email=email, name=name, password=generate_password_hash(password))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created successfully', category='success')
            return redirect(url_for('views.home'))
    return render_template('signup/signup.html', user=current_user)


