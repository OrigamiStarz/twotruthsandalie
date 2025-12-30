from flask import Flask, request
import random

# Create a Flask application instance
app = Flask(__name__)

# Obtain truths/lies from txt files
with open("truths.txt", "r") as f:
    truths = f.read().splitlines()
with open("lies.txt", "r") as f:
    lies = f.read().splitlines()

# API Route to generate 2 truths and a lie
@app.route("/generate")
def generate():
    # generate 2 random truths and 1 random lie
    truth1, truth2 = random.sample(truths, 2)
    lie = random.choice(lies)
    choices = [truth1, truth2, lie]
    random.shuffle(choices)
    return {
        "choices": choices
    }

# API Route to verify the truthfulness of a statement
@app.route("/verify", methods=["POST"])
def verify():
    data = request.get_json()
    statement = data.get("choice", "")

    if statement in truths:
        result = "truth"
    elif statement in lies:
        result = "lie"
    else:
        result = "unknown"

    return {"result": result}


# Run the application
if __name__ == "__main__":
    app.run(debug=True)
