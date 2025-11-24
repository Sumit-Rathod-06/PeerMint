-- CREATE TABLE loan_application (
--     application_id SERIAL PRIMARY KEY,
--     borrower_id INT,
--     full_name VARCHAR(150),
--     email VARCHAR(255),
--     mobile_no VARCHAR(20),
--     dob DATE,
--     gender VARCHAR(10),
--     pan_no VARCHAR(10),
--     aadhaar_no VARCHAR(14),
--     address TEXT,
--     pincode VARCHAR(6),
--     city VARCHAR(100),
--     state VARCHAR(100),
--     residential_status VARCHAR(20),
--     years_at_current_address INT,
--     employment_type VARCHAR(50),
--     bank_name VARCHAR(100),
--     bank_account_no VARCHAR(20),
--     ifsc_code VARCHAR(11),
--     loan_amount DECIMAL(15,2),
--     purpose_of_loan TEXT,
--     loan_tenure INT,
--     itr_url TEXT,
--     bank_statement_url TEXT,
--     status VARCHAR(20) DEFAULT 'pending',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (borrower_id) REFERENCES borrower(borrower_id) ON DELETE CASCADE
-- );

-- CREATE TABLE funded_loans (
--     funded_loan_id SERIAL PRIMARY KEY,
--     borrower_id INTEGER,
--     lender_id INTEGER,
--     funded_amount NUMERIC(15,2),
--     interest_rate NUMERIC(5,2),
--     loan_tenure INTEGER,
--     start_date DATE DEFAULT CURRENT_DATE,
--     end_date DATE,
--     repayment_status VARCHAR(20) DEFAULT 'Active',
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (borrower_id) REFERENCES borrower(borrower_id) ON DELETE CASCADE,
--     FOREIGN KEY (lender_id) REFERENCES lender(lender_id) ON DELETE CASCADE
-- );

-- ============================================
-- ENUM TYPES (must exist before using them)
-- ============================================

CREATE TYPE admin_permission_enum AS ENUM ('superadmin', 'manager', 'support');
CREATE TYPE kyc_status_enum AS ENUM ('pending', 'verified', 'rejected');

-- ============================================
-- 1️⃣ ADMIN TABLE
-- ============================================
CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(150) NOT NULL,
    permission_level admin_permission_enum DEFAULT 'support' NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2️⃣ BORROWER TABLE
-- ============================================
CREATE TABLE borrower (
    borrower_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    kyc_status kyc_status_enum DEFAULT 'pending',
    monthly_income NUMERIC(12,2),
    employment_status VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    phone_number VARCHAR(25),
    profile_photo_url TEXT,
    blocked BOOLEAN DEFAULT FALSE
);

-- ============================================
-- 3️⃣ LENDER TABLE
-- ============================================
CREATE TABLE lender (
    lender_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    kyc_status kyc_status_enum DEFAULT 'pending',
    available_balance NUMERIC(14,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    blocked BOOLEAN DEFAULT FALSE,
    phone_number VARCHAR(15),
    total_invested NUMERIC(14,2)
);

-- ============================================
-- 4️⃣ KYC TABLE
-- ============================================
CREATE TABLE kyc (
    kyc_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    dob DATE,
    gender VARCHAR(10),
    pan_no VARCHAR(15) UNIQUE,
    aadhaar_no VARCHAR(20) UNIQUE,
    father_name VARCHAR(100),
    marital_status VARCHAR(20),
    address TEXT,
    pincode VARCHAR(10),
    city VARCHAR(50),
    state VARCHAR(50),
    residential_status VARCHAR(20),
    photo_url TEXT,
    aadhaar_url TEXT,
    pan_url TEXT,
    kyc_status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 5️⃣ LOAN APPLICATION TABLE
-- ============================================
CREATE TABLE loan_application (
    application_id SERIAL PRIMARY KEY,
    borrower_id INT REFERENCES borrower(borrower_id) ON DELETE CASCADE,
    full_name VARCHAR(150),
    email VARCHAR(255),
    mobile_no VARCHAR(20),
    dob DATE,
    gender VARCHAR(10),
    pan_no VARCHAR(10),
    aadhaar_no VARCHAR(14),
    address_line1 TEXT,
    address_line2 TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(6),
    residential_status VARCHAR(50),
    years_at_current_address INT,
    employment_type VARCHAR(50),
    annual_income NUMERIC(15,2),
    business_name VARCHAR(150),
    bank_name VARCHAR(100),
    bank_account_no VARCHAR(20),
    ifsc_code VARCHAR(15),
    loan_amount NUMERIC(15,2),
    purpose_of_loan TEXT,
    loan_tenure INT,
    interest_rate NUMERIC(5,2),
    estimated_emi NUMERIC(15,2),
    total_amount NUMERIC(15,2),
    itr_url TEXT,
    bank_statement_url TEXT,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    risk_level TEXT
);

-- ============================================
-- 6️⃣ FUNDED LOANS TABLE
-- ============================================
CREATE TABLE funded_loans (
    funded_loan_id SERIAL PRIMARY KEY,
    borrower_id INT REFERENCES borrower(borrower_id) ON DELETE CASCADE,
    lender_id INT REFERENCES lender(lender_id) ON DELETE CASCADE,
    funded_amount NUMERIC(15,2),
    interest_rate NUMERIC(5,2),
    loan_tenure INT,
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    repayment_status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- 7️⃣ REPAYMENT SCHEDULE TABLE
-- ============================================
CREATE TABLE repayment_schedule (
    schedule_id SERIAL PRIMARY KEY,
    funded_loan_id INT REFERENCES funded_loans(funded_loan_id),
    borrower_id INT REFERENCES borrower(borrower_id),
    lender_id INT REFERENCES lender(lender_id),
    installment_number INT NOT NULL,
    due_date DATE NOT NULL,
    principal_component NUMERIC(14,2),
    interest_component NUMERIC(14,2),
    total_payment NUMERIC(14,2),
    payment_status VARCHAR(20) DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Overdue')),
    paid_on DATE,
    penalty_amount NUMERIC(14,2) DEFAULT 0,
    last_penalty_applied DATE
);
-- ============================================
-- 8️⃣ TRANSACTION HISTORY TABLE
-- ============================================
CREATE TABLE transaction_history (
    transaction_id SERIAL PRIMARY KEY,
    lender_id INT REFERENCES lender(lender_id),
    funded_loan_id INT REFERENCES funded_loans(funded_loan_id),
    transaction_type VARCHAR(50) CHECK (transaction_type IN ('Investment', 'Interest Received', 'Withdrawal', 'Top-Up')),
    amount NUMERIC(14,2) NOT NULL,
    transaction_date TIMESTAMPTZ DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'Success' CHECK (status IN ('Success', 'Pending', 'Failed')),
    remarks TEXT
);

-- ============================================
-- 9️⃣ PORTFOLIO METRICS TABLE
-- ============================================
CREATE TABLE portfolio_metrics (
    id SERIAL PRIMARY KEY,
    lender_id INT UNIQUE REFERENCES lender(lender_id),
    date DATE DEFAULT CURRENT_DATE,
    total_invested NUMERIC(14,2),
    total_interest_earned NUMERIC(14,2),
    active_loans INT,
    default_risk_percent NUMERIC(5,2),
    portfolio_health VARCHAR(50)
);

-- ============================================
-- 🔟 Lender Offers TABLE
-- ============================================
CREATE TABLE lender_offers (
    offer_id SERIAL PRIMARY KEY,
    application_id INT REFERENCES loan_application(application_id) ON DELETE CASCADE,
    lender_id INT REFERENCES lender(lender_id) ON DELETE CASCADE,
    offered_amount NUMERIC(15,2),
    interest_rate NUMERIC(5,2),
    loan_tenure INT,
    total_payable NUMERIC(15,2),
    estimated_emi NUMERIC(15,2),
    offer_status VARCHAR(20) DEFAULT 'pending' CHECK (offer_status IN ('pending', 'accepted', 'rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
