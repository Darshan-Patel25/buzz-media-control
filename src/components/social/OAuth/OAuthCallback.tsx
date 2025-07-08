
import React, { useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';

const OAuthCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { platform } = useParams<{ platform: string }>();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      window.opener?.postMessage({
        type: 'OAUTH_ERROR',
        platform: platform,
        error: error
      }, window.location.origin);
      window.close();
      return;
    }

    if (code && state) {
      window.opener?.postMessage({
        type: 'OAUTH_SUCCESS',
        platform: platform,
        data: { code, state }
      }, window.location.origin);
      window.close();
    }
  }, [searchParams, platform]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
