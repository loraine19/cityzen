// Import PAGES

import { Route, Routes, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/user.context";
import ServiceListPage from "./pages/service/ServiceListPage";
import SignUpPage from "./pages/auth/SignUpPage";
import SignUpDetailPage from "./pages/auth/SignUpDetailPage";
import DashboardPage from "./pages/DashboardPage";
import EventListPage from "./pages/event/EventListPage";
import SurveyListPage from "./pages/survey/SurveyListPage";
import AnnounceListPage from "./pages/announce/AnnounceListPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import EventCreatePage from "./pages/event/EventCreatePage";
import EventDetailPage from "./pages/event/EventDetailPage";
import EventEditPage from "./pages/event/EventEditPage";
import SurveyCreatePage from "./pages/survey/SurveyCreatePage";
import AnnounceDetailPage from "./pages/announce/AnnounceDetailPage";
import AnnounceCreatePage from "./pages/announce/AnnounceCreatePage";
import ServiceDetailPage from "./pages/service/ServiceDetailPage";
import ServiceCreatePage from "./pages/service/ServiceCreatePage";
import AnnounceEditPage from "./pages/announce/AnnounceEditPage";
import MyInfosPage from "./pages/myInfos/MyInfosPage";
import SignInPage from "./pages/auth/SignInPage";
import FlagPage from "./pages/flag/FlagPage";
import SurveyDetailPage from "./pages/survey/SurveyDetailPage";
import SurveyEditPage from "./pages/survey/SurveyEditPage";
import SurveyDetailPoolPage from "./pages/survey/SurveyDetailPoolPage";
import SurveyEditPoolPage from "./pages/survey/SurveyEditPoolPage";
import RulesPage from "./pages/user/RulePage";
import NotificationsPage from "./pages/myInfos/NotificationPage";
import ServiceEditPage from "./pages/service/ServiceEditPage";
import IssueCreatePage from "./pages/service/issue/IssueCreatePage";
import IssueDetailPage from "./pages/service/issue/IssueDetailPage";
import NotificationPage from "./pages/myInfos/NotificationPage";
import { DataProvider } from "./contexts/data.context";
import NotFindPage from "./pages/NotFindPage";
import IssueEditPage from "./pages/service/issue/IssueEditPage";
import FlagCreatePage from "./pages/flag/FlagCreatePage";
import FlagEditPage from "./pages/flag/FlagEditPage";


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
                            <Route path="/" element={<DashboardPage />} />
                            <Route path="/signup-details" element={<SignUpDetailPage />} />
                            <Route path="/motdepasse_oublie" element={<ForgotPasswordPage />} />

                            <Route path="/myprofile" element={<MyInfosPage />} />
                            <Route path="/notification" element={<NotificationsPage />} />

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
                            <Route path="/sondage/edit/:id" element={<SurveyEditPage />} />
                            <Route path="/sondage/create" element={<SurveyCreatePage />} />
                            <Route path="/cagnotte/:id" element={<SurveyDetailPoolPage />} />
                            <Route path="/cagnotte/edit/:id" element={<SurveyEditPoolPage />} />

                            <Route path="/annonce" element={<AnnounceListPage />} />
                            <Route path="/annonce/:id" element={<AnnounceDetailPage />} />
                            <Route path="/annonce/create" element={<AnnounceCreatePage />} />
                            <Route path="/annonce/edit/:id" element={<AnnounceEditPage />} />
                            <Route path="/myprofile" element={<MyInfosPage />} />
                            <Route path="/notification" element={<NotificationPage />} />
                            <Route path="/rules" element={<RulesPage />} />

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
