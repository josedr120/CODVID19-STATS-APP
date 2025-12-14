# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands

```bash
npm run dev        # Start Vite development server (port 3000)
npm run build      # Create production build in dist/
npm run preview    # Preview production build locally
```

## Architecture

This is a React 19 + Redux Toolkit application that displays COVID-19 statistics using data from the disease.sh API (https://disease.sh/v3/covid-19/).

### Tech Stack
- React 19 (functional components with hooks)
- Redux Toolkit with createAsyncThunk for async actions
- Tailwind CSS v4 + DaisyUI v5 for UI
- Vite for build tooling
- Axios for API requests
- Chart.js + react-chartjs-2 for data visualization
- react-countup for animated numbers

### Data Flow
1. **Slices** (`src/store/slices/`) - RTK slices with createAsyncThunk for API calls
2. **Store** (`src/store/index.js`) - Configured with configureStore
3. **Components** - Use useSelector/useDispatch hooks to access Redux state

### Redux Store Structure
- `globalStats` - Worldwide COVID-19 statistics (data, loading, error)
- `usStates` - US states data (today, yesterday, usaData, loading, error)
- `countries` - All countries statistics (data, loading, error)

### Component Organization
- `src/components/layout/` - Navbar, Footer, ThemeToggle
- `src/components/dashboard/` - Reusable components (StatCard, StatsGrid, ChartCard, DataTable)
- `src/components/global/` - GlobalStats component
- `src/components/us-states/` - USStatesStats component
- `src/components/countries/` - CountriesStats component

### Styling
- Tailwind CSS v4 configured via Vite plugin
- DaisyUI v5 themes: light (default), dark, cyberpunk
- Theme configured in `src/index.css` using `@plugin "daisyui"`
- Theme toggle persists to localStorage

### API Endpoints
- `/v3/covid-19/all` - Global statistics
- `/v3/covid-19/states` - US states today
- `/v3/covid-19/states?yesterday=true` - US states yesterday
- `/v3/covid-19/countries` - All countries data
