import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import NavBarBottom from "../../../common/NavBarBottom";
import NavBarTop from "../../../common/NavBarTop";
import SubHeader from "../../../common/SubHeader";
import TabsMenu from "../../../common/TabsMenu";
import { Label, TabLabel } from "../../../../../domain/entities/frontEntities";
import { SkeletonGrid } from "../../../common/Skeleton";
import DI from '../../../../../di/ioc';
import { LoadMoreButton } from "../../../common/LoadMoreBtn";
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

    //// PARAMS
    const [Params, setParams] = useSearchParams();
    const params = { filter: Params.get("filter"), category: Params.get("category") }
    useEffect(() => { setFilter(params.filter || '') }, []);

    //// VIEW MODEL
    const issueViewModelFactory = DI.resolve('issueViewModel');
    const { issues, isLoading, error, fetchNextPage, hasNextPage, refetch, count } = issueViewModelFactory(step)

    //// STATE
    const user = useUserStore().user
    const ImModo = (user.GroupUser.map(g => g.role).includes(Role.MODO))

    //// NAMING
    const filterName = (): string => filter === IssueFilter.FINISH && 'resolus' || filter === IssueFilter.PENDING && 'demande' || filter === IssueFilter.WAITING && 'en cours' || ''

    //// FILTER TAB
    const filterTab = async (value?: IssueFilter) => {
        setParams({ filter: value as string ?? '', category });
        value !== filter && setCategory('')
        setFilter(value ?? '');
        setStep(value ?? '')
        setParams({ filter: value as string ?? '', category })
    }

    const serviceTabs: TabLabel[] = [
        { label: "tous", value: '', result: () => filterTab() },
        { label: "demande", value: IssueFilter.WAITING, result: () => filterTab(IssueFilter.WAITING) },
        { label: "en cours", value: IssueFilter.PENDING, result: () => filterTab(IssueFilter.PENDING) },
        { label: "terminés", value: IssueFilter.FINISH, result: () => filterTab(IssueFilter.FINISH) },
        { label: "me concerne", value: IssueFilter.MINE, result: () => filterTab(IssueFilter.MINE) }
    ]

    //// TODO KEEP SEARCH ? ADD SORT ?
    //// SEARCH
    const search = (searchLabel: Label) => {
        const value = searchLabel.value;
        if (value) {
            setCategory(value);
            setParams({ search: tabSelected, category: value });
        }
    }

    //// NOTIFICATION
    useEffect(() => {
        switch (true) {
            case (count === 0): setNotif(`Aucun ${filterName()} n'a été trouvé`); break;
            case (error): setNotif("Erreur lors du chargement, veuillez réessayer plus tard"); break;
            default: setNotif('');
        }
    }, [issues, isLoading, error, filter, category, count, ImModo]);

    //// HANDLE SCROLL
    const divRef = useRef(null);
    const [isBottom, setIsBottom] = useState(false);
    const handleScroll = () => {
        if (divRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = divRef.current;
            if (scrollTop + clientHeight + 2 >= scrollHeight) {
                setIsBottom(true);
                hasNextPage && fetchNextPage()
            } else setIsBottom(false)
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
                className="Grid">
                {isLoading ?
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
