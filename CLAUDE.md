# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm start          # Start development server
npm run build      # Create production build
npm test           # Run tests in watch mode
```

## Architecture

This is a React + Redux application that displays COVID-19 statistics using data from the disease.sh API (https://disease.sh/v3/covid-19/).

### Tech Stack
- React 16 (class components)
- Redux with redux-thunk for async actions
- MDBReact (Material Design Bootstrap) for UI components
- Axios for API requests
- SCSS for styling

### Data Flow
1. **Actions** (`src/redux/actions/`) - Async thunk actions fetch data from disease.sh API endpoints
2. **Reducers** (`src/redux/reducers/`) - Store fetched stats in Redux state
3. **Data Components** (`src/components/data/`) - Connect to Redux store and render statistics

### Redux Store Structure
- `globalStats` - Worldwide COVID-19 statistics
- `allUsStateStats` - All US states data
- `today_us_states_stats` - Today's US state statistics
- `yesterday_us_states_stats` - Yesterday's US state statistics
- `allCountries` - Statistics for all countries

### Component Organization
- `src/components/layout/` - Page layout sections (Header, Body, Footer)
- `src/components/data/` - Data display components connected to Redux (GlobalStatsAPI, AllCountryStats, UsStatesStats)

### API Endpoints Used
- `/v3/covid-19/all` - Global statistics
- `/v3/covid-19/states` - US states data
- `/v3/covid-19/countries` - All countries data
