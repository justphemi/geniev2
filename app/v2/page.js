"use client"
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { ChevronDown, Diamond, HelpCircle, LogOut, Menu, MessageSquare, Settings, X, Zap, Clock, CreditCard, User, ArrowUp } from "lucide-react"

// Simulated chat messages
const initialMessages = [
  { id: 1, text: "Hello! How can I assist you today?", sender: "ai" },
  { id: 2, text: "I need help with my account.", sender: "user" },
  { id: 3, text: "What specific aspect of your account do you need help with?", sender: "ai" },
]

// Simulated trading pairs (you would fetch this from an API in a real application)
const tradingPairs = [
  "EUR/USD", "USD/JPY", "GBP/USD", "USD/CHF", "AUD/USD", "USD/CAD",
  "AAPL", "GOOGL", "MSFT", "AMZN", "FB", "TSLA",
  "E-mini S&P 500", "E-mini Nasdaq-100", "Crude Oil", "Gold", "Natural Gas",
  "US30", "GER30", "UK100", "JPN225", "AUS200"
]

export default function Dashboard() {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [historyOpen, setHistoryOpen] = useState(false)
  const [billingOpen, setBillingOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)
  const [editProfileOpen, setEditProfileOpen] = useState(false)
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false)
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [selectedPair, setSelectedPair] = useState("")
  const [tradingMode, setTradingMode] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputMessage, sender: "user" }])
      setInputMessage("")
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { id: prev.length + 1, text: "I'm processing your request. How else can I help you?", sender: "ai" }])
      }, 1000)
    }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 3000)
  }

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    script.onload = () => {
      new (window).TradingView.widget({
        width: '100%',
        height: '100%',
        symbol: 'NASDAQ:AAPL',
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        toolbar_bg: '#f1f3f6',
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: 'tradingview_chart'
      });
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#131212ec] text-white overflow-hidden">
      {/* Navbar */}
      <header className="flex justify-between items-center px-4 py-2 bg-[#000] w-full z-10">
        <div className="flex items-center">
          <button onClick={() => setLeftSidebarOpen(!leftSidebarOpen)} className="mr-4">
            <Menu size={18} />
          </button>
          <div className="flex items-center">
            {/* <div className="w-8 h-8 bg-green-500 rounded-full mr-2"></div> */}
            <span className="font-bold text-md">Greenpip</span>
          </div>
        </div>
        <div className="flex items-center">
          <span className="mr-4 px-2 py-1 bg-gray-700 rounded text-sm">Upgrade to Greenpip+</span>
          <button onClick={() => setHistoryOpen(true)} className="mr-4">
            <Clock size={18} />
          </button>
          <button onClick={() => setRightSidebarOpen(!rightSidebarOpen)} className="mr-4">
            <Zap size={18} />
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer h-18 w-22">
                <AvatarImage src="/placeholder.svg" className="h-18 w-22"/>
                <AvatarFallback className="h-18 w-22">G</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex flex-col space-y-4">
                <h3 className="font-semibold text-lg">Account Profile</h3>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>TV</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Tola Victor</p>
                    <p className="text-sm text-gray-500">tola@example.com</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" onClick={() => setEditProfileOpen(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => setAccountSettingsOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-700" onClick={() => setLogoutConfirmOpen(true)}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </header>

      <div className="flex flex-1 w-auto overflow-hidden">
        {/* Left Sidebar */}
        <aside 
          className={`fixed lg:relative inset-y-0 left-0 z-40 w-64 bg-[#000] transform transition-transform duration-300 ease-in-out ${
            leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-bold">Analysis</h2>
            <button onClick={() => setLeftSidebarOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <Select onValueChange={setSelectedPair}>
              <SelectTrigger>
                <SelectValue placeholder="Select Trading Pair" />
              </SelectTrigger>
              <SelectContent>
                {tradingPairs.map((pair) => (
                  <SelectItem key={pair} value={pair}>{pair}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setTradingMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select Trading Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="scalping">Scalping</SelectItem>
                <SelectItem value="dayTrading">Day Trading</SelectItem>
                <SelectItem value="swingTrading">Swing Trading</SelectItem>
                <SelectItem value="positionTrading">Position Trading</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              className="w-full bg-green-500 hover:bg-green-600" 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !selectedPair || !tradingMode}
            >
              {isAnalyzing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </div>
              ) : (
                'Analyze'
              )}
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="bg-green-700 rounded-lg p-4 mb-4">
              <h3 className="font-bold mb-2">Upgrade Account</h3>
              <p className="text-sm mb-2">Unlock premium features</p>
              <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => setBillingOpen(true)}>Upgrade</Button>
            </div>
            <button onClick={() => setSettingsOpen(true)} className="flex items-center w-full p-2 text-gray-300 hover:bg-green-700 rounded-md mb-2">
              <Settings size={20} className="mr-2" />
              Settings
            </button>
            <button onClick={() => setHelpOpen(true)} className="flex items-center w-full p-2 text-gray-300 hover:bg-green-700 rounded-md mb-2">
              <HelpCircle size={20} className="mr-2" />
              Help
            </button>
            <div className="flex justify-between text-xs text-gray-400 mt-4">
              <button className="hover:underline">Terms & Conditions</button>
              <button className="hover:underline">Privacy Policy</button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 qflex flex-col overflow-hidden">
          <div className="flex-1">
            <div 
              className={`w-full h-full transition-all duration-300 
              ${rightSidebarOpen ? 'mr-80' : 'mr-0'}
              ${!rightSidebarOpen ? 'w-[100vw]' : ''}`} id="tradingview_chart"></div>
          </div>
        </main>

        {/* Right Sidebar - Chat */}
        <aside 
          className={`fixed lg:relative inset-y-0 right-0 z-40 w-80 bg-[#000] transform transition-transform duration-300 ease-in-out ${
            rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center px-4 py-1 border-b border-green-700">
              <h2 className="text-xl font-bold">Greenpip V2</h2>
              <button onClick={() => setRightSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <ScrollArea className="flex-1 p-4">
              {messages.map((message) => (
                <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 text-sm rounded-lg ${message.sender === 'user' ? 'bg-green-900' : 'bg-gray-700'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-4 border-t border-green-700">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 mr-2 bg-transparent text-white placeholder-gray-300"
                />
                <Button onClick={sendMessage} className="bg-green-900 cursor-pointer hover:bg-green-800">
                  <ArrowUp />
                </Button>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Popups */}
      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>History</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[60vh]">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-500 rounded-full mr-2 flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <span>XAUUSD {i + 1}</span>
                </div>
                <span className="text-sm text-gray-400">Oct {i + 1}, 2024</span>
              </div>
            ))}
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Dialog open={billingOpen} onOpenChange={setBillingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Billing</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3  className="text-lg font-semibold mb-2">Current Plan</h3>
              <div className="bg-green-600 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Greenpip Plus</span>
                  <span className="text-sm">$49.99/month</span>
                </div>
                <p className="text-sm mt-2">Access to advanced features and priority support</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Billing History</h3>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-green-700 rounded">
                    <span>October {2024 - i}</span>
                    <span>$49.99</span>
                  </div>
                ))}
              </div>
            </div>
            <Button className="w-full bg-green-500 hover:bg-green-600">Upgrade Plan</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add settings options here */}
            <p>Settings options will be displayed here.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Help</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add help content here */}
            <p>Help and support information will be displayed here.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={editProfileOpen} onOpenChange={setEditProfileOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add profile editing form here */}
            <p>Profile editing options will be displayed here.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={accountSettingsOpen} onOpenChange={setAccountSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Account Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Add account settings options here */}
            <p>Account settings options will be displayed here.</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={logoutConfirmOpen} onOpenChange={setLogoutConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoutConfirmOpen(false)}>Cancel</Button>
            <Button className="bg-red-500 hover:bg-red-600">Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


// import BottomSection from "./components/base-components/bottom-section"
// import TopSection from "./components/base-components/top-section"

// const page = () => {
//   return (
//     <div className="w-full flex flex-col m-0 p-0">
//         <TopSection />
//         <BottomSection />        
//     </div>
//   )
// }

// export default page