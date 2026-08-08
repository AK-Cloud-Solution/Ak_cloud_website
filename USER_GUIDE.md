# AK Cloud Solutions - User Guide

## Overview
AK Cloud Solutions is a role-based DevOps platform with three access levels: **Visitor**, **User**, and **Admin**.

## Test Credentials

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: All applications (Slack, Zoom, Tailgate, Parsec, Azure DevOps, Jira Board, Dashboards)

### User Account
- **Username**: `user`
- **Password**: `user123`
- **Access**: Zoom only

### Visitor (Not Logged In)
- **Access**: Home page and Contact page only
- **Restrictions**: Cannot view About Us, Tools, or Dashboard sections

## Features

### 1. Authentication System
- **Login**: Username/password authentication with "Remember Me" option
- **Register**: Create new accounts (new users default to 'user' role)
- **Forgot Password**: Password recovery flow (simulated)
- **Logout**: Clear session and return to visitor mode

### 2. Role-Based Access Control

#### Visitor (Not Authenticated)
- ✅ Can view: Home, Contact
- ❌ Cannot view: About Us, Tools, Dashboard
- Shows restricted access message with call-to-action to login/register

#### User Role
- ✅ Can view: Home, About Us, Tools, Contact
- ✅ Dashboard access: Zoom application only
- ❌ Other applications are locked (visible but disabled)

#### Admin Role
- ✅ Can view: All sections
- ✅ Dashboard access: All 7 applications
  - Slack
  - Zoom
  - Tailgate
  - Parsec
  - Azure DevOps
  - Jira Board
  - Dashboards

### 3. Navigation
- Navigation menu adapts based on authentication status
- Logged-in users see:
  - Username and role badge
  - Dashboard button
  - Logout button
- Visitors see:
  - Login button
  - Register button

### 4. DevOps Content
- Hero section focused on DevOps engineering
- Features CI/CD pipelines, Infrastructure as Code, and Auto Scaling
- Professional DevOps-themed design throughout

## How to Use

1. **As a Visitor**: Browse the home page and contact section. Try to access About Us or Tools to see the restriction in action.

2. **Login as User**: 
   - Click "Login" 
   - Use credentials: `user` / `user123`
   - Access the Dashboard to see limited access (Zoom only)

3. **Login as Admin**:
   - Click "Login"
   - Use credentials: `admin` / `admin123`
   - Access the Dashboard to see all 7 applications

4. **Create New Account**:
   - Click "Register"
   - Fill in username, email, and password
   - New accounts are created with 'user' role by default

5. **Access Dashboard**:
   - After logging in, click "Dashboard" in navigation
   - Or click "Go to Dashboard" in the hero section

## Technical Notes

- Authentication state persists in localStorage when "Remember Me" is checked
- All authentication is simulated (frontend-only for demonstration)
- In production, this would connect to a real backend API
- Password recovery is simulated (shows success message only)

## Security Notes

⚠️ **For Production Use**:
- Replace mock authentication with real backend API
- Implement proper password hashing
- Add JWT or session-based authentication
- Enable HTTPS/SSL
- Add rate limiting for login attempts
- Implement CSRF protection
- Follow WCAG 2.1 accessibility standards
