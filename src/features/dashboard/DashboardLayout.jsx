import styled from "styled-components";
import useRecentBookings from "./useRecentBookings";
import Spinner from "../../ui/Spinner";
import useRecentStays from "./useRecentStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { recentBookings, isLoadingRecentBookings } = useRecentBookings();
  const { recentStays, isLoadingRecentStays, confirmedStays } =
    useRecentStays();
  if (isLoadingRecentBookings || isLoadingRecentStays) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        recentBookings={recentBookings}
        recentStays={recentStays}
        confirmedStays={confirmedStays}
      />
      <TodayActivity />
      <DurationChart recentStays={recentStays} />
      <SalesChart recentBookings={recentBookings} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
