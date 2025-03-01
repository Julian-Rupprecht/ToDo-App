from flask import Blueprint, render_template, request, flash, jsonify
from flask_login import login_required, current_user
from . import db
from .models import Task
import json

views = Blueprint('views', __name__)

@views.route('/', methods=["GET", "POST"])
@login_required
def home():
    if request.method == 'POST':
        data = request.form.get('data')
        
        if len(data) < 1:
            flash('To-Do must contain atleast 1 character', category='error')
        else:
            new_task = Task(data=data, user_id=current_user.id)
            db.session.add(new_task)
            db.session.commit()
            flash('Added To-Do', category='success')

    return render_template('home/home.html', user=current_user)

@views.route('/delete-task', methods=["POST"])
def delete_task():
    
    task = json.loads(request.data)
    taskId = task['taskId']
    task = Task.query.get(taskId)

    if task:
        if task.user_id == current_user.id:
            db.session.delete(task)
            db.session.commit()
            flash('Task deleted', category='success')
            return jsonify({})
        
    flash('Error while trying to delete task', category='error')
    return jsonify({})