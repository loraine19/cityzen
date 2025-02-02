import { BrowserRouter, Route, Routes, } from "react-router-dom";
import ServiceCreatePage from "./presenter/components/shared/service/ServiceCreatePage";
import ServiceDetailPage from "./presenter/components/shared/service/ServiceDetailPage";
import ServiceEditPage from "./presenter/components/shared/service/ServiceEditPage";
import ServiceListPage from "./presenter/components/shared/service/ServiceListPage";
import IssueCreatePage from "./presenter/components/shared/service/issue/IssueCreatePage";
import IssueDetailPage from "./presenter/components/shared/service/issue/IssueDetailPage";
import IssueEditPage from "./presenter/components/shared/service/issue/IssueEditPage";
import AnnounceCreatePage from "./presenter/components/shared/announce/AnnounceCreatePage";
import AnnounceDetailPage from "./presenter/components/shared/announce/AnnounceDetailPage";
import AnnounceEditPage from "./presenter/components/shared/announce/AnnounceEditPage";
import AnnounceListPage from "./presenter/components/shared/announce/AnnounceListPage";
import ForgotPasswordPage from "./presenter/components/shared/auth/ForgotPasswordPage";
import ResetPasswordPage from "./presenter/components/shared/auth/ResetPasswordPage";
import SignInPage from "./presenter/components/shared/auth/SignInPage";
import SignUpDetailPage from "./presenter/components/shared/auth/SignUpDetailPage";
import SignUpPage from "./presenter/components/shared/auth/SignUpPage";
import DashboardPage from "./presenter/components/shared/dashboard/DashboardPage"
import EventCreatePage from "./presenter/components/shared/event/EventCreatePage";
import EventDetailPage from "./presenter/components/shared/event/EventDetailPage";
import EventEditPage from "./presenter/components/shared/event/EventEditPage";
import EventListPage from "./presenter/components/shared/event/EventListPage";
import FlagCreatePage from "./presenter/components/shared/flag/FlagCreatePage";
import FlagEditPage from "./presenter/components/shared/flag/FlagEditPage";
import FlagPage from "./presenter/components/shared/flag/FlagPage";
import SurveyCreatePage from "./presenter/components/shared/poolSurvey/SurveyCreatePage";
import SurveyDetailPage from "./presenter/components/shared/poolSurvey/SurveyDetailPage";
import SurveyListPage from "./presenter/components/shared/poolSurvey/SurveyListPage";
import MyInfosPage from "./presenter/components/shared/myInfos/MyInfosPage";
import NotificationPage from "./presenter/components/shared/myInfos/NotificationPage";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PoolDetailPage from "./presenter/components/shared/poolSurvey/PoolDetaiPage";
import { PrivateRoute } from "./presenter/components/shared/utilsPage/PrivateRouter";
import NotFindPage from "./presenter/components/shared/utilsPage/NotFindPage";
import ErrorBoundary from "./presenter/components/shared/utilsPage/ErrorBoundary";
import { useState } from "react";

function App() {
    const [retryCount, setRetryCount] = useState(0);
    const handleRetry = () => {
        setTimeout(() => { console.log(retryCount, 'retryCountApp') }, 5000);
        setRetryCount(retryCount + 1);
    }


    return (
        <>
            <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');</style>

            <BrowserRouter>
                <ErrorBoundary onRetry={handleRetry} retryCount={retryCount}>
                    <Routes>
                        <Route path="/signin" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                        <Route path="/signup_details" element={<SignUpDetailPage />} />
                        <Route path="/motdepasse_oublie" element={<ForgotPasswordPage />} />
                        <Route path="/motdepasse_oublie/reset" element={<ResetPasswordPage />} />



                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/msg" element={<DashboardPage />} />
                            <Route path="/myprofile" element={<MyInfosPage />} />
                            <Route path="/notification" element={<NotificationPage />} />

                            <Route path="/service" element={<ServiceListPage />} />
                            <Route path="/service/:id" element={<ServiceDetailPage />} />
                            <Route path="/service/create" element={<ServiceCreatePage />} />
                            <Route path="/service/edit/:id" element={<ServiceEditPage />} />

                            <Route path="/litige/:id" element={<IssueDetailPage />} />
                            <Route path="/litige/edit/:id" element={<IssueEditPage />} />
                            <Route path="/conciliation" element={<ServiceListPage />} />

                            <Route path="/conciliation/:id" element={<IssueDetailPage />} />
                            <Route path="/conciliation/create/:id" element={<IssueCreatePage />} />

                            <Route path="/evenement" element={<EventListPage />} />
                            <Route path="/evenement/create" element={<EventCreatePage />} />
                            <Route path="/evenement/:id" element={<EventDetailPage />} />
                            <Route path="/evenement/edit/:id" element={<EventEditPage />} />

                            <Route path="/flag/:target/:id" element={<FlagCreatePage />} />
                            <Route path="/flag/edit/:target/:id" element={<FlagEditPage />} />
                            <Route path="/flag" element={<FlagPage />} />

                            <Route path="/sondage" element={<SurveyListPage />} />
                            <Route path="/sondage/:id" element={<SurveyDetailPage />} />
                            <Route path="/sondage/edit/:id" element={<SurveyCreatePage />} />
                            <Route path="/sondage/create" element={<SurveyCreatePage />} />
                            <Route path="/cagnotte/:id" element={<PoolDetailPage />} />
                            <Route path="/cagnotte/edit/:id" element={<SurveyCreatePage />} />

                            <Route path="/annonce" element={<AnnounceListPage />} />
                            <Route path="/annonce/:id" element={<AnnounceDetailPage />} />
                            <Route path="/annonce/create" element={<AnnounceCreatePage />} />
                            <Route path="/annonce/edit/:id" element={<AnnounceEditPage />} />

                            <Route path="/*" element={<NotFindPage />} />
                        </Route>

                    </Routes>
                </ErrorBoundary>
                <ReactQueryDevtools />
            </BrowserRouter>
        </>
    );
}

export default App;
