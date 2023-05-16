import React from "react";
import { nativeUseLocation } from "@wrappid/styled-components";
import CoreTab from "../CoreTab";
import CoreTabPanel from "../CoreTabPanel";
import CoreTabs from "../CoreTabs";
import CoreClasses from "../../../styles/CoreClasses";
import { mergedComponentRegistry } from "../../../layout/PageContainer";

export default function CoreCustomTabs(props) {
  const location = nativeUseLocation();
  const { tabsContent, preHandleChangeHook, postHandleChangeHook } = props;
  const [tabValue, setTabValue] = React.useState(tabsContent[0]?.id || 0);

  React.useEffect(() => {
    if (
      location?.hash &&
      tabsContent?.filter((tabContent) => {
        return tabContent?.id === location?.hash?.replace("#", "");
      })?.length > 0
    ) {
      setTabValue(location.hash?.replace("#", ""));
    } else {
      setTabValue(tabsContent[0]?.id);
    }
  }, [tabsContent, location]);

  const handleChange = (e, value) => {
    preHandleChangeHook && preHandleChangeHook(e, value);
    setTabValue(value);
    postHandleChangeHook && postHandleChangeHook(e, value);
  };

  return (
    <>
      {/* <pre>{JSON.stringify(tabsContent, null, 4)}</pre> */}
      <CoreTabs
        styleClasses={[
          CoreClasses.MARGIN.MB1,
          CoreClasses.POSITION.STICKY_TOP,
          CoreClasses.BG.BG_WHITE,
          CoreClasses.OVERFLOW.OVERFLOW_X_SCROLL,
          CoreClasses.WIDTH.W_100,
        ]}
        value={tabValue}
        onChange={handleChange}
      >
        {tabsContent?.map((tabContent) => {
          return <CoreTab value={tabContent?.id} label={tabContent?.label} />;
        })}
      </CoreTabs>
      {tabsContent?.map((tabContent, tabIndex) => {
        return (
          <CoreTabPanel
            styleClasses={[CoreClasses.PADDING.P0]}
            value={tabValue}
            index={tabContent?.id || tabIndex}
          >
            {React.createElement(
              mergedComponentRegistry[tabContent.comp]?.comp
            )}
          </CoreTabPanel>
        );
      })}
    </>
  );
}
