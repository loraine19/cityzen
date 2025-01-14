// Import PAGES
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DataProvider } from "./contexts/data.context";
import { UserProvider } from "./contexts/user.context";
import AnnounceCreatePage from "./components/pages/announce/AnnounceCreatePage";
import AnnounceDetailPage from "./components/pages/announce/AnnounceDetailPage";
import AnnounceEditPage from "./components/pages/announce/AnnounceEditPage";
import AnnounceListPage from "./components/pages/announce/AnnounceListPage";
import ForgotPasswordPage from "./components/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/auth/ResetPasswordPage";
import SignInPage from "./components/pages/auth/SignInPage";
import SignUpDetailPage from "./components/pages/auth/SignUpDetailPage";
import SignUpPage from "./components/pages/auth/SignUpPage";
import DashboardPage from "./components/pages/DashboardPage";
import EventCreatePage from "./components/pages/event/EventCreatePage";
import EventDetailPage from "./components/pages/event/EventDetailPage";
import EventEditPage from "./components/pages/event/EventEditPage";
import EventListPage from "./components/pages/event/EventListPage";
import FlagCreatePage from "./components/pages/flag/FlagCreatePage";
import FlagEditPage from "./components/pages/flag/FlagEditPage";
import FlagPage from "./components/pages/flag/FlagPage";
import MyInfosPage from "./components/pages/myInfos/MyInfosPage";
import NotificationPage from "./components/pages/myInfos/NotificationPage";
import NotificationsPage from "./components/pages/myInfos/NotificationPage";
import RulesPage from "./components/pages/myInfos/RulePage";
import NotFindPage from "./components/pages/NotFindPage";
import ServiceCreatePage from "./components/pages/service/ServiceCreatePage";
import ServiceDetailPage from "./components/pages/service/ServiceDetailPage";
import ServiceEditPage from "./components/pages/service/ServiceEditPage";
import ServiceListPage from "./components/pages/service/ServiceListPage";
import IssueCreatePage from "./components/pages/service/issue/IssueCreatePage";
import IssueDetailPage from "./components/pages/service/issue/IssueDetailPage";
import IssueEditPage from "./components/pages/service/issue/IssueEditPage";
import PoolDetailPage from "./components/pages/survey/PoolDetaiPage";
import SurveyCreatePage from "./components/pages/survey/SurveyCreatePage";
import SurveyDetailPage from "./components/pages/survey/SurveyDetailPage";
import SurveyListPage from "./components/pages/survey/SurveyListPage";


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
