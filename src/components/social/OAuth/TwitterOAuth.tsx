
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const TwitterOAuth: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      window.opener?.postMessage({
        type: 'OAUTH_ERROR',
        platform: 'twitter',
        error: error
      }, window.location.origin);
      window.close();
      return;
    }

    if (code && state) {
      // Send the authorization code to parent window
      // In production, this code should be sent to your backend to exchange for access token
      window.opener?.postMessage({
        type: 'OAUTH_SUCCESS',
        platform: 'twitter',
        data: { code, state }
      }, window.location.origin);

      window.close();
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Connecting your Twitter account...</p>
        <p className="text-sm text-gray-500 mt-2">Please wait while we complete the authentication.</p>
      </div>
    </div>
  );
};

export default TwitterOAuth;
