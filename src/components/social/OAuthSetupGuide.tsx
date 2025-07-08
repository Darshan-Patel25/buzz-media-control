
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Info, Key, Shield } from 'lucide-react';

const OAuthSetupGuide: React.FC = () => {
  const platforms = [
    {
      name: 'Twitter',
      url: 'https://developer.twitter.com/en/portal/dashboard',
      envVars: ['TWITTER_CLIENT_ID', 'TWITTER_CLIENT_SECRET'],
      scopes: 'tweet.read tweet.write users.read offline.access',
      instructions: 'Create a new app, enable OAuth 2.0, and set the callback URL.',
    },
    {
      name: 'Facebook',
      url: 'https://developers.facebook.com/apps/',
      envVars: ['FACEBOOK_CLIENT_ID', 'FACEBOOK_CLIENT_SECRET'],
      scopes: 'pages_manage_posts,pages_read_engagement',
      instructions: 'Create a new app, add Facebook Login product, and configure OAuth settings.',
    },
    {
      name: 'LinkedIn',
      url: 'https://developer.linkedin.com/apps',
      envVars: ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET'],
      scopes: 'w_member_social,r_basicprofile',
      instructions: 'Create a new app, request LinkedIn Sign In and Share on LinkedIn products.',
    },
  ];

  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <CardTitle className="text-blue-900">OAuth Setup Required for Real API Integration</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Key className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <p className="text-yellow-800 text-sm font-medium">Security Notice</p>
              <p className="text-yellow-700 text-xs mt-1">
                For real social media integration, you need to configure OAuth applications for each platform.
                This ensures secure authentication and protects user data.
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {platforms.map((platform) => (
            <div key={platform.name} className="border border-blue-200 rounded-lg p-4 bg-white">
              <div className="flex items-center justify-between mb-3">
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
              
              <div className="text-xs text-blue-700 space-y-2">
                <p><strong>Setup Instructions:</strong> {platform.instructions}</p>
                <p><strong>Required scopes:</strong> {platform.scopes}</p>
                <p><strong>Redirect URI:</strong> {window.location.origin}/auth/{platform.name.toLowerCase()}/callback</p>
                
                <div className="bg-gray-50 p-2 rounded border">
                  <p className="font-medium text-gray-700 mb-1">Required Secrets:</p>
                  <ul className="list-disc list-inside ml-2 space-y-1">
                    {platform.envVars.map((envVar) => (
                      <li key={envVar} className="font-mono text-gray-600">{envVar}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-green-600 mt-0.5" />
            <div>
              <p className="text-green-800 text-sm font-medium">Next Steps</p>
              <ol className="text-green-700 text-xs mt-1 list-decimal list-inside space-y-1">
                <li>Create OAuth applications on each platform</li>
                <li>Configure the OAuth credentials in your project settings</li>
                <li>Set up the redirect URIs as shown above</li>
                <li>Test the integration with real accounts</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-800 text-xs">
            <strong>Important:</strong> Never store OAuth credentials in your frontend code. 
            This implementation uses Supabase's secure secret management and edge functions 
            to handle token exchange safely on the server side.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OAuthSetupGuide;
