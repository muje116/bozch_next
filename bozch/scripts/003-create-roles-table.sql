-- Create roles table for User Management
CREATE TABLE IF NOT EXISTS roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default roles
INSERT IGNORE INTO roles (name, description) VALUES
('super_admin', 'Full access to all modules and settings'),
('admin', 'Access to most modules and settings'),
('editor', 'Can manage content but not system settings'),
('viewer', 'Read-only access to the dashboard');
