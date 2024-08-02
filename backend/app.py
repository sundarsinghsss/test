from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

@app.route('/items', methods=['GET'])
def get_items():
    try:
        items = Item.query.all()
        return jsonify([{'id': item.id, 'name': item.name} for item in items])
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/item', methods=['POST'])
def create_item():
    try:
        data = request.get_json()
        new_item = Item(name=data['name'])
        db.session.add(new_item)
        db.session.commit()
        return jsonify({'id': new_item.id, 'name': new_item.name})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/item/<int:id>', methods=['PUT'])
def update_item(id):
    try:
        data = request.get_json()
        item = Item.query.get(id)
        if item:
            item.name = data['name']
            db.session.commit()
            return jsonify({'id': item.id, 'name': item.name})
        return jsonify({'error': 'Item not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/item/<int:id>', methods=['DELETE'])
def delete_item(id):
    try:
        item = Item.query.get(id)
        if item:
            db.session.delete(item)
            db.session.commit()
            return jsonify({'message': 'Item deleted'})
        return jsonify({'error': 'Item not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Initialize the database
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True)
