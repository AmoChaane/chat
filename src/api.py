import openai
from flask import Flask, jsonify, request
from flask_cors import CORS
openai.api_key = "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"


app = Flask(__name__)
CORS(app)
@app.route('/api')

def callAPI():
    # content = input("User: ")
    print(request)
    content = 'Find any faults with this code and provide the fixed version along with explanations but if no code is provided then just respond as normal: ' + request.args.get('content')
    # content = request.args.get('content')
    print('content: ' + content)
    completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": content}
    ])

    chat_response = completion.choices[0].message.content
    # print(f"ChatGPT: {chat_response}")

    return jsonify({'output': chat_response, 'init': completion.choices[0]})

if __name__ == '__main__':
    app.run()






