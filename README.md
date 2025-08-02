# Woodle – Wordle-Style Game

Woodle is a Wordle-inspired web game built with Python (Flask), JavaScript, and HTML/CSS. 
Players guess the secret word within a limited number of attempts, with visual feedback for correct letters and positions.

---

## Features

- Wordle-style gameplay with color-coded feedback:
  - Green: Correct letter in the correct position
  - Yellow: Correct letter in the wrong position
  - Gray: Letter not in the word
- Interactive frontend implemented with JavaScript
- Dynamic word list powered by CSV and JSON files
- Flask backend supporting local and cloud deployment
- Responsive design for both desktop and mobile devices

---

## Project Structure

```
.
├── app.py               # Flask backend
├── game.html            # Main game page
├── woodle.js            # JavaScript logic for the game
├── main.css             # Styling for the game
├── logo.png             # Project logo
├── checkko.csv/json/xlsx# Word lists or validation data
├── requirements.txt     # Python dependencies
├── Procfile             # For Heroku deployment
```

---

## Installation and Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/woodle.git
   cd woodle
   ```

2. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate      # macOS/Linux
   venv\Scripts\activate       # Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the Flask application:
   ```bash
   python app.py
   ```

5. Open the game in a browser:
   ```
   http://127.0.0.1:5000
   ```

---

## Deployment (Heroku)

1. Ensure the `Procfile` and `requirements.txt` are present.
2. Login to Heroku and create a new app.
3. Push the project to Heroku:
   ```bash
   git init
   heroku git:remote -a YOUR_HEROKU_APP_NAME
   git add .
   git commit -m "Initial Woodle commit"
   git push heroku main
   ```

---

## Credits

- Developed as a Wordle-inspired project using Flask, HTML, CSS, and JavaScript
- Word lists sourced from included CSV and JSON files

---

## License

This project is intended for educational and demonstration purposes. 
