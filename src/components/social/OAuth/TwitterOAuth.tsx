
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const TwitterOAuth: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      // Send error to parent window
      window.opener?.postMessage({
        type: 'OAUTH_ERROR',
        platform: 'twitter',
        error: error
      }, window.location.origin);
      window.close();
      return;
    }

    if (code && state) {
      // In a real implementation, you would exchange the code for an access token
      // For now, we'll simulate a successful connection
      const mockUserData = {
        name: 'Twitter User',
        username: '@twitteruser',
        followers_count: 1250,
        access_token: code // In reality, you'd exchange this
      };

      // Send success data to parent window
      window.opener?.postMessage({
        type: 'OAUTH_SUCCESS',
        platform: 'twitter',
        data: mockUserData
      }, window.location.origin);

      window.close();
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Connecting your Twitter account...</p>
      </div>
    </div>
  );
};

export default TwitterOAuth;
