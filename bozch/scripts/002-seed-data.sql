-- Seed data for BOZCH Africa CMS

-- Insert default admin user (password: admin123 - should be changed immediately)
INSERT IGNORE INTO admin_users (email, password_hash, name, role) VALUES
('admin@bozch.org', '$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lZTLWF5.Sy', 'Admin User', 'super_admin');

-- Insert site settings
INSERT IGNORE INTO site_settings (setting_key, setting_value, setting_type) VALUES
('site_name', 'BOZCH Africa Limited', 'text'),
('site_tagline', 'Empowering Rural Communities', 'text'),
('contact_email', 'info@bozch.org', 'text'),
('contact_phone', '+265 999 123 456', 'text'),
('contact_address', 'Lilongwe, Malawi', 'text'),
('facebook_url', 'https://facebook.com/bozch', 'text'),
('twitter_url', 'https://twitter.com/bozch', 'text'),
('instagram_url', 'https://instagram.com/bozch', 'text'),
('linkedin_url', 'https://linkedin.com/company/bozch', 'text'),
('mission_statement', 'To empower rural communities in Malawi through sustainable development initiatives that foster self-reliance, improve quality of life, and preserve environmental resources for future generations.', 'textarea'),
('vision_statement', 'A Malawi where every rural community thrives with access to clean water, quality education, sustainable livelihoods, and environmental stewardship.', 'textarea');

-- Insert hero slides
INSERT IGNORE INTO hero_slides (title, subtitle, image_url, cta_text, cta_link, display_order) VALUES
('Empowering Communities', 'Building sustainable futures through clean water and education', '/african-children-clean-water-well-smiling.jpg', 'Learn More', '/about', 1),
('Education for All', 'Transforming lives through quality education and literacy programs', '/african-students-classroom-education-learning.jpg', 'Our Programs', '/programs', 2),
('Sustainable Agriculture', 'Growing hope through sustainable farming practices', '/african-farmers-sustainable-agriculture-crops.jpg', 'Get Involved', '/get-involved', 3),
('Community Development', 'Working together for lasting change', '/african-community-education-sustainable-farming.jpg', 'Donate Now', '/get-involved', 4);

-- Insert impact stats
INSERT IGNORE INTO impact_stats (label, value, suffix, icon, display_order) VALUES
('Communities Reached', 50, '+', 'users', 1),
('Clean Water Projects', 25, '', 'droplets', 2),
('Students Supported', 2500, '+', 'graduation-cap', 3),
('Hectares Restored', 500, '+', 'sprout', 4);

-- Insert programs
INSERT IGNORE INTO programs (title, description, long_description, icon, display_order) VALUES
('Water & Sanitation', 'Providing access to clean and safe water for rural communities', 'Our water and sanitation programs focus on drilling boreholes, building water storage facilities, and implementing hygiene education programs to ensure communities have sustainable access to clean water.', 'droplets', 1),
('Education & Literacy', 'Empowering communities through quality education programs', 'We build schools, provide learning materials, train teachers, and offer scholarship programs to ensure every child has access to quality education regardless of their circumstances.', 'graduation-cap', 2),
('Food Security', 'Promoting sustainable agriculture and food security', 'Through training in modern farming techniques, providing seeds and tools, and establishing community gardens, we help communities achieve food security and economic independence.', 'sprout', 3),
('Environmental Conservation', 'Protecting and restoring natural ecosystems', 'Our environmental programs include reforestation, wildlife conservation, and community education on sustainable resource management to protect Malawi''s natural heritage.', 'leaf', 4),
('Healthcare Access', 'Improving health outcomes in underserved areas', 'We support community health workers, provide medical supplies, and run health education campaigns to improve healthcare access in remote rural areas.', 'heart-pulse', 5),
('Economic Empowerment', 'Creating sustainable livelihood opportunities', 'Through skills training, microfinance initiatives, and market access programs, we help community members develop sustainable income sources and improve their economic well-being.', 'briefcase', 6);

-- Insert team members
INSERT IGNORE INTO team_members (name, role, bio, display_order) VALUES
('Nelson Blackson', 'Co-Founder & Executive Director', 'Nelson brings over 15 years of experience in community development and nonprofit management. His passion for rural empowerment drives BOZCH''s mission forward.', 1),
('Omega Zambasa', 'Co-Founder & Programs Director', 'Omega oversees all program implementation and ensures our initiatives create lasting impact in the communities we serve.', 2),
('Grace Phiri', 'Finance Manager', 'Grace ensures financial transparency and accountability in all our operations, maintaining the trust of our donors and partners.', 3),
('James Banda', 'Field Operations Manager', 'James coordinates our field teams and ensures smooth implementation of projects across all communities.', 4);

-- Insert milestones
INSERT IGNORE INTO milestones (year, title, description, display_order) VALUES
('2025', 'Foundation', 'BOZCH Africa Limited was founded by Nelson Blackson and Omega Zambasa with a vision to empower rural communities.', 1),
('2025', 'First Water Project', 'Completed our first borehole project, providing clean water to over 500 community members.', 2),
('2025', 'Education Initiative Launch', 'Launched our education program, supporting 100 students with scholarships and learning materials.', 3),
('2025', 'Agricultural Training', 'Started sustainable agriculture training programs reaching 200 farmers.', 4);

-- Insert core values
INSERT IGNORE INTO core_values (title, description, icon, display_order) VALUES
('Integrity', 'We operate with transparency, honesty, and accountability in all our actions.', 'shield-check', 1),
('Community First', 'We prioritize community needs and ensure local voices guide our initiatives.', 'users', 2),
('Sustainability', 'We design programs for long-term impact and environmental responsibility.', 'recycle', 3),
('Collaboration', 'We work together with partners, communities, and stakeholders to achieve shared goals.', 'handshake', 4),
('Innovation', 'We embrace creative solutions to address complex development challenges.', 'lightbulb', 5);

-- Insert page content
INSERT IGNORE INTO page_content (page_slug, section_key, title, content) VALUES
('home', 'intro', 'Welcome to BOZCH Africa', 'We are dedicated to empowering rural communities in Malawi through sustainable development initiatives.'),
('about', 'story', 'Our Story', 'BOZCH Africa Limited was born from a deep commitment to transforming rural communities in Malawi. Founded in 2025 by Nelson Blackson and Omega Zambasa, our organization emerged from witnessing firsthand the challenges faced by underserved communities.'),
('about', 'approach', 'Our Approach', 'We believe in community-driven development that empowers local people to lead their own transformation. Our programs are designed with community input and implemented through local partnerships.');
