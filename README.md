# UiPath Claims Portal

A professional, enterprise-grade claims management portal for claims officers to monitor and manage Home HO-5 insurance claims through UiPath Case Management. The portal provides a comprehensive analytics dashboard showing key metrics and trends, a searchable list of active claims with filtering capabilities, and detailed case views with timeline visualization.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/swati354/uipath-claims-portal)

## Overview

The Claims Portal enables claims officers to efficiently process and track insurance claims through their lifecycle. Each case view displays complete case data including variables, stage progression, task status, document management, and full audit history. The interface follows enterprise SaaS design patterns with clean tables, neutral color schemes, and information-dense layouts.

## Key Features

- **Analytics Dashboard**: Real-time metrics including total active claims, claims by status/stage, average processing time, and SLA compliance rates with interactive charts
- **Claims Management**: Searchable, filterable table of all active claims with sorting, pagination, and quick filters by status/stage/priority
- **Case Detail Views**: Comprehensive case information with four tabs:
  - **Case Data**: All case variables and metadata in structured key-value format
  - **Case Timeline**: Visual timeline showing all stages with completion status and timestamps
  - **Case Documents**: List of attached documents with download links
  - **Case Tasks**: Active and completed action center tasks
  - **Case Audit**: Full audit trail of all case activities and state changes
- **Real-time Updates**: Live polling for case status and data changes
- **Professional UI**: Clean, modern interface with responsive design and enterprise aesthetics

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Recharts** for data visualization
- **@tanstack/react-table** for advanced table features
- **Zustand** for state management
- **date-fns** for date formatting

### Backend Integration
- **UiPath TypeScript SDK** for Orchestrator, Case Management, and Action Center integration
- OAuth 2.0 authentication flow

### Deployment
- **Cloudflare Pages** for static site hosting
- **Vite** for build tooling

## Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher
- UiPath Cloud account with access to:
  - Orchestrator (Case Management)
  - Action Center
  - Required scopes: `PIMS`, `OR.Execution`, `OR.Tasks`, `DataFabric.Data.Read`

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd claims-portal
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Configure environment variables**
   
   Copy the `.env` file and update with your UiPath credentials:
   ```bash
   cp .env .env.local
   ```
   
   Edit `.env.local` with your UiPath organization details:
   ```env
   VITE_UIPATH_BASE_URL=https://api.uipath.com
   VITE_UIPATH_ORG_NAME=your-org-name
   VITE_UIPATH_TENANT_NAME=your-tenant-name
   VITE_UIPATH_CLIENT_ID=your-client-id
   VITE_UIPATH_REDIRECT_URI=http://localhost:3000
   VITE_UIPATH_SCOPE=OR.Execution OR.Tasks PIMS DataFabric.Data.Read
   ```

4. **Start the development server**
   ```bash
   bun run dev
   ```
   
   The application will be available at `http://localhost:3000`

## Development

### Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui components
│   └── layout/       # Layout components
├── hooks/            # Custom React hooks
├── pages/            # Application pages
├── lib/              # Utility functions
└── main.tsx          # Application entry point
```

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run preview` - Preview production build locally
- `bun run lint` - Run ESLint

### Key Development Patterns

#### SDK Service Integration

All UiPath SDK services use constructor-based dependency injection:

```typescript
import { useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { CaseInstances } from '@uipath/uipath-typescript/cases';

function MyComponent() {
  const { sdk } = useAuth();
  const caseInstances = useMemo(() => new CaseInstances(sdk), [sdk]);
  
  // Use caseInstances methods...
}
```

#### State Management

The application uses Zustand for state management. Always select individual primitives to avoid infinite loops:

```typescript
// ✅ CORRECT
const selectedCase = useStore(s => s.selectedCase);
const filters = useStore(s => s.filters);

// ❌ WRONG - causes infinite loops
const { selectedCase, filters } = useStore(s => ({ 
  selectedCase: s.selectedCase, 
  filters: s.filters 
}));
```

#### Real-time Updates

Use the `usePolling` hook for real-time data updates:

```typescript
const { data, isLoading, isActive } = usePolling({
  fetchFn: () => caseInstances.getById(caseId, folderKey),
  interval: 5000,
  enabled: !!caseId,
  deps: [caseId], // Reset when case changes
});
```

## Deployment

### Deploy to Cloudflare Pages

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/swati354/uipath-claims-portal)

#### Manual Deployment

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Deploy to Cloudflare Pages**
   ```bash
   npx wrangler pages deploy dist
   ```

3. **Configure environment variables in Cloudflare Dashboard**
   
   Navigate to your Pages project settings and add:
   - `VITE_UIPATH_BASE_URL`
   - `VITE_UIPATH_ORG_NAME`
   - `VITE_UIPATH_TENANT_NAME`
   - `VITE_UIPATH_CLIENT_ID`
   - `VITE_UIPATH_REDIRECT_URI` (set to your Cloudflare Pages URL)
   - `VITE_UIPATH_SCOPE`

#### Continuous Deployment

Connect your repository to Cloudflare Pages for automatic deployments:

1. Go to Cloudflare Dashboard → Pages
2. Create a new project from your Git repository
3. Configure build settings:
   - **Build command**: `bun run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
4. Add environment variables in the project settings
5. Deploy

## Usage

### Accessing the Portal

1. Navigate to the deployed URL or `http://localhost:3000` in development
2. Click "Login" to authenticate with UiPath
3. Grant the required permissions in the OAuth consent screen
4. You'll be redirected back to the portal

### Dashboard

The main dashboard displays:
- Key metrics cards (total claims, by status, by stage, SLA compliance)
- Trend charts for claims over time
- Stage distribution visualization
- Recent activity table

### Claims List

- Use the search bar to filter claims by ID, policy holder, or claim type
- Click column headers to sort
- Use quick filters for status, stage, and priority
- Click any row to view detailed case information

### Case Detail View

Each case shows:
- **Header**: Claim summary with ID, policy holder, current stage, status, priority
- **Case Data Tab**: All case variables in structured format
- **Case Timeline Tab**: Visual timeline of all stages with completion markers
- **Case Documents Tab**: Attached documents with download capability
- **Case Tasks Tab**: Action Center tasks with status and action buttons
- **Case Audit Tab**: Complete audit trail with timestamps

## Configuration

### Case Process Setup

The portal expects a UiPath Case Management process named "Home HO-5 claims -> Case Management type v1.0.4". To use a different process:

1. Update the process name filter in the dashboard component
2. Ensure the case definition includes the expected stages and variables
3. Configure document storage if using the Documents tab

### Customization

- **Color Palette**: Edit `tailwind.config.js` to customize colors
- **Polling Interval**: Adjust the `interval` parameter in `usePolling` hooks (default: 5000ms)
- **Table Columns**: Modify column definitions in the Claims List component
- **Metrics**: Customize dashboard metrics in the Analytics Dashboard component

## Troubleshooting

### Authentication Issues

- Verify OAuth client ID and redirect URI match your UiPath app configuration
- Ensure all required scopes are included in `VITE_UIPATH_SCOPE`
- Check browser console for detailed error messages

### Data Not Loading

- Confirm the case process exists and is accessible in your UiPath tenant
- Verify folder permissions for the authenticated user
- Check network tab for API errors

### Build Errors

- Clear node_modules and reinstall: `rm -rf node_modules && bun install`
- Ensure Bun version is up to date: `bun upgrade`
- Check for TypeScript errors: `bun run lint`

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the [UiPath SDK documentation](https://docs.uipath.com/sdk)
- Review the SDK reference files in `prompts/sdk-reference/`
- Open an issue in the repository