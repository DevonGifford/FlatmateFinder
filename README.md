# Flatmate Finder 

(work in progress)


Flatmate Finder is an application designed to streamline the process of finding the perfect flatmate. Built with Vite, TypeScript, Firebase, and Tailwind CSS, it offers a seamless user experience for both potential flatmates and current tenants.

## Overview

This application simplifies the flatmate search by offering a user-friendly form for potential flatmates to fill out. Once the form is completed, the data is securely stored via Firebase, ensuring privacy and security.

### Features

- **User Profiles**: Potential flatmates can create detailed profiles with essential information, preferences, and more.
- **Tenant Access**: Current tenants can access a Tinder-like interface to view profiles and rate potential flatmates.
- **Rating System**: Enables tenants to rate profiles, providing valuable feedback for better decision-making.
- **Leaderboard**: A dynamic leaderboard showcases the most popular and highly-rated flatmate options.

## How It Works

### For Potential Flatmates

1. **Form Submission**: Fill out the comprehensive form, providing necessary details and preferences.
2. **Data Storage**: Submitted data is securely stored on Firebase.

### For Current Tenants

1. **Profile Viewing**: Access the application to view profiles in a Tinder-like interface.
2. **Rating System**: Rate potential flatmates based on preferences and interactions.
3. **Leaderboard**: See the most popular options based on tenant ratings.

## Getting Started

### Prerequisites

Ensure you have Node.js installed.

### Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up Firebase credentials and configurations.
4. Run the application using `npm run dev`.

## Contributing

Contributions are welcome! If you'd like to enhance the application or fix bugs, please follow the standard GitHub flow: fork, create a branch, commit changes, and open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

Special thanks to [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [Firebase](https://firebase.google.com/), and [Tailwind CSS](https://tailwindcss.com/) for enabling the development of this application.


# Release v1.0.0 Final Changes

## Objective
Prepare for public release by addressing final adjustments and improvements.

## Issues Resolved
- **Fix Mobile Responsiveness**: Ensure Tinder cards display well on mobile devices.
- **Remove Unused Icons**: Eliminate unnecessary refresh and save icons from the navbar.
- **Refactor URL Validation**: Enhance URL validation in application forms.
- **Add Favicon and App Name**: Implement favicon and include the app's name in production.
- **Console Log Cleanup**: Remove all console logs to optimize code.
- **Spanish Language Fixes**: Address minor language corrections suggested by language specialist Adrian.

## Actionable Items
1. Fix mobile view issues for Tinder cards.
2. Remove unused icons (refresh, save) from the navbar.
3. Refactor URL validation logic in application forms.
4. Add favicon and incorporate app name for the production environment.
5. Eliminate all console logs for a cleaner codebase.
6. Implement Spanish language fixes recommended by Adrian.

## Timeline
These changes aim to be completed and merged into the main branch for the v1.0.0 release