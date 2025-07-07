
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const FacebookOAuth: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      window.opener?.postMessage({
        type: 'OAUTH_ERROR',
        platform: 'facebook',
        error: error
      }, window.location.origin);
      window.close();
      return;
    }

    if (code && state) {
      const mockUserData = {
        name: 'Facebook Page',
        username: '@facebookpage',
        followers_count: 2500,
        access_token: code
      };

      window.opener?.postMessage({
        type: 'OAUTH_SUCCESS',
        platform: 'facebook',
        data: mockUserData
      }, window.location.origin);

      window.close();
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Connecting your Facebook account...</p>
      </div>
    </div>
  );
};

export default FacebookOAuth;
