
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const LinkedInOAuth: React.FC = () => {
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    if (error) {
      window.opener?.postMessage({
        type: 'OAUTH_ERROR',
        platform: 'linkedin',
        error: error
      }, window.location.origin);
      window.close();
      return;
    }

    if (code && state) {
      const mockUserData = {
        name: 'LinkedIn Profile',
        username: '@linkedinuser',
        followers_count: 850,
        access_token: code
      };

      window.opener?.postMessage({
        type: 'OAUTH_SUCCESS',
        platform: 'linkedin',
        data: mockUserData
      }, window.location.origin);

      window.close();
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Connecting your LinkedIn account...</p>
      </div>
    </div>
  );
};

export default LinkedInOAuth;
