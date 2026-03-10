import React from 'react';
import { Typography } from './ui/Typography';
import { Button } from './ui/Button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background text-foreground">
          <Typography variant="h2" className="mb-4">Something went wrong.</Typography>
          <Typography variant="body" className="mb-8 text-muted-foreground text-center max-w-md">
            An unexpected error occurred. Please try refreshing the page.
          </Typography>
          <Button onClick={() => window.location.reload()} variant="primary">
            Refresh Page
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
