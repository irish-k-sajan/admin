import numpy.financial as npf

def is_false_positive(term,remaining_terms,rate,current_rate):
    return (term>1.5*remaining_terms) or (rate>current_rate and term>1.5*remaining_terms)

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