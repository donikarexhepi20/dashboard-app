import React, { ChangeEvent, createContext, useMemo, SetStateAction, Dispatch, Children } from "react";
import { useDashboard } from '../hooks/useDashboard'
import { SaleItem } from "../types/SaleDataType";
import { DaysEnum, RegionEnum } from "../enums/DashboardEnums";
import { Layout } from "react-grid-layout";


export interface DashboardValues {
    salesData: SaleItem[] | undefined,
    dayFilter: DaysEnum,
    regionFilter: RegionEnum,
    layouts: any,
    openModal: boolean,
    selectedProduct: any,
    handleClose: () => void,
    handleClick: (data: any) => void,
    handleSaveLayout: () => void,
    handleLayoutUpdate: (layout: any, allLayouts: any) => void
    handleDayFilterChange: (event: ChangeEvent<Omit<HTMLInputElement, "value"> & {
        value: string;
    }> | (Event & {
        target: {
            value: string;
            name: string;
        };
    })) => void,
    handleRegionFilterChange: (event: ChangeEvent<Omit<HTMLInputElement, "value"> & {
        value: string;
    }> | (Event & {
        target: {
            value: string;
            name: string;
        };
    })) => void,
}

export const DashboardContext = createContext<null | DashboardValues>(null);

interface ProviderProps {
    children: React.ReactNode
}

export const DashboardProvider = ({ children }: ProviderProps) => {
    const {
        salesData,
        dayFilter,
        regionFilter,
        layouts,
        openModal,
        selectedProduct,
        handleClose,
        handleClick,
        handleSaveLayout,
        handleLayoutUpdate,
        handleDayFilterChange,
        handleRegionFilterChange,
    } = useDashboard();



    const passedValue = {
        salesData,
        dayFilter,
        regionFilter,
        layouts,
        openModal,
        selectedProduct,
        handleClose,
        handleClick,
        handleSaveLayout,
        handleLayoutUpdate,
        handleDayFilterChange,
        handleRegionFilterChange,
    };

    const fireBaseProviderValue = useMemo(() => ({ passedValue }), [passedValue]);
    return (
        <DashboardContext.Provider value={fireBaseProviderValue.passedValue}>
            {children}
        </DashboardContext.Provider>
    );
    ;
}