## Overview

The **Crypto Price Tracker & Portfolio Management** is a Python-based application that fetches real-time cryptocurrency prices, tracks portfolio performance, and alerts users about significant price movements. The tool integrates **web scraping, API requests, and data visualization** for effective crypto tracking.

## Technical Implementation

### Real-Time Crypto Data Fetching

- Uses the **CoinGecko API** to fetch live cryptocurrency prices.
- Supports fetching **historical data** for trend analysis.

```python
import requests

def fetch_crypto_price(crypto_id):
    url = f"https://api.coingecko.com/api/v3/simple/price?ids={crypto_id}&vs_currencies=usd"
    response = requests.get(url)
    data = response.json()
    return data[crypto_id]['usd']

btc_price = fetch_crypto_price("bitcoin")
print(f"Current Bitcoin Price: ${btc_price}")
```

---

### Portfolio Tracking

- Users can input their holdings, and the tool calculates the **real-time portfolio value**.
- Supports multiple cryptocurrencies with **automated balance updates**.

```python
portfolio = {"bitcoin": 0.5, "ethereum": 2}

def calculate_portfolio_value(portfolio):
    total_value = 0
    for crypto, amount in portfolio.items():
        price = fetch_crypto_price(crypto)
        total_value += price * amount
    return total_value

print(f"Portfolio Value: ${calculate_portfolio_value(portfolio)}")
```

---

### Price Alerts & Notifications

- Sends alerts when price changes exceed a **user-defined threshold**.
- Uses **email/SMS notifications** for timely updates.

```python
def check_price_alert(crypto_id, threshold):
    current_price = fetch_crypto_price(crypto_id)
    if current_price >= threshold:
        print(f"Alert: {crypto_id} has reached ${threshold}!")

check_price_alert("bitcoin", 60000)
```

---

### Data Visualization & Trends

- Uses **Matplotlib and Seaborn** for **candlestick charts and historical trends**.
- Implements **moving average indicators** for trend detection.

```python
import matplotlib.pyplot as plt
import pandas as pd

def plot_price_trend(prices):
    df = pd.DataFrame(prices, columns=["Date", "Price"])
    df.plot(x="Date", y="Price", kind="line")
    plt.title("Crypto Price Trend")
    plt.show()

price_data = [("2024-01-01", 45000), ("2024-02-01", 48000), ("2024-03-01", 50000)]
plot_price_trend(price_data)
```

---

## Results & Performance

### 1. Portfolio Performance Tracking

![Portfolio Dashboard](../images/crypto-portfolio.png)

- Users can **track real-time gains/losses** across multiple cryptocurrencies.
- Historical analysis helps in **better portfolio adjustments**.

### 2. Real-Time Price Alerts

![Crypto Price Alerts](../images/crypto-alerts.png)

- Immediate notifications **help traders react to market volatility**.
- Prevents **missed trading opportunities** with threshold-based alerts.

---

## Challenges & Learnings

- **API Rate Limits:** Implemented **caching** to reduce redundant API requests.
- **High Volatility:** Introduced **exponential moving averages (EMA)** to smoothen trend detection.
- **User Engagement:** Added a **progressive web app (PWA) interface** for easier mobile access.

---

## Future Improvements

- **Machine Learning Prediction:** Implement **LSTM models** for price forecasting.
- **DeFi Integration:** Support **wallet connectivity for tracking on-chain assets**.
- **Automated Trading Bots:** Link to **Binance/FTX APIs** for auto-executing trades.

---

## Conclusion

The **Crypto Price Tracker & Portfolio Management** tool provides **real-time market insights, portfolio tracking, and automated alerts**. With advanced **data visualization and trend analysis**, this project is a valuable resource for cryptocurrency investors and traders.

