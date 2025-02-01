## Overview

The **Stock Market Analysis & Sentiment Tracker** is a Python-based tool that scrapes financial news, applies **Natural Language Processing (NLP)** for sentiment analysis, and correlates the extracted sentiment scores with stock price movements to identify **potential trading signals**.

## Technical Implementation

### Data Collection & Web Scraping

- **Scrapes financial news** from sources such as Yahoo Finance, Reuters, and Bloomberg.
- Extracts headlines, summaries, and timestamps for correlation with market data.

```python
import requests
from bs4 import BeautifulSoup

def scrape_news(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    headlines = [h.text for h in soup.find_all("h2")]
    return headlines

news_data = scrape_news("https://finance.yahoo.com/news")
print(news_data)
```

---

### Sentiment Analysis with NLP

- Uses **VADER (Valence Aware Dictionary and sEntiment Reasoner)** to score sentiment polarity of financial headlines.
- Generates **compound sentiment scores** between -1 (negative) and +1 (positive).

```python
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    return analyzer.polarity_scores(text)["compound"]

sample_news = "Stock markets rally as inflation fears ease."
print(analyze_sentiment(sample_news))
```

---

### Stock Price Correlation

- Retrieves **historical stock price data** using `yfinance`.
- Computes **Pearson correlation** between sentiment scores and stock price changes.

```python
import yfinance as yf
import pandas as pd

def get_stock_data(ticker, start_date, end_date):
    stock = yf.download(ticker, start=start_date, end=end_date)
    return stock["Close"]

apple_prices = get_stock_data("AAPL", "2024-01-01", "2024-06-01")
print(apple_prices.head())
```

---

### Trading Signal Generation

- Uses **moving averages and sentiment trends** to create simple trading signals.
- Generates **Buy signals** when sentiment and momentum align positively.

```python
def generate_trading_signal(sentiment_series, price_series):
    signal = []
    for i in range(len(sentiment_series)):
        if sentiment_series[i] > 0.2 and price_series[i] > price_series[i-1]:
            signal.append("BUY")
        elif sentiment_series[i] < -0.2 and price_series[i] < price_series[i-1]:
            signal.append("SELL")
        else:
            signal.append("HOLD")
    return signal
```

---

## Results & Performance

### 1. Sentiment vs. Stock Price Trends

![Sentiment vs. Price](../images/stock-sentiment-trend.png)

- **Stock prices often react to significant sentiment shifts** in financial news.
- Sentiment-based trading signals **outperformed random market timing strategies**.

### 2. Trading Strategy Performance

![Trading Strategy](../images/stock-trading-performance.png)

- Backtests showed **higher Sharpe ratios** for sentiment-enhanced trading signals.
- **Correlation analysis** indicated a moderate predictive power in certain sectors (e.g., tech stocks).

---

## Challenges & Learnings

- **Noisy Data:** Filtered irrelevant news headlines using **TF-IDF vectorization**.
- **Market Reaction Delay:** Adjusted sentiment-based trades with **lag analysis**.
- **Sentiment Bias:** Improved polarity classification by incorporating **context-aware transformers (BERT)**.

---

## Future Improvements

- **Deep Learning Integration:** Train **LSTM models** on financial sentiment data.
- **Alternative Data Sources:** Expand sentiment analysis to include **Reddit, Twitter, and SEC filings**.
- **Live Trading Bot:** Deploy real-time sentiment-based trading signals via **Alpaca API**.

---

## Conclusion

The **Stock Market Analysis & Sentiment Tracker** provides insights into how financial news sentiment influences stock movements. By combining **web scraping, NLP sentiment analysis, and stock price correlations**, this tool can be used to enhance **quantitative trading strategies**.