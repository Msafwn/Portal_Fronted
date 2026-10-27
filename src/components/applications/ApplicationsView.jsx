import React from 'react';
import { ApplicationsProvider, useApplications } from './ApplicationsContext';
import { ApplicationsHeader } from './ApplicationsHeader';
import { ApplicationsFilterTabs } from './ApplicationsFilterTabs';
import { ApplicationsList } from './ApplicationsList';
import { ApplicationsItem } from './ApplicationsItem';
import { ApplicationsEmptyState } from './ApplicationsEmptyState';

export const ApplicationsView = ({
  applicationsList = [],
  children,
  className = '',
}) => {
  return (
    <ApplicationsProvider applicationsList={applicationsList}>
      <div className={`px-4 sm:px-6 lg:px-8 2xl:px-12 3xl:px-16 py-6 2xl:py-10 space-y-6 2xl:space-y-10 max-w-[2400px] mx-auto ${className}`}>
        {children}
      </div>
    </ApplicationsProvider>
  );
};

ApplicationsView.Header = ApplicationsHeader;
ApplicationsView.FilterTabs = ApplicationsFilterTabs;
ApplicationsView.List = ApplicationsList;
ApplicationsView.Item = ApplicationsItem;
ApplicationsView.EmptyState = ApplicationsEmptyState;

export {
  useApplications,
  ApplicationsHeader,
  ApplicationsFilterTabs,
  ApplicationsList,
  ApplicationsItem,
  ApplicationsEmptyState,
};

export default ApplicationsView;
