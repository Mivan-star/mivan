from flask import Flask, jsonify
import requests

app = Flask(__name__)

# Route to fetch live market data (e.g., using Alpha Vantage API)
@app.route('/api/market-data', methods=['GET'])
def get_market_data():
    # Replace with your Alpha Vantage API key
    API_KEY = 'your_alpha_vantage_api_key'
    symbol = 'AAPL'  # Example: Apple stock
    url = f'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval=1min&apikey={API_KEY}'
    
    response = requests.get(url)
    data = response.json()
    return jsonify(data)  # Return JSON data to the frontend

if __name__ == '__main__':
    app.run(debug=True)
