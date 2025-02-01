## Overview

Statistical arbitrage is a widely used quantitative trading strategy that leverages price inefficiencies between assets. This project implements a **Bayesian statistical arbitrage model** using **Hidden Markov Models (HMM)** and **cointegration tests** to identify asset pairs with high probability of mean reversion.

## Technical Implementation

### Cointegration Testing

- Identifies **pairs of assets** that historically move together.
- Uses the **Augmented Dickey-Fuller (ADF) test** and **Johansen’s test** to check for stationarity.
- Constructs **spread time series** to monitor deviations from equilibrium.

```python
from statsmodels.tsa.stattools import adfuller
import numpy as np

def test_cointegration(asset_1, asset_2):
    spread = asset_1 - asset_2
    result = adfuller(spread)
    return result[1]  # P-value (should be < 0.05 for cointegration)
```

---

### Hidden Markov Model (HMM) for Regime Detection

- Classifies market states into **bullish, neutral, or bearish regimes**.
- Uses **Gaussian HMM** to determine probability distributions over different market regimes.
- Helps in adjusting position sizing dynamically.

```python
from hmmlearn.hmm import GaussianHMM

def train_hmm(data, n_components=3):
    model = GaussianHMM(n_components=n_components, covariance_type="diag", n_iter=1000)
    model.fit(data)
    return model.predict(data)
```

---

### Pairs Trading Strategy Execution

- Longs the underpriced asset and shorts the overpriced asset when the spread deviates beyond **1.5 standard deviations**.
- Closes positions when the spread reverts to the mean.

```python
import numpy as np

def pairs_trade(signal, spread, threshold=1.5):
    z_score = (spread - np.mean(spread)) / np.std(spread)
    if z_score > threshold:
        return "Short asset_1, Long asset_2"
    elif z_score < -threshold:
        return "Long asset_1, Short asset_2"
    else:
        return "No Trade"
```

---

## Data Processing & Backtesting

- Uses **minute-level stock data** from **Yahoo Finance**.
- Applies **rolling window statistical tests** to dynamically adjust model parameters.
- Backtested over **multiple asset pairs** (e.g., AAPL-MSFT, XOM-CVX).

```python
import yfinance as yf

def fetch_data(ticker, start_date, end_date):
    return yf.download(ticker, start=start_date, end=end_date)['Adj Close']
```

---

## Results & Performance

### PnL Growth Comparison



- Bayesian model-based trading shows **higher Sharpe ratio** than simple moving average approaches.

### Market Regime Detection



- **Regime classification helps avoid false signals** and optimizes trade entry timing.

---

## Challenges & Learnings

- ✅ **Stationarity issues:** Implemented **adaptive rolling window tests** to dynamically filter unstable pairs.
- ✅ **Execution latency:** Improved **order execution efficiency** with **asynchronous API calls**.
- ✅ **Risk management:** Integrated **stop-loss mechanisms** based on extreme tail risks.

---

## Future Improvements

- **Deep Learning Models:** Integrate **LSTMs** for enhanced regime prediction.
- **Live Trading Deployment:** Connect to **Interactive Brokers API** for real execution.
- **Portfolio Optimization:** Expand to a **multi-asset mean-reverting portfolio strategy**.

---

## Conclusion

This project demonstrates a robust **statistical arbitrage trading framework** using **cointegration and Bayesian modeling**. The results highlight significant **profitability improvements over naive pairs trading strategies**.

