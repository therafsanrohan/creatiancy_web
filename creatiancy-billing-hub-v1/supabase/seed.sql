-- Fictional Seed Data for Creatiancy Billing Hub V1

-- 1. Insert Default Profiles (Fictional UUIDs for development / local testing)
INSERT INTO profiles (id, full_name, email, role_name) VALUES
('00000000-0000-0000-0000-000000000001', 'Rafsan Rohan (Super Admin)', 'admin@creatiancy.com', 'Super Admin'),
('00000000-0000-0000-0000-000000000002', 'Finance Executive (Finance Admin)', 'finance@creatiancy.com', 'Finance Admin'),
('00000000-0000-0000-0000-000000000003', 'Client Manager (Client Service)', 'cs@creatiancy.com', 'Client Service'),
('00000000-0000-0000-0000-000000000004', 'Project Coordinator (Project Manager)', 'pm@creatiancy.com', 'Project Manager')
ON CONFLICT (id) DO NOTHING;

-- 2. Insert Business Entities (Fictional registration numbers and contact details)
INSERT INTO business_entities (
    id, legal_name, entity_code, registered_address, registration_number, tax_id, email, phone, website, invoice_prefix, receipt_prefix, vat_footer, bkash_merchant, nagad_merchant
) VALUES
(
    '11111111-1111-1111-1111-111111111111',
    'Creatiancy Limited',
    'CLTD',
    'House 12, Road 4, Banani, Dhaka 1213, Bangladesh',
    'C-CLTD-DHAKA-2026',
    'TIN-BIN-CLTD-123456',
    'billing@creatiancy.com',
    '+880 1325 078 941',
    'www.creatiancy.com',
    'CLTD-BDT',
    'CLTD-REC',
    'All rates are inclusive of applicable VAT in accordance with the prevailing laws and regulations.',
    '01711223344',
    '01888776655'
),
(
    '22222222-2222-2222-2222-222222222222',
    'Creatiancy LLC',
    'CLLC',
    '1619 Broadway, Suite 500, New York, NY 10019, USA',
    'NY-CLLC-2026-98765',
    'EIN-12-3456789',
    'billing@creatiancy.com',
    '+1 212 555 0199',
    'www.creatiancy.com',
    'CLLC-USD',
    'CLLC-REC',
    'All rates are inclusive of applicable taxes in accordance with the prevailing laws and regulations.',
    NULL,
    NULL
)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Bank Accounts
INSERT INTO entity_bank_accounts (
    id, entity_id, bank_name, account_holder, account_number, branch, routing_number, swift_bic, bank_address, is_active
) VALUES
(
    '33333333-3333-3333-3333-333333333333',
    '11111111-1111-1111-1111-111111111111',
    'Fictional Trust Bank Bangladesh',
    'Creatiancy Limited',
    'BDT-ACC-1002003004005',
    'Banani Branch',
    '123456789',
    'TRSTBDDH',
    'Banani, Dhaka, Bangladesh',
    true
),
(
    '44444444-4444-4444-4444-444444444444',
    '22222222-2222-2222-2222-222222222222',
    'Fictional Apex Bank USA',
    'Creatiancy LLC',
    'USD-ACC-9876543210',
    'Wall Street Branch',
    '987654321',
    'APEXUS33XXX',
    'Wall Street, New York, NY, USA',
    true
)
ON CONFLICT (id) DO NOTHING;

-- 4. Insert Billing Clients
INSERT INTO billing_clients (
    id, client_type, company_name, contact_person, billing_email, phone, billing_address, city, country, tax_number, preferred_currency, default_payment_terms, account_manager_id
) VALUES
(
    '55555555-5555-5555-5555-555555555555',
    'company',
    'Fictional Dhaka Tech Ltd',
    'Rahim Ahmed',
    'billing@dhakatech.local',
    '+880 1711 223344',
    'Gulshan 2, Dhaka, Bangladesh',
    'Dhaka',
    'Bangladesh',
    'TIN-999888777',
    'BDT',
    '15 Days',
    '00000000-0000-0000-0000-000000000003'
),
(
    '66666666-6666-6666-6666-666666666666',
    'company',
    'Fictional Boston Studios Inc',
    'Sarah Connor',
    'accounting@bostonstudios.local',
    '+1 617 555 0122',
    '100 Main St, Boston, MA 02108, USA',
    'Boston',
    'USA',
    'EIN-00-1122334',
    'USD',
    '30 Days',
    '00000000-0000-0000-0000-000000000003'
)
ON CONFLICT (id) DO NOTHING;

-- 5. Insert Invoices (BDT Draft, USD Draft, Approved BDT, Approved USD)
INSERT INTO invoices (
    id, client_id, currency, entity_id, status, issue_date, payment_terms, due_date, project_name, service_period, po_number, reference_number, account_manager_id, discount_type, discount_value, vat_rate, vat_inclusive, created_by
) VALUES
-- BDT Draft Invoice
(
    '77777777-7777-7777-7777-777777777777',
    '55555555-5555-5555-5555-555555555555',
    'BDT',
    '11111111-1111-1111-1111-111111111111',
    'draft',
    '2026-07-01',
    '15 Days',
    '2026-07-16',
    'Website Redesign',
    'July 2026',
    'PO-BDT-001',
    'REF-DHAKA-101',
    '00000000-0000-0000-0000-000000000003',
    'none',
    0.00,
    15.00,
    true,
    '00000000-0000-0000-0000-000000000003'
),
-- USD Draft Invoice
(
    '88888888-8888-8888-8888-888888888888',
    '66666666-6666-6666-6666-666666666666',
    'USD',
    '22222222-2222-2222-2222-222222222222',
    'draft',
    '2026-07-05',
    '30 Days',
    '2026-08-04',
    'Brand Identity Design',
    'Q3 2026',
    'PO-USD-002',
    'REF-BOSTON-202',
    '00000000-0000-0000-0000-000000000003',
    'percentage',
    10.00,
    0.00,
    true,
    '00000000-0000-0000-0000-000000000003'
),
-- Approved BDT Invoice (will simulate snapshot after items)
(
    '99999999-9999-9999-9999-999999999999',
    '55555555-5555-5555-5555-555555555555',
    'BDT',
    '11111111-1111-1111-1111-111111111111',
    'approved',
    '2026-07-10',
    '15 Days',
    '2026-07-25',
    'Mobile App Strategy',
    'July 2026',
    'PO-BDT-003',
    'REF-DHAKA-103',
    '00000000-0000-0000-0000-000000000003',
    'fixed',
    5000.00,
    15.00,
    true,
    '00000000-0000-0000-0000-000000000003'
)
ON CONFLICT (id) DO NOTHING;

-- Set sequential number for approved invoice directly in seed (for testing)
UPDATE invoices SET invoice_number = 'CLTD-BDT-2026-0001', approved_by = '00000000-0000-0000-0000-000000000001', approved_at = now() WHERE id = '99999999-9999-9999-9999-999999999999';

-- 6. Insert Line Items
INSERT INTO invoice_items (id, invoice_id, service_name, description, quantity, unit, rate, amount, sort_order) VALUES
-- Draft BDT Items
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', 'UX design workshop', 'Creative design thinking session', 2.00, 'Day', 25000.00, 50000.00, 0),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '77777777-7777-7777-7777-777777777777', 'Prototype development', 'Figma dynamic wireframes', 1.00, 'Project', 120000.00, 120000.00, 1),
-- Draft USD Items
('cccccccc-cccc-cccc-cccc-cccccccccccc', '88888888-8888-8888-8888-888888888888', 'Logo concepts', '3 custom brand guidelines', 1.00, 'Project', 1500.00, 1500.00, 0),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '88888888-8888-8888-8888-888888888888', 'Stationery kit', 'Business cards & letterheads', 1.00, 'Item', 500.00, 500.00, 1),
-- Approved BDT Items
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', '99999999-9999-9999-9999-999999999999', 'Strategic planning consultation', 'Review of roadmap and milestones', 1.00, 'Milestone', 75000.00, 75000.00, 0),
('ffffffff-ffff-ffff-ffff-ffffffffffff', '99999999-9999-9999-9999-999999999999', 'Market analysis research', 'Competitor benchmarking study', 1.00, 'Project', 50000.00, 50000.00, 1)
ON CONFLICT (id) DO NOTHING;

-- 7. Add Snapshots for Approved Invoice (Matches items: 125,000 subtotal - 5,000 discount = 120,000 total)
INSERT INTO invoice_snapshots (
    invoice_id, entity_snapshot, bank_snapshot, client_snapshot, totals_snapshot
) VALUES (
    '99999999-9999-9999-9999-999999999999',
    json_build_object(
        'legal_name', 'Creatiancy Limited',
        'registered_address', 'House 12, Road 4, Banani, Dhaka 1213, Bangladesh',
        'registration_number', 'C-CLTD-DHAKA-2026',
        'tax_id', 'TIN-BIN-CLTD-123456',
        'email', 'billing@creatiancy.com',
        'phone', '+880 1325 078 941',
        'website', 'www.creatiancy.com'
    )::JSONB,
    json_build_object(
        'bank_name', 'Fictional Trust Bank Bangladesh',
        'account_holder', 'Creatiancy Limited',
        'account_number', 'BDT-ACC-1002003004005',
        'branch', 'Banani Branch',
        'routing_number', '123456789',
        'swift_bic', '',
        'bank_address', 'Banani, Dhaka, Bangladesh'
    )::JSONB,
    json_build_object(
        'company_name', 'Fictional Dhaka Tech Ltd',
        'contact_person', 'Rahim Ahmed',
        'billing_email', 'billing@dhakatech.local',
        'billing_address', 'Gulshan 2, Dhaka, Bangladesh',
        'phone', '+880 1711 223344',
        'tax_number', 'TIN-999888777'
    )::JSONB,
    json_build_object(
        'subtotal', 125000.00,
        'discount_amount', 5000.00,
        'total_payable', 120000.00,
        'amount_paid', 0.00,
        'amount_due', 120000.00
    )::JSONB
)
ON CONFLICT (invoice_id) DO NOTHING;

-- 8. Seed sequence count
INSERT INTO invoice_sequences (entity_code, year, last_sequence) VALUES
('CLTD', 2026, 1),
('CLLC', 2026, 0)
ON CONFLICT (entity_code, year) DO NOTHING;

-- 9. Seed default global settings
INSERT INTO billing_settings (key, value) VALUES
('vat_config', json_build_object('default_rate', 15.00, 'inclusive', true, 'footer', 'All rates are inclusive of applicable VAT in accordance with the prevailing laws and regulations.')::JSONB)
ON CONFLICT (key) DO NOTHING;
