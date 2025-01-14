// Import PAGES
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./contexts/data.context";
import { UserProvider } from "./contexts/user.context";

import ServiceCreatePage from "./components/shared/service/ServiceCreatePage";
import ServiceDetailPage from "./components/shared/service/ServiceDetailPage";
import ServiceEditPage from "./components/shared/service/ServiceEditPage";
import ServiceListPage from "./components/shared/service/ServiceListPage";
import IssueCreatePage from "./components/shared/service/issue/IssueCreatePage";
import IssueDetailPage from "./components/shared/service/issue/IssueDetailPage";
import IssueEditPage from "./components/shared/service/issue/IssueEditPage";
import AnnounceCreatePage from "./components/shared/announce/AnnounceCreatePage";
import AnnounceDetailPage from "./components/shared/announce/AnnounceDetailPage";
import AnnounceEditPage from "./components/shared/announce/AnnounceEditPage";
import AnnounceListPage from "./components/shared/announce/AnnounceListPage";
import ForgotPasswordPage from "./components/shared/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/shared/auth/ResetPasswordPage";
import SignInPage from "./components/shared/auth/SignInPage";
import SignUpDetailPage from "./components/shared/auth/SignUpDetailPage";
import SignUpPage from "./components/shared/auth/SignUpPage";
import DashboardPage from "./components/shared/dashboard/DashboardPage";
import NotFindPage from "./components/shared/dashboard/NotFindPage";
import EventCreatePage from "./components/shared/event/EventCreatePage";
import EventDetailPage from "./components/shared/event/EventDetailPage";
import EventEditPage from "./components/shared/event/EventEditPage";
import EventListPage from "./components/shared/event/EventListPage";
import FlagCreatePage from "./components/shared/flag/FlagCreatePage";
import FlagEditPage from "./components/shared/flag/FlagEditPage";
import FlagPage from "./components/shared/flag/FlagPage";
import PoolDetailPage from "./components/shared/poolSurvey/PoolDetaiPage";
import SurveyCreatePage from "./components/shared/poolSurvey/SurveyCreatePage";
import SurveyDetailPage from "./components/shared/poolSurvey/SurveyDetailPage";
import SurveyListPage from "./components/shared/poolSurvey/SurveyListPage";
import MyInfosPage from "./components/shared/myInfos/MyInfosPage";
import NotificationPage from "./components/shared/myInfos/NotificationPage";



function App() {


    return (
        <>
            <style>@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&display=swap');</style>
            <DataProvider>
                <UserProvider>
                    <BrowserRouter  >
                        <Routes >
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/signin" element={<SignInPage />} />
                            <Route path="/signup" element={<SignUpPage />} />
                            <Route path="/signup_details" element={<SignUpDetailPage />} />
                            <Route path="/motdepasse_oublie" element={<ForgotPasswordPage />} />
                            <Route path="/motdepasse_oublie/reset" element={<ResetPasswordPage />} />

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
                            <Route path="/myprofile" element={<MyInfosPage />} />
                            <Route path="/notification" element={<NotificationPage />} />

                            <Route path="/annonce/:id" element={<AnnounceDetailPage />} />
                            <Route path="/annonce/create" element={<AnnounceCreatePage />} />
                            <Route path="/annonce/edit/:id" element={<AnnounceEditPage />} />

                            <Route path="/*" element={<NotFindPage />} />
                        </Routes>
                    </BrowserRouter>
                </UserProvider>
            </DataProvider>
        </>
    );
}

export default App;
