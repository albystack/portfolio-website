## Overview

Derivative pricing is a fundamental area of quantitative finance, used to value financial contracts such as options and futures. This project implements **stochastic volatility models** (Heston, SABR) and **Monte Carlo methods** to accurately price options and estimate risk measures like the **Greeks**.

## Technical Implementation

### Black-Scholes Model

- The **Black-Scholes model** is a classic method for pricing European options.
- Assumes **constant volatility** and risk-neutral pricing.
- Computes the **closed-form solution** for call and put options.

```python
import numpy as np
from scipy.stats import norm

def black_scholes(S, K, T, r, sigma, option_type="call"):
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    
    if option_type == "call":
        price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    else:
        price = K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
    
    return price
```

---

### Monte Carlo Simulation for Option Pricing

- Monte Carlo methods simulate **random paths of asset prices** under stochastic models.
- Computes option prices by averaging discounted payoffs across simulations.

```python
def monte_carlo_option_pricing(S, K, T, r, sigma, num_simulations=10000, option_type="call"):
    np.random.seed(42)
    dt = T / 365
    
    payoff_sum = 0
    for _ in range(num_simulations):
        Z = np.random.standard_normal()
        S_T = S * np.exp((r - 0.5 * sigma**2) * T + sigma * np.sqrt(T) * Z)
        
        if option_type == "call":
            payoff = max(S_T - K, 0)
        else:
            payoff = max(K - S_T, 0)
        
        payoff_sum += payoff
    
    return np.exp(-r * T) * (payoff_sum / num_simulations)
```

---

### Heston Stochastic Volatility Model

- The **Heston model** captures stochastic volatility dynamics in asset prices.
- Used in pricing exotic options and volatility derivatives.

```python
import numpy as np

def heston_model(S0, K, T, r, v0, kappa, theta, sigma, rho, num_simulations=10000):
    dt = T / 365
    V = np.full(num_simulations, v0)
    S = np.full(num_simulations, S0)
    
    for t in range(1, int(T * 365)):
        Z1, Z2 = np.random.standard_normal(num_simulations), np.random.standard_normal(num_simulations)
        Z2 = rho * Z1 + np.sqrt(1 - rho**2) * Z2  # Correlated Brownian motion
        V = np.maximum(V + kappa * (theta - V) * dt + sigma * np.sqrt(V) * np.sqrt(dt) * Z1, 0)
        S *= np.exp((r - 0.5 * V) * dt + np.sqrt(V * dt) * Z2)
    
    option_payoffs = np.maximum(S - K, 0)
    return np.exp(-r * T) * np.mean(option_payoffs)
```

---

### Calculation of the Greeks

- The **Greeks** measure the sensitivity of an option's price to various factors.
- **Delta, Gamma, Vega, Theta, and Rho** are estimated using finite difference methods.

```python
def delta(S, K, T, r, sigma, option_type="call", epsilon=1e-5):
    return (black_scholes(S + epsilon, K, T, r, sigma, option_type) - black_scholes(S, K, T, r, sigma, option_type)) / epsilon
```

---

## Results & Performance

### 1. Option Pricing Accuracy

![Option Pricing](../images/derivatives-pricing-accuracy.png)

- **Monte Carlo estimates converge** to theoretical Black-Scholes values with increased simulations.
- Heston model captures **volatility smiles** better than Black-Scholes.

### 2. Greeks Sensitivity Analysis

![Greeks Analysis](../images/derivatives-greeks.png)

- Delta and Gamma behave as expected with respect to spot price changes.
- Vega shows **higher sensitivity for near-the-money options**.

---

## Challenges & Learnings

- **Computational efficiency:** Monte Carlo methods require **high sample counts** for accuracy.
- **Volatility calibration:** Heston model parameters need **optimization against real market data**.
- **Risk-neutral measure:** Transitioning from historical to risk-neutral dynamics is non-trivial.

---

## Future Improvements

- **GPU Acceleration:** Speed up Monte Carlo simulations using CUDA.
- **Implied Volatility Surface Modeling:** Extend to **SABR model** for better smile/skew fitting.
- **Real-Time Pricing:** Deploy a **live derivatives pricing engine** via API integration.

---

## Conclusion

This project demonstrates **multiple approaches to derivatives pricing**, including **closed-form solutions, stochastic volatility models, and Monte Carlo simulations**. The implementation of **Greek sensitivity analysis** provides valuable insights into risk management and hedging strategies in quantitative finance.