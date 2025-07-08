
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info } from 'lucide-react';

const OAuthSetupGuide: React.FC = () => {
  const platforms = [
    {
      name: 'Twitter',
      url: 'https://developer.twitter.com/en/portal/dashboard',
      envVars: ['VITE_TWITTER_CLIENT_ID', 'VITE_TWITTER_CLIENT_SECRET'],
      scopes: 'tweet.read tweet.write users.read offline.access',
    },
    {
      name: 'Facebook',
      url: 'https://developers.facebook.com/apps/',
      envVars: ['VITE_FACEBOOK_CLIENT_ID', 'VITE_FACEBOOK_CLIENT_SECRET'],
      scopes: 'pages_manage_posts,pages_read_engagement',
    },
    {
      name: 'LinkedIn',
      url: 'https://developer.linkedin.com/apps',
      envVars: ['VITE_LINKEDIN_CLIENT_ID', 'VITE_LINKEDIN_CLIENT_SECRET'],
      scopes: 'w_member_social,r_basicprofile',
    },
    {
      name: 'Instagram',
      url: 'https://developers.facebook.com/apps/',
      envVars: ['VITE_INSTAGRAM_CLIENT_ID', 'VITE_INSTAGRAM_CLIENT_SECRET'],
      scopes: 'user_profile,user_media',
    },
  ];

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-blue-900">OAuth Setup Required</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-blue-800 text-sm">
          To connect real social media accounts, you need to create OAuth applications for each platform
          and configure your environment variables.
        </p>
        
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="border border-blue-200 rounded-lg p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-blue-900">{platform.name}</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(platform.url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Developer Portal
                </Button>
              </div>
              
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>Required scopes:</strong> {platform.scopes}</p>
                <p><strong>Environment variables:</strong></p>
                <ul className="list-disc list-inside ml-2">
                  {platform.envVars.map((envVar) => (
                    <li key={envVar} className="font-mono">{envVar}</li>
                  ))}
                </ul>
                <p><strong>Redirect URI:</strong> {window.location.origin}/auth/{platform.name.toLowerCase()}/callback</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 text-xs">
            <strong>Note:</strong> For security, OAuth credentials should be stored as environment variables
            and the token exchange should happen on your backend server, not in the frontend.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OAuthSetupGuide;
