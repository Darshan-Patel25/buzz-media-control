
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, Users, Bell, Send, Settings, MessageSquare, Zap } from 'lucide-react';
import { Textarea } from '@/components/content/Textarea';

// Sample telegram bot data
const botData = {
  name: 'ZenithAssistant',
  token: '5123456789:AAHHGzTtoYjzWDqweTeYHugfFD3d6Jn9Zsc',
  subscribers: 243,
  active: true,
  commands: [
    { command: '/start', description: 'Start interacting with the bot', response: 'Welcome to Zenith Bot! Here are the commands you can use: /help, /latest, /subscribe' },
    { command: '/help', description: 'Show available commands', response: 'Available commands:\n/start - Begin interaction\n/latest - Get latest posts\n/subscribe - Subscribe to updates' },
    { command: '/latest', description: 'Get latest posts', response: 'Here are our latest posts: [Latest posts will be automatically inserted]' },
  ]
};

const TelegramBot: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isActive, setIsActive] = useState(botData.active);
  const [botToken, setBotToken] = useState(botData.token);
  const [botName, setBotName] = useState(botData.name);
  const [commands, setCommands] = useState(botData.commands);
  const [newCommand, setNewCommand] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newResponse, setNewResponse] = useState('');
  const [autoRespond, setAutoRespond] = useState(true);
  const [notifyNewSubscribers, setNotifyNewSubscribers] = useState(true);
  
  const handleAddCommand = () => {
    if (newCommand && newDescription && newResponse) {
      setCommands([...commands, {
        command: newCommand,
        description: newDescription,
        response: newResponse
      }]);
      setNewCommand('');
      setNewDescription('');
      setNewResponse('');
    }
  };
  
  const handleRemoveCommand = (index: number) => {
    const updatedCommands = [...commands];
    updatedCommands.splice(index, 1);
    setCommands(updatedCommands);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Telegram Bot</h1>
          <p className="text-muted-foreground">Manage your Telegram bot to interact with your audience</p>
        </div>
        <Button className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Create New Bot
        </Button>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="commands" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Commands
          </TabsTrigger>
          <TabsTrigger value="subscribers" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Subscribers
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Bot Information</CardTitle>
                <CardDescription>General information about your Telegram bot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="bot-token">Bot Token</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="bot-token" 
                        value={botToken} 
                        onChange={(e) => setBotToken(e.target.value)} 
                        type="password"
                        className="flex-1"
                      />
                      <Button variant="outline">Show</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This is your bot's authentication token. Keep it secure!
                    </p>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="bot-name">Bot Name</Label>
                    <Input 
                      id="bot-name" 
                      value={botName} 
                      onChange={(e) => setBotName(e.target.value)} 
                    />
                    <p className="text-xs text-muted-foreground">
                      This is the display name of your Telegram bot.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="bot-active">Bot Status</Label>
                      <p className="text-xs text-muted-foreground">
                        Toggle to enable or disable your bot.
                      </p>
                    </div>
                    <Switch 
                      id="bot-active" 
                      checked={isActive} 
                      onCheckedChange={setIsActive}
                    />
                  </div>
                  
                  <Button className="w-full">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Bot Statistics</CardTitle>
                <CardDescription>Performance metrics of your bot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Total Subscribers</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">{botData.subscribers}</h3>
                      <span className="ml-2 text-xs text-green-600">+12 this week</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Messages Sent</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">1,247</h3>
                      <span className="ml-2 text-xs text-green-600">+89 this week</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Commands Used</p>
                    <div className="flex items-baseline">
                      <h3 className="text-2xl font-bold">358</h3>
                      <span className="ml-2 text-xs text-green-600">+28 this week</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    View Detailed Stats
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Perform common bot operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Send className="h-10 w-10 text-blue-500 mb-2" />
                    <h3 className="font-medium mb-1">Send Message</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Send a broadcast message to all subscribers
                    </p>
                    <Button size="sm">Send Now</Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <MessageSquare className="h-10 w-10 text-purple-500 mb-2" />
                    <h3 className="font-medium mb-1">Update Commands</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Refresh bot commands on Telegram
                    </p>
                    <Button size="sm" variant="outline">Update</Button>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="flex flex-col items-center text-center">
                    <Users className="h-10 w-10 text-green-500 mb-2" />
                    <h3 className="font-medium mb-1">Export Subscribers</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      Download a list of your subscribers
                    </p>
                    <Button size="sm" variant="outline">Export</Button>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="commands">
          <Card>
            <CardHeader>
              <CardTitle>Bot Commands</CardTitle>
              <CardDescription>Configure commands and automated responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Command</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Description</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Response</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {commands.map((command, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">{command.command}</td>
                          <td className="px-4 py-3 text-sm">{command.description}</td>
                          <td className="px-4 py-3 text-sm max-w-[300px] truncate">{command.response}</td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="h-8">
                                Edit
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 text-red-600" 
                                onClick={() => handleRemoveCommand(index)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Command</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="new-command">Command</Label>
                          <Input 
                            id="new-command" 
                            placeholder="/command" 
                            value={newCommand}
                            onChange={(e) => setNewCommand(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-description">Description</Label>
                          <Input 
                            id="new-description" 
                            placeholder="Describe what this command does" 
                            value={newDescription}
                            onChange={(e) => setNewDescription(e.target.value)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-response">Response</Label>
                        <Textarea 
                          id="new-response" 
                          placeholder="Enter the bot's response to this command" 
                          className="min-h-[100px]"
                          value={newResponse}
                          onChange={(e) => setNewResponse(e.target.value)}
                        />
                      </div>
                      
                      <Button onClick={handleAddCommand}>
                        Add Command
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="subscribers">
          <Card>
            <CardHeader>
              <CardTitle>Subscribers Management</CardTitle>
              <CardDescription>View and manage your Telegram bot subscribers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search subscribers..."
                      className="pl-8 w-[250px]"
                    />
                  </div>
                  
                  <Button variant="outline">
                    Export List
                  </Button>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Username</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Joined Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Last Active</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <tr key={i} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm">
                            {1000000000 + Math.floor(Math.random() * 100000000)}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {Math.random() > 0.5 ? `user${i + 1}` : null}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <Button variant="ghost" size="sm" className="h-8 text-red-600">
                              Block
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-center">
                  <Button variant="outline" size="sm">Load More</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when your bot sends notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-1">
                  <Label>Broadcast Messages</Label>
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Scheduled Posts</p>
                          <p className="text-sm text-muted-foreground">Automatically notify subscribers of new scheduled posts</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Blog Updates</p>
                          <p className="text-sm text-muted-foreground">Send notifications when new blog content is published</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Special Offers</p>
                          <p className="text-sm text-muted-foreground">Send notifications about special promotions or offers</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="space-y-1">
                  <Label>Auto-Responder</Label>
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">Auto-respond to messages</p>
                          <p className="text-sm text-muted-foreground">Automatically respond to messages that don't match a command</p>
                        </div>
                        <Switch 
                          checked={autoRespond} 
                          onCheckedChange={setAutoRespond}
                        />
                      </div>
                      
                      {autoRespond && (
                        <div className="space-y-2">
                          <Label htmlFor="auto-response">Default Response</Label>
                          <Textarea 
                            id="auto-response" 
                            placeholder="Enter default response message" 
                            className="min-h-[100px]" 
                            defaultValue="Thanks for your message! Please use one of our commands to interact with this bot: /help to see all available options."
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
                
                <div className="space-y-1">
                  <Label>Admin Notifications</Label>
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">New Subscribers</p>
                          <p className="text-sm text-muted-foreground">Get notified when new users subscribe to your bot</p>
                        </div>
                        <Switch 
                          checked={notifyNewSubscribers}
                          onCheckedChange={setNotifyNewSubscribers}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">User Messages</p>
                          <p className="text-sm text-muted-foreground">Get notified when users send messages to your bot</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Error Reports</p>
                          <p className="text-sm text-muted-foreground">Get notified when your bot encounters errors</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </Card>
                </div>
                
                <Button>
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Bot Settings</CardTitle>
              <CardDescription>Advanced configuration options for your Telegram bot</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://your-webhook-url.com" 
                    defaultValue="https://api.zenith.com/telegram-webhook"
                  />
                  <p className="text-xs text-muted-foreground">
                    URL that receives updates from Telegram
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="help-text">Bot Help Text</Label>
                  <Textarea 
                    id="help-text" 
                    className="min-h-[100px]" 
                    defaultValue="Welcome to Zenith's Telegram Bot! Use the following commands to interact:\n\n/start - Start interacting with the bot\n/help - Show available commands\n/latest - Get latest posts"
                  />
                  <p className="text-xs text-muted-foreground">
                    Text shown when users request help
                  </p>
                </div>
                
                <div className="space-y-1">
                  <Label>Advanced Settings</Label>
                  <Card className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Logging</p>
                          <p className="text-sm text-muted-foreground">Enable detailed logging for debugging</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Rate Limiting</p>
                          <p className="text-sm text-muted-foreground">Limit message frequency to prevent spam</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Message Queueing</p>
                          <p className="text-sm text-muted-foreground">Queue messages for reliable delivery</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="destructive">
                    Reset Bot
                  </Button>
                  <Button>
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper component for search icon
const Search = ({ className, ...props }: React.ComponentProps<typeof Search>) => {
  return (
    <Search className={className} {...props} />
  );
};

export default TelegramBot;
