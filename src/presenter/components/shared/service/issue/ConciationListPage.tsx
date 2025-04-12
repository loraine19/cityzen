import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBarBottom from "../../../common/NavBarBottom";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";
import TabsMenu from "../../../common/TabsMenu";
import { Label, TabLabel } from "../../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../../common/Skeleton";
import DI from '../../../../../di/ioc';
import { getLabel } from "../../../../views/viewsEntities/utilsService";
import { LoadMoreButton } from "../../../common/LoadMoreBtn";
import { serviceCategories } from "../../../../constants";
import IssueCard from "./IssueCard";
import { IssueView } from "../../../../views/viewsEntities/issueViewEntity";
import { useUserStore } from "../../../../../application/stores/user.store";
import { Role } from "../../../../../domain/entities/GroupUser";
import { IssueFilter } from '../../../../../domain/entities/Issue';

export default function ConciationListPage() {
    const [notif, setNotif] = useState<string>('');
    const [tabSelected] = useState<string>('');
    const [step, setStep] = useState<string>('');
    const [filter, setFilter] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const issueViewModelFactory = DI.resolve('issueViewModel');
    const { issues, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = issueViewModelFactory(step);
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    const user = useUserStore().user
    const ImModo = (user.GroupUser.map(g => g.role).includes(Role.MODO))

    useEffect(() => { setFilter(params.filter || '') }, []);

    const filterName = (): string => filter === IssueFilter.FINISH && 'resolus' || filter === IssueFilter.PENDING && 'demande' || filter === IssueFilter.WAITING && 'en cours' || ''

    const filterTab = async (value?: IssueFilter) => {
        setParams({ filter: value as string || '', category: category });
        if (value !== filter) { setCategory('') }
        setFilter(value || '');
        setStep(value || '')
        setParams({ filter: value as string || '', category: category })
    }

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "demande", value: IssueFilter.WAITING, result: () => filterTab(IssueFilter.WAITING) },
        { label: "en cours", value: IssueFilter.PENDING, result: () => filterTab(IssueFilter.PENDING) },
        { label: "terminés", value: IssueFilter.FINISH, result: () => filterTab(IssueFilter.FINISH) },
    ]

    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
    }

    useEffect(() => {
        const notifUpdate =
            (count === 0 && !isLoading) &&
            `Aucune concialation ${filter !== '' ? getLabel(filter, serviceTabs).toLowerCase() : ''} ${category !== '' ? getLabel(category, serviceCategories).toLowerCase() : ''} n'a été trouvé`
            || error && "Erreur lors du chargement des conciliations, veuillez réessayer plus tard"
            || !ImModo && "Vous n'êtes pas conciliateur"
        setNotif(notifUpdate);
    }, [issues, isLoading, error, filter, category, count, ImModo]);

    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                if (hasNextPage) {
                    fetchNextPage();
                }
            } else {
                setIsBottom(false);
            }
        }
    }

    return (
        <div className="Body gray">
            <header className="px-4 !gap-0 !pb-0">
                <NavBarTop />
                <SubHeader
                    closeBtn
                    qty={count}
                    link="/"
                    type={`${count > 0 ? 'conciliations' : 'aucune conciliation'} ${filterName()}`} />

                <TabsMenu labels={serviceTabs} />
                {notif &&
                    <div className="w-full flex justify-center p-8">
                        {notif}
                    </div>}
            </header>
            <main ref={divRef}
                onScroll={() => handleScroll()}
                className="Grid2 ">
                {isLoading || error || !ImModo ?
                    [...Array(window.innerWidth >= 768 ? 2 : 1)].map((_, index) => (
                        <SkeletonGrid
                            key={index}
                            count={4} />
                    ))
                    :
                    issues.map((issue: IssueView, index: number) => (
                        <div className="SubGrid" key={index}>
                            <IssueCard
                                issue={issue}
                                change={search}
                                update={refetch} />
                        </div>))}
                <LoadMoreButton
                    isBottom={isBottom}
                    hasNextPage={hasNextPage}
                    handleScroll={() => handleScroll()} />
            </main>
            <NavBarBottom color={'blue-gray'} />
        </div>
    );
}
