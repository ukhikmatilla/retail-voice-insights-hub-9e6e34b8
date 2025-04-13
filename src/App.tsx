import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

// Import pages
import Onboarding from "./pages/onboarding";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import SelectRole from "./pages/auth/SelectRole";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Salesperson pages
import SalesDashboard from "./pages/sales/dashboard";
import SalesConversations from "./pages/sales/conversations";
import ConversationDetail from "./pages/sales/conversations/[id]";
import SalesInsights from "./pages/sales/insights";
import TotalInsightsPage from "./pages/sales/insights/total";
import ScoreInsightsPage from "./pages/sales/insights/score";
import ImprovementInsightsPage from "./pages/sales/insights/improvement";
import SalesTraining from "./pages/sales/training";
import MicroTrainingDetail from "./pages/sales/training/micro/[id]";
import ScriptsPage from "./pages/sales/scripts";
import BadgesPage from "./pages/sales/training/badges";

// Manager pages
import ManagerDashboard from "./pages/manager/dashboard";
import ManagerTeam from "./pages/manager/team";
import ManagerInsights from "./pages/manager/insights";
import ManagerCoaching from "./pages/manager/coaching";
import ManagerStores from "./pages/manager/stores";

// HR pages
import HrDashboard from "./pages/hr/dashboard";
import HrPersonnel from "./pages/hr/personnel";
import HrAnalysis from "./pages/hr/analysis";
import HrTrainingManagement from "./pages/hr/training-management";

// Profile pages
import ProfileSettings from "./pages/profile/settings";

// Add import for the training module page
import TrainingModuleDetail from "./pages/sales/training/[slug]";

// Import i18n instance
import "./i18n/index";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Onboarding route */}
              <Route path="/onboarding" element={<Onboarding />} />
              
              {/* Auth routes */}
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/forgot-password" element={<ForgotPassword />} />
              <Route 
                path="/auth/select-role" 
                element={
                  <ProtectedRoute>
                    <SelectRole />
                  </ProtectedRoute>
                } 
              />

              {/* Profile routes */}
              <Route 
                path="/profile/settings" 
                element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } 
              />

              {/* Salesperson routes */}
              <Route 
                path="/sales/dashboard" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <SalesDashboard />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/conversations" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <SalesConversations />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/conversations/:id" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <ConversationDetail />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/insights" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <SalesInsights />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/insights/total" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <TotalInsightsPage />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/insights/score" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <ScoreInsightsPage />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/insights/improvement" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <ImprovementInsightsPage />
                  </RoleProtectedRoute>
                } 
              />
              
              <Route 
                path="/sales/training" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <SalesTraining />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/training/:slug" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <TrainingModuleDetail />
                  </RoleProtectedRoute>
                }
              />
              <Route 
                path="/sales/training/micro/:id" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <MicroTrainingDetail />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/scripts" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <ScriptsPage />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/sales/training/badges" 
                element={
                  <RoleProtectedRoute allowedRoles={['salesperson']}>
                    <BadgesPage />
                  </RoleProtectedRoute>
                } 
              />

              {/* Manager routes */}
              <Route 
                path="/manager/dashboard" 
                element={
                  <RoleProtectedRoute allowedRoles={['manager']}>
                    <ManagerDashboard />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/manager/team" 
                element={
                  <RoleProtectedRoute allowedRoles={['manager']}>
                    <ManagerTeam />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/manager/insights" 
                element={
                  <RoleProtectedRoute allowedRoles={['manager']}>
                    <ManagerInsights />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/manager/coaching" 
                element={
                  <RoleProtectedRoute allowedRoles={['manager']}>
                    <ManagerCoaching />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/manager/stores" 
                element={
                  <RoleProtectedRoute allowedRoles={['manager']}>
                    <ManagerStores />
                  </RoleProtectedRoute>
                } 
              />

              {/* HR routes */}
              <Route 
                path="/hr/dashboard" 
                element={
                  <RoleProtectedRoute allowedRoles={['hr']}>
                    <HrDashboard />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/hr/personnel" 
                element={
                  <RoleProtectedRoute allowedRoles={['hr']}>
                    <HrPersonnel />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/hr/analysis" 
                element={
                  <RoleProtectedRoute allowedRoles={['hr']}>
                    <HrAnalysis />
                  </RoleProtectedRoute>
                } 
              />
              <Route 
                path="/hr/training-management" 
                element={
                  <RoleProtectedRoute allowedRoles={['hr']}>
                    <HrTrainingManagement />
                  </RoleProtectedRoute>
                } 
              />

              {/* Redirect / to onboarding or role-specific dashboard */}
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              
              {/* Legacy route redirects */}
              <Route path="/dashboard/*" element={<Navigate to="/sales/dashboard" replace />} />
              
              {/* 404 Not Found */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
