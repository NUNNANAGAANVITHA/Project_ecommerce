const ErrorState = ({ onRetry }) => (
  <div className="error-state" role="alert">
    <div className="error-icon">⚠️</div>
    <h3>Unable to load products. Please try again.</h3>
    <button type="button" className="retry-button" onClick={onRetry}>
      Retry
    </button>
  </div>
);

export default ErrorState;
