import Chart from '../../chart/Chart';
import FeaturedInfo from '../../featuredInfo/FeaturedInfo';
import './home.css';
import { userData } from '../../../../dummyData';

import WidgetSm from '../../widgetSm/WidgetSm';
import WidgetLg from '../../widgetLg/WidgetLg';
import Sidebar from '../../sidebar/Sidebar';

export default function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="home">
        <FeaturedInfo />
        <Chart
          data={userData}
          title="Faina Analytics"
          grid
          dataKey="Active User"
        />
        <div className="homeWidgets">
          <WidgetSm />
          <WidgetLg />
        </div>
      </div>
    </>
  );
}
