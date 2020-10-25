# react-ui-tabs
A simple react component for creating a clickable tabbed interface.

[Demo Page](https://jajohnso.github.io/react-ui-tabs/)

## Setup
Setting up the tabs component is as simple as defining an outer `Tabs` component that wraps a series of `TabPanels` components. The component will generate tab navigation from a required `label` prop that is added to each individual `TabPanel`.

*Basic Example*
```
<Tabs>
    <TabPanel label={'Tab 1'} icon={<TabIcon />}>
        Content for Tab 1
    </TabPanel>
    <TabPanel label={'Tab 2'} icon={<TabIcon />}>
        Content for Tab 2
    </TabPanel>
</Tabs>
```
## Tabs Props
Options can be passed into the Component base element as props.

### defaultSelected
Optional prop to specify which tab is open on page load. Defaults to 0 if omitted.

#### type:  `Number`
Accepts a number representing the zero-based index number of choosen tab.

Example:
```
defaultSelected={2}
```

This would open the 3rd tab in the component on page load.

### isResponsive
Flag to indicate whether tabs layout should switch to vertical positioning at smaller screen widths.

#### type:  `Boolean`
`true` if tabs should use vertical layout below a specified width. Defaults to false. Specific pixel width can be specified using the `responsiveWidth` prop, otherwise a default of `500px` will be used.

*Example:*
```
isResponsive={true}
```

### responsiveWidth
Min-width media query pixel value at which vertical layout is triggered.

#### type:  `Number`
Accepts a number representing the zero-based index number of choosen tab. Defaults to `500`.

*Example:*
```
responsiveWidth={768}
```

### showIconsVert
Flag to indicate whether icons should be shown when vertical layout is used.

#### type:  `Boolean`
`true` if icons should be shown. Defaults to `false`.

*Example:*
```
showIconsVert={true}
```

### showIconsHorz
Flag to indicate whether icons should be shown when horizontal layout is used.

#### type:  `Boolean`
`true` if icons should be shown. Defaults to `false`.

*Example:*
```
showIconsHorz={true}
```

### onTabChange
Optional prop to provide a callback function to be executed on tab change. Callback function takes the currently selected tab as a parameter.

#### type:  `Function`
Accepts a function which takes the selected tab as a parameter. Function should have its context bound to the containing component.

Example:
```
onTabChange={this.handleChange}
```

## TabPanel Props

### label
#### *REQUIRED*

Each `TabPanel` component requires a `label` to be specified. This label is used to generate the tab navigation when the component is mounted.


#### type:  `String`
String representing the title of the tab.

*Example*
```
<TabPanel label={'Tab 1 Title Goes Here'}>
    Content for Tab 1
</TabPanel>
```

### icon
Custom SVG icons can be added as separate components and passed into each `TabPanel` component using props.

#### type:  `Object`
Accepts a react component that returns an SVG graphic. See example.

*Example:*

Define custom SVG component:

```
import React from 'react';
const TabIcon = (props) => {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <title>arrow</title>
            <path d="M9.984 6l6 6-6 6-1.406-1.406 4.594-4.594-4.594-4.594z"></path>
        </svg>
    );
}

export default TabIcon;
```

Then import the component into the containing component for the `Tabs`.
```
import TabIcon from './components/Tabs/TabIcon';
```

and pass it into the `TabPanel` component as a prop:

```
 <TabPanel label={'Tab 1'} icon={<TabIcon />}>
    Content for Tab 1
</TabPanel>
```
