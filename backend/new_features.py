import numpy_financial as npf

def is_false_positive(term,remaining_terms,rate,current_rate):
    return (term>1.5*remaining_terms) or (rate>current_rate and term>remaining_terms)

def get_lifetime_interest_savings(current_monthly_payment,remaining_terms,current_loan_balance,new_monthly_payment, new_term, new_loan_balance):
    return (current_monthly_payment*remaining_terms-current_loan_balance)-(new_monthly_payment*new_term-new_loan_balance)

def get_total_interest_paid(monthly_payment,term,loan_balance):
    return monthly_payment*term-loan_balance

def calculate_apr(MSPdata,viable_refinance_options, annual_interest_rate, loan_amount,term, monthly_payment):
    mortgage_insurance_fee=calculate_mortgage_insurance_fee()
    lender_origination_fee=viable_refinance_options.loan_administration_fee
    closing_cost_fee=viable_refinance_options.credit_report_fee + viable_refinance_options.flood_cert
    annual_interest=annual_interest_rate*loan_amount
    daily_interest=annual_interest/365
    pre_paid_interest= daily_interest*30
    financial_charges= mortgage_insurance_fee + lender_origination_fee + closing_cost_fee + pre_paid_interest
    amount_financed=loan_amount - financial_charges
    apr=npf.rate(term*12, -monthly_payment, amount_financed)*12
    return apr

def calculate_mortgage_insurance_fee():
    pass
# initial_loan_balance=396204.89

# cashflows=[initial_loan_balance]+[-2564.87]*(11*12)+[-2398.20]*((30-11)*12)
# irr=npf.irr(cashflows)
# print(f"APR = {round(((1+irr)**12-1)*100, 3)}%")
# print(f"IRR = {round(irr*100, 4)}%")
# print(npf.rate(30*12, -2564.87, initial_loan_balance,0)*12*100)

import math

def calculate_arm_apr_optimized(loan_amount, finance_charges, term_months, intro_rate, 
                                intro_period, fully_indexed_rate, periodic_cap, 
                                adj_period, mi_monthly, mi_cutoff_balance):
    """
    O(1) Space and O(1) Time Complexity ARM APR Calculator
    """
    r_initial = intro_rate / 12
    pmt_initial = loan_amount * (r_initial * (1 + r_initial)**term_months) / ((1 + r_initial)**term_months - 1)
    
    # Algebraically solve for 'n' in the mortgage amortization formula
    numerator = pmt_initial - r_initial * mi_cutoff_balance
    denominator = pmt_initial - r_initial * loan_amount
    mi_cutoff_month = math.ceil(math.log(numerator / denominator) / math.log(1 + r_initial))
    
    # A standard ARM hits its lifetime cap in just 2 or 3 adjustments. 
    # We only need to store these 2-4 blocks instead of 360 individual months.
    blocks = []
    current_rate = intro_rate
    balance = loan_amount
    months_remaining = term_months
    
    # Block A: Intro Period (e.g., Months 1-60)
    blocks.append({'pmt': pmt_initial, 'months': intro_period})
    
    # Calculate balance at end of intro period
    balance = balance * (1 + r_initial)**intro_period - pmt_initial * ((1 + r_initial)**intro_period - 1) / r_initial
    months_remaining -= intro_period
    
    # Blocks B+: Rate Adjustments (Calculates adjustments until it caps out)
    while months_remaining > 0:
        current_rate = min(current_rate + periodic_cap, fully_indexed_rate)
        r_current = current_rate / 12
        current_pmt = balance * (r_current * (1 + r_current)**months_remaining) / ((1 + r_current)**months_remaining - 1)
        
        if current_rate == fully_indexed_rate:
            # The rate has hit the max cap. This is the final payment amount for the rest of the loan.
            blocks.append({'pmt': current_pmt, 'months': months_remaining})
            break
        else:
            # Rate will adjust again, so this block only lasts for the 'adj_period' (e.g., 6 months)
            duration = min(adj_period, months_remaining)
            blocks.append({'pmt': current_pmt, 'months': duration})
            balance = balance * (1 + r_current)**duration - current_pmt * ((1 + r_current)**duration - 1) / r_current
            months_remaining -= duration

    # 3. O(1) SPACE: On-the-fly NPV Calculation
    amount_financed = loan_amount - finance_charges

    def npv(r_discount):
        """Calculates Present Value of all blocks algebraically"""
        total_pv = 0
        months_passed = 0
        
        # PV of Principal & Interest payment blocks
        for b in blocks:
            # Standard Annuity Formula to find PV of the block
            pv_block = b['pmt'] * (1 - (1 + r_discount)**-b['months']) / r_discount
            # Discount that block back to Month 0
            total_pv += pv_block * ((1 + r_discount)**-months_passed)
            months_passed += b['months']
            
        # PV of Mortgage Insurance (MI) payments
        pv_mi = mi_monthly * (1 - (1 + r_discount)**-mi_cutoff_month) / r_discount
        
        return (total_pv + pv_mi) - amount_financed

    # We find the discount rate where NPV == 0 in ~40 iterations maximum.
    low_rate, high_rate = 0.0001, 0.10
    
    for _ in range(100):
        mid_rate = (low_rate + high_rate) / 2
        current_npv = npv(mid_rate)
        
        if abs(current_npv) < 1e-7: # Zero tolerance reached
            break
            
        if current_npv > 0:
            low_rate = mid_rate # Discount rate is too low, raise the floor
        else:
            high_rate = mid_rate # Discount rate is too high, lower the ceiling
            
    # Calculate output APRs
    irr = mid_rate
    nominal_apr = irr * 12
    effective_apr = (1 + irr)**12 - 1
    
    return {
        "Monthly IRR": irr,
        "Nominal APR": nominal_apr,
        "Effective APR": effective_apr,
        "MI Cutoff Month": mi_cutoff_month
    }
results = calculate_arm_apr_optimized(
    loan_amount = 400000, finance_charges = 26988.77, term_months = 360, 
    intro_rate = 0.04, intro_period = 60, fully_indexed_rate = 0.0775, 
    periodic_cap = 0.02, adj_period = 6, mi_monthly = 100, mi_cutoff_balance = 358620.69
)

print(f"Monthly IRR: {results['Monthly IRR']*100:.3f}%")
print(f"Effective APR (Matches Sheet): {results['Effective APR'] * 100:.3f}%")
print(f"MI Drops at Month: {results['MI Cutoff Month']}")

from scipy.optimize import newton

def calculate_two_tier_irr(initial_loan_balance, pmt1, n1, pmt2, n2, guess=0.005):
    """
    Calculates the IRR and APR for a loan with two different payment periods.
    
    Args:
        initial_loan_balance (float): The principal loan amount.
        pmt1 (float): The monthly payment amount for the first period.
        n1 (int): The number of months the first payment is made.
        pmt2 (float): The monthly payment amount for the second period.
        n2 (int): The number of months the second payment is made.
        guess (float): Initial guess for the solver (default is 0.5%).
        
    Returns:
        dict: A dictionary containing the calculated APR and IRR.
    """
    
    def npv(r):
        # If the solver accidentally guesses 0, avoid division by zero
        if r == 0:
            return (pmt1 * n1) + (pmt2 * n2) - initial_loan_balance
            
        # 1. Present value of the first block of payments
        pv1 = pmt1 * (1 - (1 + r)**(-n1)) / r
        
        # 2. Present value of the second block of payments
        #    Evaluated at the end of period 1, so discounted back by n1 months
        pv2 = (pmt2 * (1 - (1 + r)**(-n2)) / r) * (1 + r)**(-n1)
        
        # The sum of present values minus the loan balance should equal 0 at the IRR
        return pv1 + pv2 - initial_loan_balance

    # Solve for the root (IRR)
    irr = newton(npv, guess)
    
    # Calculate returns
    apr = ((1 + irr)**12 - 1) * 100
    monthly_irr = irr * 100
    
    return {
        "APR": round(apr, 3),
        "IRR": round(monthly_irr, 4)
    }

# ==========================================
# Example Usage
# ==========================================
balance = 300000
payment_1 = 2564.87
months_1 = 132
payment_2 = 2398.20
months_2 = 228

results = calculate_two_tier_irr(
    initial_loan_balance=balance, 
    pmt1=payment_1, 
    n1=months_1, 
    pmt2=payment_2, 
    n2=months_2
)

print(f"APR = {results['APR']}%")
print(f"IRR = {results['IRR']}%")