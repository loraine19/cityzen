import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PrivateRoute } from "./presenter/components/shared/utilsPage/PrivateRouter";
import NotFindPage from "./presenter/components/shared/utilsPage/NotFindPage";
import ErrorBoundary from "./presenter/components/shared/utilsPage/ErrorBoundary";
import SignInPage from "./presenter/components/shared/auth/SignInPage";
import ProfileCreatePage from "./presenter/components/shared/auth/ProfileCreatePage";
import SignUpPage from "./presenter/components/shared/auth/SignUpPage";
import DashboardPage from "./presenter/components/shared/dashboard/DashboardPage";
import { LoadingPage } from "./presenter/components/shared/utilsPage/LoadingPage";
import { errorValues } from "./presenter/components/shared/utilsPage/erroValues";
import { AlertModal } from "./presenter/components/common/AlertModal";
import { useAlertStore } from "./application/stores/alert.store";

// Lazy load components
const ServiceCreatePage = lazy(() => import("./presenter/components/shared/service/ServiceCreatePage"));
const ServiceDetailPage = lazy(() => import("./presenter/components/shared/service/ServiceDetailPage"));
const ServiceEditPage = lazy(() => import("./presenter/components/shared/service/ServiceEditPage"));
const ServiceListPage = lazy(() => import("./presenter/components/shared/service/ServiceListPage"));
const IssueCreatePage = lazy(() => import("./presenter/components/shared/service/issue/IssueCreatePage"));
const IssueDetailPage = lazy(() => import("./presenter/components/shared/service/issue/IssueDetailPage"));
const IssueEditPage = lazy(() => import("./presenter/components/shared/service/issue/IssueEditPage"));
const AnnounceCreatePage = lazy(() => import("./presenter/components/shared/post/AnnounceCreatePage"));
const AnnounceDetailPage = lazy(() => import("./presenter/components/shared/post/AnnounceDetailPage"));
const AnnounceEditPage = lazy(() => import("./presenter/components/shared/post/AnnounceEditPage"));
const AnnounceListPage = lazy(() => import("./presenter/components/shared/post/AnnounceListPage"));
const ForgotPasswordPage = lazy(() => import("./presenter/components/shared/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./presenter/components/shared/auth/ResetPasswordPage"));
const DeleteAccountPage = lazy(() => import("./presenter/components/shared/auth/DeleteAccountPage"));
const EventCreatePage = lazy(() => import("./presenter/components/shared/event/EventCreatePage"));
const EventDetailPage = lazy(() => import("./presenter/components/shared/event/EventDetailPage"));
const EventEditPage = lazy(() => import("./presenter/components/shared/event/EventEditPage"));
const EventListPage = lazy(() => import("./presenter/components/shared/event/EventListPage"));
const FlagCreatePage = lazy(() => import("./presenter/components/shared/flag/FlagCreatePage"));
const FlagEditPage = lazy(() => import("./presenter/components/shared/flag/FlagEditPage"));
const FlagPage = lazy(() => import("./presenter/components/shared/flag/FlagPage"));
const VoteCreatePage = lazy(() => import("./presenter/components/shared/vote/VoteCreatePage"));
const SurveyDetailPage = lazy(() => import("./presenter/components/shared/vote/SurveyDetailPage"));
const VoteListPage = lazy(() => import("./presenter/components/shared/vote/VoteListPage"));
const VoteEditPage = lazy(() => import("./presenter/components/shared/vote/VoteEditPage"));
const MyInfosPage = lazy(() => import("./presenter/components/shared/myInfos/MyInfosPage"));
const NotificationPage = lazy(() => import("./presenter/components/shared/myInfos/NotificationPage"));
const PoolDetailPage = lazy(() => import("./presenter/components/shared/vote/PoolDetaiPage"));
const ConciliationListPage = lazy(() => import("./presenter/components/shared/service/issue/ConciationListPage"));
const ChatPage = lazy(() => import("./presenter/components/shared/dashboard/ChatPage"));
const RulesPage = lazy(() => import("./presenter/components/shared/dashboard/RulesPage"));
const GroupPage = lazy(() => import("./presenter/components/shared/dashboard/GroupPage"));


function App() {
    const [retryCount, setRetryCount] = useState(0);
    const handleRetry = () => {
        setTimeout(() => { console.log(retryCount, 'retryCountApp') }, 5000);
        setRetryCount(retryCount + 1);
    }
    const { alertValues } = useAlertStore(state => state)

    return (
        <>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');
            </style>
            <BrowserRouter>
                <ErrorBoundary onRetry={handleRetry} retryCount={retryCount}>
                    <Suspense fallback={<LoadingPage />}>
                        <Routes>
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/profile/create" element={<ProfileCreatePage />} />
                            <Route path="/motdepasse_oublie" element={<ForgotPasswordPage />} />
                            <Route path="/motdepasse_oublie/reset" element={<ResetPasswordPage />} />
                            <Route path="/delete_account" element={<DeleteAccountPage />} />

                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="/" element={<DashboardPage />} />
                                <Route path="/chat" element={<ChatPage />} />

                                <Route path="/group" element={<GroupPage />} />
                                <Route path="/reglement" element={<RulesPage />} />
                                <Route path="/msg" element={<DashboardPage />} />
                                <Route path="/myprofile" element={<MyInfosPage />} />
                                <Route path="/notification" element={<NotificationPage />} />

                                <Route path="/service" element={<ServiceListPage />} />
                                <Route path="/service/:id" element={<ServiceDetailPage />} />
                                <Route path="/service/create" element={<ServiceCreatePage />} />
                                <Route path="/service/edit/:id" element={<ServiceEditPage />} />

                                <Route path="/litige/:id" element={<IssueDetailPage />} />
                                <Route path="/conciliation/edit/:id" element={<IssueEditPage />} />
                                <Route path="/conciliation" element={<ConciliationListPage />} />

                                <Route path="/conciliation/:id" element={<IssueDetailPage />} />
                                <Route path="/conciliation/create/:id" element={<IssueCreatePage />} />

                                <Route path="/evenement" element={<EventListPage />} />
                                <Route path="/evenement/create" element={<EventCreatePage />} />
                                <Route path="/evenement/:id" element={<EventDetailPage />} />
                                <Route path="/evenement/edit/:id" element={<EventEditPage />} />

                                <Route path="/flag/:target/:id" element={<FlagCreatePage />} />
                                <Route path="/flag/edit/:target/:id" element={<FlagEditPage />} />
                                <Route path="/flag" element={<FlagPage />} />

                                <Route path="/vote" element={<VoteListPage />} />
                                <Route path="/vote/:target/edit/:id" element={<VoteEditPage />} />
                                <Route path="/vote/create" element={<VoteCreatePage />} />
                                <Route path="/cagnotte/:id" element={<PoolDetailPage />} />
                                <Route path="/sondage/:id" element={<SurveyDetailPage />} />

                                <Route path="/annonce" element={<AnnounceListPage />} />
                                <Route path="/annonce/:id" element={<AnnounceDetailPage />} />
                                <Route path="/annonce/create" element={<AnnounceCreatePage />} />
                                <Route path="/annonce/edit/:id" element={<AnnounceEditPage />} />

                                <Route path="/*" element={<NotFindPage />} />

                            </Route>
                        </Routes>

                    </Suspense>
                </ErrorBoundary>
                <AlertModal values={alertValues ?? errorValues} />
                <ReactQueryDevtools />
            </BrowserRouter>
        </>
    );
}

export default App;
