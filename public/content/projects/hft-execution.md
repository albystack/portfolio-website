
## Overview
High-Frequency Trading (HFT) relies on low-latency execution and optimal order placement strategies. This project simulates an HFT environment where an agent optimizes its market-making strategies using **reinforcement learning (RL)** to minimize adverse selection and maximize profitability.

## Technical Implementation

### Order Book Simulation
The simulator includes a **realistic limit order book (LOB)** that models market interactions:

- **Order matching engine** processes market and limit orders.
- **Market impact simulation** adjusts prices based on liquidity.
- **Live backtesting** on historical data to test strategy robustness.

```python
import heapq

class OrderBook:
    def __init__(self):
        self.bids = []  # Max heap for bids
        self.asks = []  # Min heap for asks

    def place_order(self, price, quantity, side):
        if side == "buy":
            heapq.heappush(self.bids, (-price, quantity))
        else:
            heapq.heappush(self.asks, (price, quantity))

    def match_orders(self):
        while self.bids and self.asks and -self.bids[0][0] >= self.asks[0][0]:
            bid_price, bid_qty = heapq.heappop(self.bids)
            ask_price, ask_qty = heapq.heappop(self.asks)
            trade_qty = min(bid_qty, ask_qty)
            print(f"Trade executed at {ask_price} for {trade_qty} shares")
```

---

### Reinforcement Learning-Based Market Making
To optimize execution, the agent:

- **Uses Deep Q-Learning (DQN)** to predict optimal bid-ask spreads.
- **Rewards** are based on execution success and inventory risk reduction.
- **Training dataset** consists of tick-level market data.

```python
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential([
    Dense(64, activation='relu', input_shape=(state_size,)),
    Dense(64, activation='relu'),
    Dense(action_size, activation='linear')
])

model.compile(optimizer='adam', loss='mse')
```

---

### Data Processing & Backtesting
- **High-resolution tick-by-tick data** is processed using Pandas & NumPy.
- **Backtests include transaction costs and slippage effects**.
- **Metrics:** Sharpe ratio, drawdown, PnL growth.

```python
import pandas as pd

def load_data(file_path):
    df = pd.read_csv(file_path, parse_dates=['timestamp'])
    df = df.sort_values('timestamp')
    return df
```

---

## Results & Performance
### PnL Growth Comparison
![PnL Graph](../images/hft-execution-pnl.png)
- RL-based strategy consistently **outperforms static spread strategies**.

### Inventory Risk Management
![Inventory Control](../images/hft-execution-inventory.png)
- RL-based approach balances inventory **while maintaining tight spreads**.

---

## Challenges & Learnings
✅ Handling noisy market data through **feature engineering**.
✅ Optimizing latency using **asynchronous execution**.
✅ Avoiding excessive risk via **adaptive reward functions**.

---

## Future Improvements
- **Live API Trading:** Deploying in a **real exchange simulation**.
- **Latency optimization:** Transition to **low-latency C++ implementations**.
- **Multi-agent RL:** Simulating **competitive trading scenarios**.

---

## Conclusion
This project showcases an advanced **market making and execution strategy**, integrating **reinforcement learning, order book simulation, and high-performance trading mechanics**. The results demonstrate that **adaptive strategies outperform traditional execution methods** in HFT environments.

---

